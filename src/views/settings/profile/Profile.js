import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel } from '@coreui/react'

const Profile = () => {
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
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-3 pt-3 mb-0">Profile</h3>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputEmail">Email</CFormLabel>
              <CFormInput type="email" id="inputEmail" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="comapnyName">Company Name</CFormLabel>
              <CFormInput id="comapnyName" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputOldPassword">Old Password</CFormLabel>
              <CFormInput type="password" placeholder="Old Password" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputNewPassword">New Password</CFormLabel>
              <CFormInput type="password" placeholder="New Password" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputRepeatPassword">Repeat Password</CFormLabel>
              <CFormInput type="password" placeholder="Repeat Password" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputRepeatPassword">Company Logo</CFormLabel>
              <CFormInput
                type="file"
                placeholder="Upload Company Logo"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </CCol>
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
            <CCol xs={12} className="d-flex justify-content-end pe-4">
              <CButton color="primary">Update</CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Profile
