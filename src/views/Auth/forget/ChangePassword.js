import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cilLockLocked } from '@coreui/icons'

import { API_URLS } from '../../../config/Constants'
import { showErrorMsg, showSuccessMsg } from 'src/config/common'

const ChangePassword = () => {
  const [curPassword, setCurPassword] = useState('')
  const [curReenterPassword, setCurReenterPassword] = useState('')

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const email = queryParams.get('email')
  console.log(email)

  const handleUpdatePassword = async () => {
    if (email?.length === 0 || curPassword?.length === 0 || curReenterPassword?.length === 0) {
      showErrorMsg('There are some missing fields')

      return
    }

    if (curPassword !== curReenterPassword) {
      showErrorMsg('Password does not match')
      return
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(curPassword)) {
      showErrorMsg(
        'Password must be at least 8 characters long and include both numbers and letters.',
      )
      return
    }

    try {
      const response = await axios.post(API_URLS.CHANGEPASSWORD, {
        email: email,
        password: curPassword,
      })

      if (response.data.success && response.data.message) {
        showSuccessMsg(response.data.message)
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
                  <h1>Change your Password</h1>
                  <p className="text-body-secondary">
                    Enter a new password below to change your password
                  </p>
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
                  <CCard className="d-grid">
                    <CButton className="dark-blue" onClick={handleUpdatePassword}>
                      Change Password
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

export default ChangePassword
