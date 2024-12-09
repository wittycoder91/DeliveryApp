import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
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
  const location = useLocation()
  const [curRepeatStatus, setCurRepeatStatus] = useState(false)
  // Delivery States
  const [curMaterial, setCurMaterial] = useState(0)
  const [curWeight, setCurWeight] = useState(0)
  const [curPackaging, setCurPackaging] = useState(0)
  const [curCountPackage, setCurCountPackage] = useState(0)
  const [curResidue, setCurResidue] = useState('')
  const [curColor, setCurColor] = useState('')
  const [curCondition, setCurCondition] = useState('')
  const [curStatus, setCurStatus] = useState('')
  const [curLogoPreview, setCurLogoPreview] = useState(null)
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState(0)

  useEffect(() => {
    getInitialValue()
  }, [location.pathname])

  const getInitialValue = () => {
    setCurMaterial(0)
    setCurWeight(0)
    setCurPackaging(0)
    setCurCountPackage(0)
    setCurColor('')
    setCurResidue('')
    setCurCondition('')
    setCurStatus('')
    setCurLogoPreview('')
    setCurTime(0)
    setCurDate('')
    setCurRepeatStatus(false)
  }

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
      setCurWeight(100)
      setCurPackaging(1)
      setCurCountPackage(123)
      setCurColor('Color')
      setCurResidue('Residue')
      setCurCondition('Condition')
      setCurStatus('Pending')
      setCurLogoPreview('/images/table-banner.jpg')
      setCurTime(2)
      setCurDate(date)
    } else {
      getInitialValue()
    }
  }

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
                <CFormLabel>Weight(lbs)</CFormLabel>
                <CFormInput
                  placeholder="Weight(lbs)"
                  value={curWeight}
                  type="number"
                  onChange={(e) => setCurWeight(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Packaging</CFormLabel>
                <CFormSelect
                  options={[
                    { label: 'Baled', value: 0 },
                    { label: 'Stacked on Skids', value: 1 },
                    { label: 'Loosed in Boxes', value: 2 },
                  ]}
                  value={curPackaging}
                  onChange={(e) => setCurPackaging(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>The Total of packages</CFormLabel>
                <CFormInput
                  placeholder="The Total of packages"
                  value={curCountPackage}
                  type="number"
                  onChange={(e) => setCurCountPackage(e.target.value)}
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
                <CFormLabel>Residue Material</CFormLabel>
                <CFormInput
                  placeholder="Residue"
                  value={curResidue}
                  onChange={(e) => setCurResidue(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Conditions</CFormLabel>
                <CFormInput
                  placeholder="Conditions"
                  value={curCondition}
                  onChange={(e) => setCurCondition(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Status</CFormLabel>
                <CFormInput
                  placeholder="Pending"
                  value={curStatus}
                  readOnly
                  onChange={(e) => setCurStatus(e.target.value)}
                />
              </CCol>
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
                <CButton color="primary" className="wid-100 dark-blue">
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
