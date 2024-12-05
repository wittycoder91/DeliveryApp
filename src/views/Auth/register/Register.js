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
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilImage } from '@coreui/icons'

const Register = () => {
  const [logoPreview, setLogoPreview] = useState(null)

  const handleLogoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result) // Set the preview URL
      }
      reader.readAsDataURL(file) // Convert the file to a base64 string
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
                    <CFormInput placeholder="Supplier" autoComplete="Supplier" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
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
                    <CButton className="dark-blue">Create Account</CButton>
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
      </CContainer>
    </div>
  )
}

export default Register
