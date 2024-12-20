import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'

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
  const [curAllIndustry, setCurAllIndustry] = useState([])
  const [curIndustry, setCurIndustry] = useState('')
  const [curPhoneNumber, setCurPhoneNumber] = useState('')
  const [curW9, setCurW9] = useState('')
  const [curW9Data, setCurW9Data] = useState('')

  useEffect(() => {
    getAllIndustry()
    getUserInformation()
  }, [])

  const getAllIndustry = async () => {
    try {
      const response = await api.get(API_URLS.GETALLINDUSTRY)

      if (response.data.success && response.data.data?.length > 0) {
        setCurAllIndustry(response.data.data)
        setCurIndustry(response.data.data[0]._id)
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
        setCurPhoneNumber(result?.phonenumber)
        setCurIndustry(result?.industry)
        setCurW9(result?.w9Path)

        if (result?.avatarPath) {
          const rawAvatarPath = result?.avatarPath
          const normalizedAvatarPath = rawAvatarPath.replace(/\\/g, '/')
          setCurImageUrl(normalizedAvatarPath)
        }
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
      curEmail.length === 0 ||
      curName.length === 0 ||
      curAddress.length === 0 ||
      curCity.length === 0 ||
      curState.length === 0 ||
      curZipcode.length === 0 ||
      curOldPwd.length === 0 ||
      curNewPwd.length === 0 ||
      curNewReenterPwd.length === 0 ||
      curPhoneNumber.length === 0 ||
      (curW9.length === 0 && curW9Data.length === 0)
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
    formData.append('w9', curW9Data)
    formData.append('w9url', curW9)
    formData.append('name', curName)
    formData.append('email', curEmail)
    formData.append('password', curOldPwd)
    formData.append('newpassword', curNewPwd)
    formData.append('address', curAddress)
    formData.append('city', curCity)
    formData.append('state', curState)
    formData.append('zipcode', curZipcode)
    formData.append('industry', curIndustry)
    formData.append('phonenumber', curPhoneNumber)
    formData.append('uploadstatus', curImage ? 'true' : 'false')
    formData.append('uploadW9Status', curW9Data ? 'true' : 'false')
    try {
      const response = await api.post(API_URLS.UPDATESELUSERINFORMATION, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success && response.data.data) {
        if (curImage) {
          const avatarUrl = `${process.env.REACT_APP_UPLOAD_URL}${response.data.data?.avatarPath}`
          dispatch({ type: 'setAvatar', avatar: avatarUrl })
        }

        localStorage.setItem('email', curEmail)
        showSuccessMsg('Your information has been updated successfully.')
      } else {
        showErrorMsg(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleDownload = async () => {
    if (curW9.length > 0) {
      const fileUrl = `${process.env.REACT_APP_UPLOAD_URL}${curW9.replace(/\\/g, '/')}`

      try {
        const response = await fetch(fileUrl)
        if (!response.ok) {
          throw new Error('Failed to fetch file')
        }
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = blobUrl
        link.download = curW9.split('\\').pop()
        document.body.appendChild(link)
        link.click()

        URL.revokeObjectURL(blobUrl)
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error downloading file:', error)
      }
    }
  }
  const handleW9Change = (event) => {
    const file = event.target.files[0]

    if (file) {
      setCurW9Data(file)
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
              <CFormLabel>Street Address</CFormLabel>
              <CFormInput
                placeholder="Street Address"
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
              <CFormLabel>Province</CFormLabel>
              <CFormInput
                placeholder="Province"
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
            <CCol md={6}>
              <CFormLabel>Phone Number</CFormLabel>
              <CFormInput
                placeholder="Phone number"
                value={curPhoneNumber}
                onChange={(e) => setCurPhoneNumber(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Industry</CFormLabel>
              <CFormSelect
                options={curAllIndustry?.map((industry) => ({
                  label: industry.industryName,
                  value: industry._id,
                }))}
                value={curIndustry}
                onChange={(e) => setCurIndustry(e.target.value)}
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
              <CFormLabel>W2 File</CFormLabel>
              <CCol className="d-flex justify-content-center gap-3">
                <CFormInput
                  type="file"
                  placeholder="W2 File"
                  accept="*"
                  onChange={handleW9Change}
                />
                {curW9Data.length === 0 && curW9.length > 0 && (
                  <CButton color="primary" onClick={handleDownload}>
                    Download
                  </CButton>
                )}
              </CCol>
            </CCol>
            <CCol xs={12}>
              <CFormLabel>Supplier Logo</CFormLabel>
              <CFormInput
                type="file"
                placeholder="Upload Company Logo"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </CCol>
            {(curLogoPreview || curImageUrl) && (
              <div className="mb-4 text-center">
                <p className="text-body-secondary">Supplier Logo Preview:</p>
                <img
                  src={
                    curLogoPreview
                      ? curLogoPreview
                      : `${process.env.REACT_APP_UPLOAD_URL}${curImageUrl}`
                  }
                  alt="Delivery"
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
