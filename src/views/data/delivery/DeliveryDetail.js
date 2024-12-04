import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CInputGroup,
  CInputGroupText,
  CButton,
  CFormCheck,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilImage } from '@coreui/icons'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const DeliveryDetail = () => {
  const [curRepeatStatus, setCurRepeatStatus] = useState(false)
  // Delivery States
  const [curMaterial, setCurMaterial] = useState(0)
  const [curAmount, setCurAmount] = useState(0)
  const [curColor, setCurColor] = useState('')
  const [curQuality, setCurQuality] = useState('')
  const [curLocation, setCurLocation] = useState('')
  const [curNote, setCurNote] = useState('')
  const [curDesc, setCurDesc] = useState('')
  const [curLogoPreview, setCurLogoPreview] = useState(null)
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState(0)

  // Preview the upload Material Image
  const handleLogoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setCurLogoPreview(reader.result) // Set the preview URL
      }
      reader.readAsDataURL(file) // Convert the file to a base64 string
    }
  }

  const handleRepeat = (e) => {
    setCurRepeatStatus(e.target.checked)

    if (e.target.checked === true) {
      const date = new Date('2024-10-12T23:50:21.817Z')

      setCurMaterial(1)
      setCurAmount(100)
      setCurColor('Color')
      setCurQuality('Quality')
      setCurLocation('location')
      setCurNote('Note')
      setCurDesc('Desc')
      setCurLogoPreview('/images/table-banner.jpg')
      setCurTime(2)
      setCurDate(date)
    } else {
      setCurMaterial(0)
      setCurAmount(0)
      setCurColor('')
      setCurQuality('')
      setCurLocation('')
      setCurNote('')
      setCurDesc('')
      setCurLogoPreview('')
      setCurTime(0)
      setCurDate('')
    }
  }

  console.log(curDate)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCol>
            <h3 className="px-3 pt-3 mb-0">Delivery Information</h3>
            <CFormCheck
              label="Repeat Delivery"
              className="mx-3 mt-2"
              checked={curRepeatStatus}
              onChange={handleRepeat}
            />
          </CCol>
          <CCardBody className="d-flex flex-column gap-2">
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Material</CFormLabel>
                <CFormSelect
                  options={[
                    { label: 'One', value: 0 },
                    { label: 'Two', value: 1 },
                  ]}
                  value={curMaterial}
                  onChange={(e) => setCurMaterial(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Amount</CFormLabel>
                <CFormInput
                  placeholder="Amount"
                  value={curAmount}
                  onChange={(e) => setCurAmount(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Color</CFormLabel>
                <CFormInput
                  placeholder="Color"
                  value={curColor}
                  onChange={(e) => setCurColor(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Quality</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Quality"
                  value={curQuality}
                  onChange={(e) => setCurQuality(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Location</CFormLabel>
                <CFormInput
                  placeholder="Location"
                  value={curLocation}
                  onChange={(e) => setCurLocation(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Note</CFormLabel>
                <CFormInput
                  placeholder="Note"
                  value={curNote}
                  onChange={(e) => setCurNote(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-column">
              <CFormLabel>Description</CFormLabel>
              <CFormTextarea
                rows={5}
                value={curDesc}
                onChange={(e) => setCurDesc(e.target.value)}
              ></CFormTextarea>
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
            {curLogoPreview && (
              <div className="mb-4 text-center">
                <p className="text-body-secondary">Logo Preview:</p>
                <img
                  src={curLogoPreview}
                  alt="Logo Preview"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                />
              </div>
            )}
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Date</CFormLabel>
                <DayPicker
                  mode="single"
                  selected={curDate}
                  onSelect={setCurDate}
                  month={curDate}
                  onMonthChange={setCurDate}
                  hideNavigation
                  captionLayout="dropdown"
                />
              </CCol>
              <CCol>
                <CFormLabel>Time</CFormLabel>
                <CFormSelect
                  options={[
                    { label: '8:00 AM', value: 0 },
                    { label: '12:00 AM', value: 1 },
                    { label: '2:00 PM', value: 2 },
                    { label: '5:00 PM', value: 3 },
                  ]}
                  value={curTime}
                  onChange={(e) => setCurTime(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex justify-content-end me-4">
              <Link to="/data/delivery" className="text-decoration-none">
                <CButton color="primary" className="wid-100">
                  Confirm
                </CButton>
              </Link>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DeliveryDetail
