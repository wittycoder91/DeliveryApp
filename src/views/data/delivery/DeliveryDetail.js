import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CInputGroup,
  CInputGroupText,
  CButton,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import 'react-day-picker/dist/style.css'
import { cilImage } from '@coreui/icons'
import { DayPicker } from 'react-day-picker'

const DeliveryDetail = () => {
  const [selected, setSelected] = useState()
  const [logoPreview, setLogoPreview] = useState(null)

  // Preview the upload Material Image
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
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Delivery Information</strong>
          </CCardHeader>
          <CCardBody className="d-flex flex-column gap-2">
            <CCol className="d-flex gap-4">
              <CCol>
                <CFormLabel>Material</CFormLabel>
                <CFormSelect
                  options={[
                    { label: 'One', value: '1' },
                    { label: 'Two', value: '2' },
                  ]}
                />
              </CCol>
              <CCol>
                <CFormLabel>Amount</CFormLabel>
                <CFormInput placeholder="Amount" />
              </CCol>
            </CCol>
            <CCol className="d-flex gap-4">
              <CCol>
                <CFormLabel>Color</CFormLabel>
                <CFormInput placeholder="Color" />
              </CCol>
              <CCol>
                <CFormLabel>Quality</CFormLabel>
                <CFormInput type="number" placeholder="Quality" />
              </CCol>
            </CCol>
            <CCol className="d-flex gap-4">
              <CCol>
                <CFormLabel>Location</CFormLabel>
                <CFormInput placeholder="Location" />
              </CCol>
              <CCol>
                <CFormLabel>Note</CFormLabel>
                <CFormInput placeholder="Note" />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-column">
              <CFormLabel>Description</CFormLabel>
              <CFormTextarea rows={5}></CFormTextarea>
            </CCol>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilImage} />
              </CInputGroupText>
              <CFormInput
                type="file"
                placeholder="Upload Company Logo"
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
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Date</CFormLabel>
                <DayPicker mode="single" selected={selected} onSelect={setSelected} />
              </CCol>
              <CCol>
                <CFormLabel>Time</CFormLabel>
                <CFormSelect
                  options={[
                    { label: '8:00 AM', value: '1' },
                    { label: '12:00 AM', value: '2' },
                    { label: '2:00 PM', value: '3' },
                    { label: '5:00 PM', value: '4' },
                  ]}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex justify-content-end me-4">
              <Link to="/data/delivery" className="text-decoration-none">
                <CButton color="primary">Save Changes</CButton>
              </Link>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DeliveryDetail
