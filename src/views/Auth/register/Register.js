import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cilLockLocked, cilUser, cilImage } from '@coreui/icons'

const Register = () => {
  const [curName, setCurName] = useState('')
  const [curEmail, setCurEmail] = useState('')
  const [curPassword, setCurPassword] = useState('')
  const [curReenterPassword, setCurReenterPassword] = useState('')
  const [logoPreview, setLogoPreview] = useState(null)
  const [curImage, setCurImage] = useState('')

  const handleLogoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setCurImage(file)

      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result) // Set the preview URL
      }
      reader.readAsDataURL(file) // Convert the file to a base64 string
    }
  }

  const handleCreateAccount = async () => {
    if (
      curName?.length === 0 ||
      curEmail?.length === 0 ||
      curPassword?.length === 0 ||
      curReenterPassword?.length === 0 ||
      logoPreview?.length === 0
    ) {
      toast.error('There are some missing fields', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })

      return
    }

    if (curPassword !== curReenterPassword) {
      toast.error('Password does not match', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })

      return
    }

    const formData = new FormData()
    formData.append('image', curImage)
    formData.append('name', curName)
    formData.append('email', curEmail)
    formData.append('password', curPassword)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/admin/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (response.data.success) {
        toast.success('Registration Success', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
      } else {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
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
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Supplier"
                      value={curName}
                      onChange={(e) => setCurName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      type="mail"
                      value={curEmail}
                      onChange={(e) => setCurEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      value={curPassword}
                      onChange={(e) => setCurPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      value={curReenterPassword}
                      onChange={(e) => setCurReenterPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilImage} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      placeholder="Upload Supplier Logo"
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
