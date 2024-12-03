import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  return (
    <div className="auth-back bakground-no-repeat background-size-cover bg-body-tertiary h-100 min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="h-75">
        <CRow className="h-100 justify-content-center">
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody className="d-flex justify-content-center align-items-center">
                <CForm className="w-100">
                  <h1>Log in to your Account</h1>
                  <p className="text-body-secondary">Welcome back! Select method to log in</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                  </CInputGroup>
                  <CCol className="text-end mt-1">
                    <CButton color="link" className="text-decoration-none px-0">
                      Forgot password?
                    </CButton>
                  </CCol>
                  <CCol className="w-100 mt-2">
                    <Link to="/dashboard" className="text-decoration-none">
                      <CButton className="w-100 px-4 dark-blue">Login</CButton>
                    </Link>
                  </CCol>
                  <CCol className="w-100 mt-4 text-center">
                    <p className="text-body-secondary">
                      Don&#39;t have an account?
                      <Link to="/register" className="text-decoration-none">
                        <strong> Create an account</strong>
                      </Link>
                    </p>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard className="border-0 text-white authlogo-back bakground-no-repeat background-size-cover authlogo-back d-none d-sm-flex py-5">
              <CCardBody className="d-flex justify-content-center align-items-center text-center">
                <CRow className="justify-content-center align-items-center gap-3">
                  <img src="./logo_transparent.png" className="authlogo" alt="" />
                  <h2>Client Company name</h2>
                  <p>Company description</p>
                </CRow>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
