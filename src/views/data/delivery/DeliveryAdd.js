import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilImage, cilFax } from '@coreui/icons'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showSuccessMsg, showWarningMsg, showErrorMsg } from 'src/config/common'

const DeliveryAdd = () => {
  const fileInputRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [curRepeatStatus, setCurRepeatStatus] = useState(false)
  // Delivery States
  const [allMaterials, setAllMaterials] = useState([])
  const [allPackages, setAllPackages] = useState([])
  const [allTimes, setAllTimes] = useState([])
  const [curMaterial, setCurMaterial] = useState(0)
  const [curWeight, setCurWeight] = useState(0)
  const [curPackaging, setCurPackaging] = useState(0)
  const [curCountPackage, setCurCountPackage] = useState(0)
  const [curLogoPreview, setCurLogoPreview] = useState(null)
  const [curImage, setCurImage] = useState('')
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState(0)
  const [curImageUrl, setCurImageUrl] = useState('')
  const [curReport, setCurReport] = useState('')
  const [curPrivacy, setCurPrivacy] = useState('')
  const [curPrivacyStatus, setCurPrivacyStatus] = useState(false)
  const [curResidue, setCurResidue] = useState('')
  const [curAllResidues, setCurAllResidues] = useState([])
  const [curColor, setCurColor] = useState('')
  const [curAllColors, setCurAllColors] = useState([])
  const [curCondition, setCurCondition] = useState('')
  const [curAllConditions, setCurAllConditions] = useState([])
  const [curSDSStatus, setCurSDSStatus] = useState(false)
  const [curSDS, setCurSDS] = useState('')
  const [curSDSUrl, setCurSDSUrl] = useState('')
  // Privacy States
  const [visiblePrivacy, setVisiblePrivacy] = useState(false)

  useEffect(() => {
    getInitialValue()

    getSettings()
    getAllMaterials()
    getAllPackages()
    getAllTimes()
    getColors()
    getResidue()
    getConditions()
  }, [location.pathname])

  const getInitialValue = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    setCurMaterial(0)
    setCurWeight(0)
    setCurPackaging(0)
    setCurCountPackage(0)
    setCurColor('')
    setCurResidue('')
    setCurCondition('')
    setCurLogoPreview('')
    setCurImage('')
    setCurImageUrl('')
    setCurTime(0)
    setCurDate('')
    setCurRepeatStatus(false)
    setCurSDSStatus(false)
    setCurSDS('')
    setCurSDSUrl('')
  }
  const getSettings = async () => {
    try {
      const response = await api.get(API_URLS.GETSETTING)

      if (response.data.success && response.data.data) {
        setCurReport(response.data.data?.report)
        setCurPrivacy(response.data.data?.terms)
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
  const getAllMaterials = async () => {
    try {
      const response = await api.get(API_URLS.GETALLMATERIALS)

      if (response.data.success) {
        setAllMaterials(response.data.data)

        if (response.data.data?.length > 0) setCurMaterial(response.data.data[0]._id)
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
  const getAllPackages = async () => {
    try {
      const response = await api.get(API_URLS.GETALLPACKAGES)

      if (response.data.success) {
        setAllPackages(response.data.data)

        if (response.data.data?.length > 0) setCurPackaging(response.data.data[0]._id)
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
  const getColors = async () => {
    try {
      const response = await api.get(API_URLS.GETALLCOLOR)

      if (response.data.success && response.data.data) {
        setCurAllColors(response.data.data)

        if (response.data.data?.length > 0) setCurColor(response.data.data[0]._id)
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
  const getResidue = async () => {
    try {
      const response = await api.get(API_URLS.GETALLRESIDUE)

      if (response.data.success && response.data.data) {
        setCurAllResidues(response.data.data)

        if (response.data.data?.length > 0) setCurResidue(response.data.data[0]._id)
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
  const getConditions = async () => {
    try {
      const response = await api.get(API_URLS.GETALLCONDITION)

      if (response.data.success && response.data.data) {
        setCurAllConditions(response.data.data)

        if (response.data.data?.length > 0) setCurCondition(response.data.data[0]._id)
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
  const getRecentDelivery = async () => {
    try {
      const response = await api.get(API_URLS.LASTESTDELIVERY)

      if (response.data.success) {
        const result = response.data.data

        setCurMaterial(result?.material)
        setCurWeight(result?.weight)
        setCurPackaging(result?.packaging)
        setCurCountPackage(result?.countpackage)
        setCurColor(result?.color)
        setCurResidue(result?.residue)
        setCurCondition(result?.condition)
        setCurTime(result?.time)
        setCurDate(new Date(result?.date))
        const rawAvatarPath = result?.avatarPath
        const normalizedAvatarPath = rawAvatarPath.replace(/\\/g, '/')
        setCurImageUrl(normalizedAvatarPath)
        if (result?.sdsPath.length > 0) {
          const rawSDSPath = result?.sdsPath
          const normalizedSDSPath = rawSDSPath.replace(/\\/g, '/')
          setCurSDSUrl(normalizedSDSPath)
          setCurSDSStatus(true)
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

  const handleResidue = (e) => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text

    setCurResidue(selectedValue)
    if (selectedLabel.includes('SDS')) {
      setCurSDSStatus(true)
    } else {
      setCurSDSStatus(false)
      setCurSDS('')
      setCurSDSUrl('')
    }
  }
  // Handle upload the sds file
  const handleUploadSDS = (event) => {
    const file = event.target.files[0]
    setCurSDS(file)
  }
  // Preview the upload Material Image
  const handleLogoChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setCurImage(file)

      const reader = new FileReader()
      reader.onload = () => {
        setCurLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleRepeat = (e) => {
    getInitialValue()
    setCurRepeatStatus(e.target.checked)

    if (e.target.checked === true) {
      getRecentDelivery()
    } else {
      if (allPackages.length > 0) setCurPackaging(allPackages[0]._id)
      if (allMaterials.length > 0) setCurMaterial(allMaterials[0]._id)
    }
  }
  const handleConfirm = async () => {
    if (!curPrivacyStatus) {
      showErrorMsg('You must check the privacy policy.')
      return
    }

    if (
      allMaterials.length <= 0 ||
      allPackages.length <= 0 ||
      allTimes.length <= 0 ||
      curMaterial < 0 ||
      curWeight < 0 ||
      isNaN(parseInt(curWeight)) ||
      curPackaging < 0 ||
      curCountPackage < 0 ||
      isNaN(parseInt(curCountPackage)) ||
      curTime < 0 ||
      curColor.length === 0 ||
      curResidue.length === 0 ||
      curCondition.length === 0 ||
      (curImageUrl.length === 0 && curImage?.length === 0) ||
      curDate.length <= 0 ||
      (curSDSStatus && curSDS.length === 0)
    ) {
      showErrorMsg('There are some missing fields')
      return
    }

    // Convert the date format: yyyy-mm-dd
    const date = new Date(curDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const updateDate = `${year}-${month}-${day}`

    const formData = new FormData()
    formData.append('uploadstatus', curImage ? 'true' : 'false')
    formData.append('image', curImage)
    formData.append('imageurl', curImageUrl)
    formData.append('uploadSDSStatus', curSDS ? 'true' : 'false')
    formData.append('sds', curSDS)
    formData.append('sdsUrl', curSDSUrl)
    formData.append('material', curMaterial)
    formData.append('weight', parseFloat(curWeight))
    formData.append('packaging', curPackaging)
    formData.append('countpackage', parseInt(curCountPackage))
    formData.append('color', curColor)
    formData.append('residue', curResidue)
    formData.append('condition', curCondition)
    formData.append('date', updateDate)
    formData.append('time', curTime)
    try {
      const response = await api.post(API_URLS.ADDDELIVERY, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        showSuccessMsg('The delivery request was successfully sent.')

        navigate('/data/delivery')
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleDownloadSDS = async () => {
    if (curSDSUrl.length > 0) {
      const fileUrl = `${process.env.REACT_APP_UPLOAD_URL}${curSDSUrl.replace(/\\/g, '/')}`

      try {
        const response = await fetch(fileUrl)
        if (!response.ok) {
          throw new Error('Failed to fetch file')
        }
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = blobUrl
        link.download = curSDSUrl.split('\\').pop()
        document.body.appendChild(link)
        link.click()

        URL.revokeObjectURL(blobUrl)
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error downloading file:', error)
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCol>
            <h3 className="px-3 pt-3 mb-0">Delivery Information</h3>
            <h5 className="px-3 pt-1 mb-1">{curReport}</h5>
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
                  options={allMaterials?.map((material) => ({
                    label: material.materialName,
                    value: material._id,
                  }))}
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
                  options={allPackages?.map((pkg) => ({
                    label: pkg.name,
                    value: pkg._id,
                  }))}
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
                <CFormSelect
                  options={curAllColors?.map((color) => ({
                    label: color.colorName,
                    value: color._id,
                  }))}
                  value={curColor}
                  onChange={(e) => setCurColor(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Residue Material</CFormLabel>
                <CFormSelect value={curResidue} onChange={handleResidue}>
                  {curAllResidues?.map((residue) => (
                    <option key={residue._id} value={residue._id}>
                      {residue.residueName}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Conditions</CFormLabel>
                <CFormSelect
                  options={curAllConditions?.map((residue) => ({
                    label: residue.conditionName,
                    value: residue._id,
                  }))}
                  value={curCondition}
                  onChange={(e) => setCurCondition(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol>
              <CFormLabel>Delivery Upload Image</CFormLabel>
              <CInputGroup className="mb-2">
                <CInputGroupText>
                  <CIcon icon={cilImage} />
                </CInputGroupText>
                <CFormInput
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  placeholder="Upload Company Logo"
                  onChange={handleLogoChange}
                />
              </CInputGroup>
            </CCol>
            {(curLogoPreview || curImageUrl) && (
              <div className="mb-4 text-center">
                <p className="text-body-secondary">Delivery Upload Image</p>
                <img
                  src={
                    curLogoPreview
                      ? curLogoPreview
                      : `${process.env.REACT_APP_UPLOAD_URL}${curImageUrl}`
                  }
                  alt="Delivery Uploaded"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                />
              </div>
            )}
            {curSDSStatus && (
              <CCol>
                <CFormLabel>SDS sheet</CFormLabel>
                <CCol className="d-flex gap-3 mb-2">
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilFax} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      placeholder="Upload SDS"
                      accept="*"
                      onChange={handleUploadSDS}
                    />
                  </CInputGroup>
                  {curSDS.length === 0 && curSDSUrl.length > 0 && (
                    <CButton color="primary" onClick={handleDownloadSDS}>
                      Download
                    </CButton>
                  )}
                </CCol>
              </CCol>
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
                  options={allTimes?.map((time) => ({
                    label: new Date(time * 1000).toISOString().substr(11, 8),
                    value: time,
                  }))}
                  value={curTime}
                  onChange={(e) => setCurTime(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex justify-content-end align-items-center me-4">
              <CCol className="d-flex gap-2">
                <CFormCheck
                  checked={curPrivacyStatus}
                  onChange={(e) => setCurPrivacyStatus(e.target.checked)}
                />
                <span>
                  By continuing, you agree that you have read our{' '}
                  <strong onClick={() => setVisiblePrivacy(!visiblePrivacy)}>
                    Privacy Statement
                  </strong>
                </span>
              </CCol>
              <CButton color="primary" className="wid-100 dark-blue" onClick={handleConfirm}>
                Confirm
              </CButton>
            </CCol>
          </CCardBody>
        </CCard>
        {/* Privacy Modal */}
        <CModal
          alignment="center"
          visible={visiblePrivacy}
          onClose={() => setVisiblePrivacy(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Privacy Statement</CModalTitle>
          </CModalHeader>
          <CModalBody>{curPrivacy}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisiblePrivacy(false)}>
              Ok
            </CButton>
          </CModalFooter>
        </CModal>
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
      </CCol>
    </CRow>
  )
}

export default DeliveryAdd
