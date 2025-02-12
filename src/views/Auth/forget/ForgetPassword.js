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
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { API_URLS } from '../../../config/Constants'
import { showErrorMsg, showSuccessMsg } from 'src/config/common'

const ForgetPassword = () => {
  const [curEmail, setCurEmail] = useState('')

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(API_URLS.FORGETPASSWORD, {
        email: curEmail,
      })

      if (response.data.success) {
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
                  <h1>Forget your Password</h1>
                  <p className="text-body-secondary">Please input your email address</p>
                  <CInputGroup className="mb-2">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email *"
                      type="mail"
                      value={curEmail}
                      onChange={(e) => setCurEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CCard className="d-grid">
                    <CButton className="dark-blue" onClick={handleSendEmail}>
                      Submit
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

export default ForgetPassword
