import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel } from '@coreui/react'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showSuccessMsg, showWarningMsg, showErrorMsg } from 'src/config/common'

const Profile = () => {
  const dispatch = useDispatch()
  const [curLogoPreview, setCurLogoPreview] = useState(null)
  const [curImage, setCurImage] = useState('')
  const [curImageUrl, setCurImageUrl] = useState('')
  const [curEmail, setCurEmail] = useState('')
  const [curName, setCurName] = useState('')
  const [curAddress, setCurAddress] = useState('')
  const [curCity, setCurCity] = useState('')
  const [curState, setCurState] = useState('')
  const [curZipcode, setCurZipcode] = useState('')
  const [curOldPwd, setCurOldPwd] = useState('')
  const [curNewPwd, setCurNewPwd] = useState('')
  const [curNewReenterPwd, setCurNewReenterPwd] = useState('')

  useEffect(() => {
    getUserInformation()
  }, [])

  const getUserInformation = async () => {
    setCurImage('')

    try {
      const response = await api.get(API_URLS.GETSELUSERINFORMATION)

      if (response.data.success && response.data.data) {
        const result = response.data.data

        setCurEmail(result?.email)
        setCurName(result?.name)
        setCurAddress(result?.address)
        setCurCity(result?.city)
        setCurState(result?.state)
        setCurZipcode(result?.zipcode)
        const rawAvatarPath = result?.avatarPath
        const normalizedAvatarPath = rawAvatarPath.replace(/\\/g, '/')
        setCurImageUrl(normalizedAvatarPath)
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      if (error.response.data.msg) {
        showErrorMsg(error.response.data.msg)
      } else {
        showErrorMsg(error.message)
      }
    }
  }

  const handleLogoChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setCurImage(file)

      const reader = new FileReader()
      reader.onload = () => {
        setCurLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleUpdate = async () => {
    if (
      curEmail.length <= 0 ||
      curName.length <= 0 ||
      curAddress.length <= 0 ||
      curCity.length <= 0 ||
      curState.length <= 0 ||
      curZipcode.length <= 0 ||
      curOldPwd.length <= 0 ||
      curNewPwd.length <= 0 ||
      curNewReenterPwd.length <= 0 ||
      (curImageUrl.length === 0 && curImage?.length === 0)
    ) {
      showErrorMsg('There are some missing fields')
      return
    }

    if (curNewPwd !== curNewReenterPwd) {
      showErrorMsg('Password does not match')
      return
    }

    const formData = new FormData()
    formData.append('image', curImage)
    formData.append('imageurl', curImageUrl)
    formData.append('name', curName)
    formData.append('email', curEmail)
    formData.append('password', curOldPwd)
    formData.append('newpassword', curNewPwd)
    formData.append('address', curAddress)
    formData.append('city', curCity)
    formData.append('state', curState)
    formData.append('zipcode', curZipcode)
    formData.append('uploadstatus', curImage ? 'true' : 'false')
    try {
      const response = await api.post(API_URLS.UPDATESELUSERINFORMATION, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success && response.data.data) {
        const avatarUrl = `${process.env.REACT_APP_UPLOAD_URL}/${response.data.data?.avatarPath}`
        dispatch({ type: 'setAvatar', avatar: avatarUrl })

        localStorage.setItem('email', curEmail)
        showSuccessMsg('Your information has been updated successfully.')
      } else {
        showErrorMsg(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-3 pt-3 mb-0">Profile</h3>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel>Email</CFormLabel>
              <CFormInput
                type="email"
                placeholder="Email"
                value={curEmail}
                onChange={(e) => setCurEmail(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Supplier Name</CFormLabel>
              <CFormInput
                placeholder="Supplier Name"
                value={curName}
                onChange={(e) => setCurName(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Address</CFormLabel>
              <CFormInput
                placeholder="Address"
                value={curAddress}
                onChange={(e) => setCurAddress(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>City</CFormLabel>
              <CFormInput
                placeholder="City"
                value={curCity}
                onChange={(e) => setCurCity(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>State</CFormLabel>
              <CFormInput
                placeholder="State"
                value={curState}
                onChange={(e) => setCurState(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Zip Code</CFormLabel>
              <CFormInput
                placeholder="Zip Code"
                value={curZipcode}
                onChange={(e) => setCurZipcode(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CFormLabel>Old Password</CFormLabel>
              <CFormInput
                type="password"
                placeholder="Old Password"
                value={curOldPwd}
                onChange={(e) => setCurOldPwd(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel>New Password</CFormLabel>
              <CFormInput
                type="password"
                placeholder="New Password"
                value={curNewPwd}
                onChange={(e) => setCurNewPwd(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel>Repeat Password</CFormLabel>
              <CFormInput
                type="password"
                placeholder="Repeat Password"
                value={curNewReenterPwd}
                onChange={(e) => setCurNewReenterPwd(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CFormLabel>Company Logo</CFormLabel>
              <CFormInput
                type="file"
                placeholder="Upload Company Logo"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </CCol>
            {(curLogoPreview || curImageUrl) && (
              <div className="mb-4 text-center">
                <p className="text-body-secondary">Logo Preview:</p>
                <img
                  src={
                    curLogoPreview
                      ? curLogoPreview
                      : `${process.env.REACT_APP_UPLOAD_URL}/${curImageUrl}`
                  }
                  alt="Logo Preview"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                />
              </div>
            )}
            <CCol xs={12} className="d-flex justify-content-end pe-4">
              <CButton color="primary" onClick={handleUpdate}>
                Update
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </CCol>
  )
}

export default Profile
