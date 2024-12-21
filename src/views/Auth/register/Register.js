import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  cilLockLocked,
  cilUser,
  cilImage,
  cilBuilding,
  cilLocomotive,
  cilPhone,
  cilFax,
} from '@coreui/icons'

import api from 'src/services'
import { API_URLS } from '../../../config/Constants'
import { showErrorMsg, showSuccessMsg, showWarningMsg } from 'src/config/common'

const Register = () => {
  const navigate = useNavigate()
  const [curName, setCurName] = useState('')
  const [curEmail, setCurEmail] = useState('')
  const [curPassword, setCurPassword] = useState('')
  const [curReenterPassword, setCurReenterPassword] = useState('')
  const [logoPreview, setLogoPreview] = useState(null)
  const [curImage, setCurImage] = useState('')
  const [curAddress, setCurAddress] = useState('')
  const [curCity, setCurCity] = useState('')
  const [curState, setCurState] = useState('')
  const [curZipcode, setCurZipcode] = useState('')
  const [curPhoneNumber, setCurPhoneNumber] = useState('')
  const [curAllIndustry, setCurAllIndustry] = useState([])
  const [curIndustry, setCurIndustry] = useState('-1')
  const [curW9, setCurW9] = useState('')
  const [curContact, setCurContact] = useState('')

  useEffect(() => {
    getAllIndustry()
  }, [])

  const getAllIndustry = async () => {
    try {
      const response = await api.get(API_URLS.GETALLINDUSTRY)

      if (response.data.success && response.data.data?.length > 0) {
        const updatedIndustries = [
          {
            _id: '-1',
            industryName: 'Industry',
            industryDesc: '',
            note: '',
          },
          ...response.data.data,
        ]
        setCurAllIndustry(updatedIndustries)
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
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleUploadW9 = (event) => {
    const file = event.target.files[0]
    setCurW9(file)
  }

  const handleCreateAccount = async () => {
    if (
      curName?.length === 0 ||
      curEmail?.length === 0 ||
      curPassword?.length === 0 ||
      curReenterPassword?.length === 0 ||
      logoPreview?.length === 0 ||
      curAddress?.length === 0 ||
      curCity?.length === 0 ||
      curState?.length === 0 ||
      curZipcode?.length === 0 ||
      curPhoneNumber.length === 0 ||
      curIndustry === '-1' ||
      !curW9
    ) {
      showErrorMsg('There are some missing fields')

      return
    }

    if (curPassword !== curReenterPassword) {
      showErrorMsg('Password does not match')

      return
    }

    const formData = new FormData()
    formData.append('image', curImage)
    formData.append('w9', curW9)
    formData.append('name', curName)
    formData.append('contact', curContact)
    formData.append('email', curEmail)
    formData.append('password', curPassword)
    formData.append('address', curAddress)
    formData.append('city', curCity)
    formData.append('state', curState)
    formData.append('zipcode', curZipcode)
    formData.append('phonenumber', curPhoneNumber)
    formData.append('industry', curIndustry)
    try {
      const response = await axios.post(API_URLS.REGISTER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        navigate('/login')

        showSuccessMsg('Registration Success')
      } else {
        showErrorMsg(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="auth-back bakground-no-repeat background-size-cover bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 custom-scrollbar register-card">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="User name *"
                      value={curName}
                      onChange={(e) => setCurName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email *"
                      type="mail"
                      value={curEmail}
                      onChange={(e) => setCurEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Contact"
                      value={curContact}
                      onChange={(e) => setCurContact(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Street Address *"
                      value={curAddress}
                      onChange={(e) => setCurAddress(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="City *"
                      value={curCity}
                      onChange={(e) => setCurCity(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Province *"
                      value={curState}
                      onChange={(e) => setCurState(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Zip Code *"
                      value={curZipcode}
                      onChange={(e) => setCurZipcode(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Phone number *"
                      value={curPhoneNumber}
                      onChange={(e) => setCurPhoneNumber(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilLocomotive} />
                    </CInputGroupText>
                    <CFormSelect
                      options={curAllIndustry?.map((industry) => ({
                        label: industry.industryName,
                        value: industry._id,
                      }))}
                      value={curIndustry}
                      onChange={(e) => setCurIndustry(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password *"
                      value={curPassword}
                      onChange={(e) => setCurPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password *"
                      value={curReenterPassword}
                      onChange={(e) => setCurReenterPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <p className="text-body-secondary mb-2">Supplier Logo Upload</p>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilImage} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      placeholder="Upload Supplier Logo *"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </CInputGroup>
                  {logoPreview && (
                    <div className="mb-4 text-center">
                      <p className="text-body-secondary">Logo Preview:</p>
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                      />
                    </div>
                  )}
                  <p className="text-body-secondary mb-2">W9 Upload *</p>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilFax} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      placeholder="Upload W9 *"
                      accept="*"
                      onChange={handleUploadW9}
                    />
                  </CInputGroup>
                  <CCard className="d-grid">
                    <CButton className="dark-blue" onClick={handleCreateAccount}>
                      Create Account
                    </CButton>
                  </CCard>
                  <CCol className="w-100 mt-4 text-center">
                    <p className="text-body-secondary">
                      Already have an account?
                      <Link to="/login" className="text-decoration-none">
                        <strong> Login here</strong>
                      </Link>
                    </p>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
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
      </CContainer>
    </div>
  )
}

export default Register
