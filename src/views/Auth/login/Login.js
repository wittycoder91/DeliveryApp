import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
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
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { API_URLS } from '../../../config/Constants'
import { showErrorMsg } from 'src/config/common'

const Login = () => {
  const navigate = useNavigate()
  const [, setCookie] = useCookies()
  const [curUserEmail, setCurUserEmail] = useState('')
  const [curPassword, setCurPassword] = useState('')

  const handleLogin = async () => {
    if (curUserEmail.length === 0 || curPassword.length === 0) {
      showErrorMsg('Please enter both username and password')
    } else {
      const response = await axios.post(API_URLS.LOGIN, {
        email: curUserEmail,
        password: curPassword,
      })

      if (response.data.success) {
        localStorage.setItem('email', response.data.user?.email)
        localStorage.setItem('token', response.data.token)
        setCookie('notification', 0)
        setCookie('notificationdata', [])
        setCookie('userid', response.data.user?._id)

        navigate(`/dashboard`)
      } else {
        showErrorMsg(response.data.message)
      }
    }
  }

  return (
    <div className="auth-back bakground-no-repeat background-size-cover bg-body-tertiary h-100 min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="h-75">
        <CRow className="h-100 justify-content-center">
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody className="d-flex justify-content-center align-items-center">
                <CForm className="w-100">
                  <h1>Log in to your Account</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Supplier Email"
                      autoComplete="Supplier Email"
                      onChange={(e) => setCurUserEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      onChange={(e) => setCurPassword(e.target.value)}
                    />
                  </CInputGroup>
                  {/* <CCol className="text-end mt-1">
                    <CButton color="link" className="text-decoration-none px-0">
                      Forgot password?
                    </CButton>
                  </CCol> */}
                  <CCol className="w-100 mt-4">
                    <CButton className="w-100 px-4 dark-blue" onClick={handleLogin}>
                      Login
                    </CButton>
                  </CCol>
                  <CCol className="w-100 mt-3 text-end">
                    <Link to="/forgetpassword" className="text-decoration-none">
                      <strong>Forget Password?</strong>
                    </Link>
                  </CCol>
                  <CCol className="w-100 text-center">
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
                </CRow>
              </CCardBody>
            </CCard>
          </CCardGroup>
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

export default Login
