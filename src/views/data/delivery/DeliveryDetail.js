import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
  CFormSelect,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg, calculateHolidays } from 'src/config/common'
import { useNotification } from 'src/components/header/NotificationProvider'

const DeliveryDetail = () => {
  const { id: selId } = useParams()
  const navigate = useNavigate()
  const { notificationCount } = useNotification()

  const [allTimes, setAllTimes] = useState([])
  // Delivery States
  const [curSupplier, setCurSupplier] = useState('')
  const [curMaterial, setCurMaterial] = useState('')
  const [curWeight, setCurWeight] = useState('')
  const [curPackaging, setCurPackaging] = useState('')
  const [curCountPackage, setCurCountPackage] = useState('')
  const [curResidue, setCurResidue] = useState('')
  const [curColor, setCurColor] = useState('')
  const [curCondition, setCurCondition] = useState('')
  const [curLogoPreview, setCurLogoPreview] = useState('')
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState(0)
  const [curPO, setCurPO] = useState('')
  const [curSDS, setCurSDS] = useState('')
  const [curStatus, setCurStatus] = useState('')
  const [curSelectedDates, setCurSelectedDates] = useState([])
  const [unavailbleDates, setUnavailableDates] = useState([])

  useEffect(() => {
    getAllTimes()
    getSelDelivery()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationCount])

  useEffect(() => {
    getUnavailbleDate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (curDate) {
      const currentYear = new Date(curDate).getFullYear()
      updateUnavailableDates(currentYear)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curDate, curSelectedDates])

  const updateUnavailableDates = (year) => {
    const holidays = calculateHolidays(year)
    const holidayDates = holidays.map((holiday) => new Date(holiday))

    setUnavailableDates([...curSelectedDates, ...holidayDates])
  }
  const getUnavailbleDate = async () => {
    try {
      const response = await api.get(API_URLS.GETALLDATES)

      if (response.data.success && response.data.data) {
        if (response.data.data?.length > 0) {
          const dates = response.data.data.map((item) => {
            const [year, month, day] = item.date.split('-')
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
          })
          setCurSelectedDates(dates)
          setUnavailableDates(dates)
        }
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      if (error.response.data.msg) {
        showErrorMsg(error.response.data.msg)
      } else {
        showErrorMsg(error.message)
      }
    }

    const currentYear = new Date().getFullYear()
    const holidays = calculateHolidays(currentYear)
    const holidayDates = holidays.map((holiday) => new Date(holiday))

    setUnavailableDates((prevDates) => [...prevDates, ...holidayDates])
  }
  const getAllTimes = async () => {
    try {
      const response = await api.get(API_URLS.GETSETTING)

      if (response.data.success) {
        var tempTimes = []
        tempTimes.push(response.data.data?.firsttime)
        tempTimes.push(response.data.data?.secondtime)
        tempTimes.push(response.data.data?.thirdtime)
        tempTimes.push(response.data.data?.fourthtime)

        setAllTimes(tempTimes)
        setCurTime(response.data.data?.firsttime)
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      if (error.response.data.msg) {
        showErrorMsg(error.response.data.msg)
      } else {
        showErrorMsg(error.message)
      }
    }
  }
  const getSelDelivery = async () => {
    getInitialValue()

    try {
      const response = await api.get(API_URLS.GETSELDELIVERY, {
        params: {
          selDeliveryId: selId,
        },
      })

      if (response.data.success && response.data.data) {
        setCurSupplier(response.data.data?.username)
        setCurMaterial(response.data.data?.material)
        setCurWeight(response.data.data?.weight)
        setCurPackaging(response.data.data?.packaging)
        setCurCountPackage(response.data.data?.countpackage)
        setCurColor(response.data.data?.color)
        setCurCondition(response.data.data?.condition)
        setCurLogoPreview(response.data.data?.avatarPath)
        setCurDate(response.data.data?.date)
        setCurTime(response.data.data?.time)
        setCurPO(response.data.data?.po)
        setCurSDS(response.data.data?.sdsPath)
        setCurStatus(response.data.data?.state)
        if (response.data.data?.residue === 'Other') {
          setCurResidue(response.data.data?.other)
        } else {
          setCurResidue(response.data.data?.residue)
        }
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      if (error.response.data.msg) {
        showErrorMsg(error.response.data.msg)
      } else {
        showErrorMsg(error.message)
      }
    }
  }
  const getInitialValue = () => {
    setCurSupplier('')
    setCurMaterial('')
    setCurWeight('')
    setCurPackaging('')
    setCurCountPackage('')
    setCurResidue('')
    setCurColor('')
    setCurCondition('')
    setCurLogoPreview('')
    setCurDate('')
    setCurTime(0)
    setCurPO('')
    setCurSDS('')
    setCurStatus('')
  }

  const handleConfirm = async () => {
    const date = new Date(curDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const updateDate = `${year}-${month}-${day}`

    try {
      const response = await api.post(API_URLS.UPDATESELDELIVERY, {
        selDeliveryId: selId,
        updateDate: updateDate,
        updateTime: curTime,
      })

      if (response.data.success) {
        navigate('/data/delivery')
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleDownload = async () => {
    const fileUrl = `${process.env.REACT_APP_UPLOAD_URL}${curSDS.replace(/\\/g, '/')}`

    try {
      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = curSDS.split('\\').pop()
      document.body.appendChild(link)
      link.click()

      URL.revokeObjectURL(blobUrl)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <h3 className="px-3 pt-3 mb-0">Delivery Process Information</h3>
          <CCardBody className="d-flex flex-column pt-0 gap-2">
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Supplier</CFormLabel>
                <CFormInput value={curSupplier} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Material</CFormLabel>
                <CFormInput value={curMaterial} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Estimated Weight (LBS)</CFormLabel>
                <CFormInput value={curWeight} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Packaging</CFormLabel>
                <CFormInput value={curPackaging} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Estimated # of Packages</CFormLabel>
                <CFormInput value={curCountPackage} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Color</CFormLabel>
                <CFormInput value={curColor} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Residue Material</CFormLabel>
                <CFormInput value={curResidue} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Conditions</CFormLabel>
                <CFormInput value={curCondition} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>PO</CFormLabel>
                <CFormInput value={curPO > 0 ? curPO : ''} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Status</CFormLabel>
                <CFormInput
                  value={
                    curStatus === 0
                      ? 'Waiting'
                      : curStatus === 1
                        ? 'Pending for Receiving'
                        : curStatus === 2
                          ? 'Received'
                          : 'Accepted'
                  }
                  readOnly
                />
              </CCol>
            </CCol>
            {curLogoPreview && (
              <div className="mb-4 text-center">
                <p className="text-body-secondary">Delivery Uploaded Image:</p>
                <img
                  src={`${process.env.REACT_APP_UPLOAD_URL}${curLogoPreview}`}
                  alt="Delivery"
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
                  // hideNavigation
                  // captionLayout="dropdown"
                  disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }, ...unavailbleDates]}
                />
              </CCol>
              <CCol className="d-flex flex-column gap-3">
                <CRow>
                  <CFormLabel>Time</CFormLabel>
                  <CFormSelect
                    options={allTimes?.map((time) => ({
                      label: new Date(time * 1000).toISOString().substr(11, 8),
                      value: time,
                    }))}
                    value={curTime}
                    onChange={(e) => setCurTime(e.target.value)}
                  />
                </CRow>
                {curSDS.length > 0 && (
                  <CRow>
                    <CFormLabel>SDS sheet</CFormLabel>
                    <CButton color="primary" className="w-max" onClick={handleDownload}>
                      Download
                    </CButton>
                  </CRow>
                )}
              </CCol>
            </CCol>
            <CCol className="d-flex justify-content-end gap-3 me-4">
              <CButton color="primary" className="wid-100 dark-blue" onClick={handleConfirm}>
                Confirm
              </CButton>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
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
    </CRow>
  )
}

export default DeliveryDetail
