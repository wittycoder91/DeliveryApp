import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormTextarea,
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
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilImage, cilFax } from '@coreui/icons'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GrClose } from 'react-icons/gr'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showSuccessMsg, showWarningMsg, showErrorMsg, calculateHolidays } from 'src/config/common'

const DeliveryAdd = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // const [curW9, setCurW9] = useState('')
  const [validated, setValidated] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(false)
  const [curRepeatStatus, setCurRepeatStatus] = useState(false)
  // Delivery States
  const [allMaterials, setAllMaterials] = useState([])
  const [allPackages, setAllPackages] = useState([])
  const [allTimes, setAllTimes] = useState([])
  const [curMaterial, setCurMaterial] = useState(0)
  const [curWeight, setCurWeight] = useState(0)
  const [curPackaging, setCurPackaging] = useState(0)
  const [curCountPackage, setCurCountPackage] = useState(0)
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState(0)
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
  const [curOther, setCurOther] = useState('')
  const [curNote, setCurNote] = useState('')
  const [curOtherStats, setCurOtherStatus] = useState(false)
  const [curImageUrl, setCurImageUrl] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedImageDatas, setUploadedImageDatas] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  // Privacy Error Modal States
  const [visibleErrorPrivacy, setVisibleErrorPrivacy] = useState(false)
  // Privacy Modal States
  const [visiblePrivacy, setVisiblePrivacy] = useState(false)
  const [curSelectedDates, setCurSelectedDates] = useState([])
  const [unavailbleDates, setUnavailableDates] = useState([])

  useEffect(() => {
    getUnavailbleDate()
  }, [])

  useEffect(() => {
    getInitialValue()

    getSettings()
    getAllMaterials()
    getAllPackages()
    getAllTimes()
    getColors()
    getResidue()
    getConditions()
    // getUserInformation()
  }, [location.pathname])

  useEffect(() => {
    if (curDate) {
      const currentYear = curDate.getFullYear()
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
  const getInitialValue = () => {
    setUploadStatus(false)
    setCurMaterial(0)
    setCurWeight(0)
    setCurPackaging(0)
    setCurCountPackage(0)
    setCurColor('')
    setCurResidue('')
    setCurCondition('')
    setCurImageUrl([])
    setCurTime(0)
    setCurDate('')
    setCurRepeatStatus(false)
    setCurSDSStatus(false)
    setCurSDS('')
    setCurSDSUrl('')
    setCurOtherStatus(false)
    setCurOther('')
    setCurNote('')
    setUploadedImages([])
    setUploadedImageDatas([])
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
  // const getUserInformation = async () => {
  //   try {
  //     const response = await api.get(API_URLS.GETSELUSERINFOR, {
  //       params: { selEmail: localStorage.getItem('email') },
  //     })

  //     if (response.data.success && response.data.data?.length > 0) {
  //       const userData = response.data.data[0]

  //       if (userData && userData?.w9Path) {
  //         setCurW9(userData?.w9Path)
  //       }
  //     }
  //   } catch (error) {
  //     if (error.response?.data?.msg) {
  //       showErrorMsg(error.response.data.msg)
  //     } else {
  //       showErrorMsg(error.message)
  //     }
  //   }
  // }
  const getRecentDelivery = async () => {
    try {
      const response = await api.get(API_URLS.LASTESTDELIVERY)

      if (response.data.success) {
        const result = response.data.data

        setActiveIndex(0)
        setCurMaterial(result?.material)
        setCurWeight(result?.weight)
        setCurPackaging(result?.packaging)
        setCurCountPackage(result?.countpackage)
        setCurColor(result?.color)
        setCurResidue(result?.residue)
        setCurCondition(result?.condition)
        setCurTime(result?.time)
        setCurDate(new Date(result?.date))
        setCurNote(result?.note)

        const updatedAvatarPaths = result?.avatarPath.map((path) => path.replace(/\\/g, '/'))
        setCurImageUrl(updatedAvatarPaths)

        if (result?.sdsPath.length > 0) {
          const normalizedSDSPath = result?.sdsPath.replace(/\\/g, '/')
          setCurSDSUrl(normalizedSDSPath)
          setCurSDSStatus(true)
        }

        if (result?.other?.length > 0) {
          setCurOtherStatus(true)
          setCurOther(result.other)
        }
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      if (error.response?.data?.msg) {
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
      setCurOtherStatus(false)
    } else if (selectedLabel.includes('Other')) {
      setCurOtherStatus(true)
      setCurSDSStatus(false)
      setCurSDS('')
      setCurSDSUrl('')
    } else {
      setCurOtherStatus(false)
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

  // Handle Image upload
  const handleImageChange = (event) => {
    setUploadStatus(true)

    const files = event.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)

      // Append new files instead of replacing all
      setUploadedImageDatas((prev) => [...prev, ...newFiles])

      const newImages = newFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      Promise.all(newImages)
        .then((images) => {
          setUploadedImages((prev) => [...prev, ...images])
          setActiveIndex((prev) => (prev === 0 ? 0 : prev))
        })
        .catch((err) => console.error(err))
    }
  }
  const handleRemoveImage = (index) => {
    if (index < curImageUrl.length) {
      // Removing an existing image from curImageUrl
      setCurImageUrl((prevUrls) => prevUrls.filter((_, i) => i !== index))
    } else {
      // Removing an uploaded image
      const adjustedIndex = index - curImageUrl.length
      setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== adjustedIndex))
      setUploadedImageDatas((prevDatas) => prevDatas.filter((_, i) => i !== adjustedIndex))
    }

    let newActiveIndex = activeIndex
    const totalImages = curImageUrl.length + uploadedImages.length

    if (totalImages === 1) {
      newActiveIndex = 0
    } else if (index === totalImages - 1) {
      newActiveIndex = Math.max(activeIndex - 1, 0)
    } else if (index < activeIndex) {
      newActiveIndex = Math.max(activeIndex - 1, 0)
    }

    setActiveIndex(newActiveIndex)
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    if (!curPrivacyStatus) {
      setVisibleErrorPrivacy(!visibleErrorPrivacy)
      // showErrorMsg('Please make sure to check the required privacy statement.')
      return
    }

    if (
      (uploadedImages.length === 0 && uploadStatus === true) ||
      curDate.length === 0 ||
      (curSDSStatus && curSDS.length === 0) ||
      (curOtherStats && curOther.length === 0)
    )
      return

    // if (
    //   allMaterials.length <= 0 ||
    //   allPackages.length <= 0 ||
    //   allTimes.length <= 0 ||
    //   curMaterial < 0 ||
    //   curWeight < 0 ||
    //   isNaN(parseInt(curWeight)) ||
    //   curPackaging < 0 ||
    //   curCountPackage < 0 ||
    //   isNaN(parseInt(curCountPackage)) ||
    //   curTime < 0 ||
    //   curColor.length === 0 ||
    //   curResidue.length === 0 ||
    //   curCondition.length === 0 ||
    //   (curImageUrl.length === 0 && uploadedImages?.length === 0) ||
    //   curDate.length <= 0 ||
    //   (curSDSStatus && curSDS.length === 0) ||
    //   (curOtherStats && curOther.length === 0) ||
    //   curNote.length < 0
    // ) {
    //   showErrorMsg('There are some missing fields')
    //   return
    // }

    // Convert the date format: yyyy-mm-dd
    const date = new Date(curDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const updateDate = `${year}-${month}-${day}`

    const formData = new FormData()
    formData.append('uploadstatus', uploadStatus)
    // formData.append('image', curImage)
    formData.append('imageurl', JSON.stringify(curImageUrl))
    for (let i = 0; i < uploadedImageDatas.length; i++) {
      formData.append('images', uploadedImageDatas[i])
    }
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
    formData.append('other', curOther)
    formData.append('note', curNote)

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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-3 pb-2">
          <h3 className="px-3 pt-3">Note</h3>
          <h5 className="px-3">{curReport}</h5>
        </CCard>
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
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
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
                    feedbackInvalid="Please select the material."
                    required
                  />
                </CCol>
                <CCol>
                  <CFormLabel>Estimated Weight (LBS)</CFormLabel>
                  <CFormInput
                    placeholder="Estimated Weight (LBS)"
                    value={curWeight}
                    type="number"
                    onChange={(e) => setCurWeight(e.target.value)}
                    feedbackInvalid="Please input the estimated weight."
                    required
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
                    feedbackInvalid="Please select the packinage."
                    required
                  />
                </CCol>
                <CCol>
                  <CFormLabel>Estimated # of Packages</CFormLabel>
                  <CFormInput
                    placeholder="Estimated # of Packages"
                    value={curCountPackage}
                    type="number"
                    onChange={(e) =>
                      setCurCountPackage(e.target.value ? parseInt(e.target.value) : 0)
                    }
                    feedbackInvalid="Please input the estimated # of packages."
                    required
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
                    feedbackInvalid="Please select the color."
                    required
                  />
                </CCol>
                <CCol>
                  <CFormLabel>Conditions</CFormLabel>
                  <CFormSelect
                    options={curAllConditions?.map((residue) => ({
                      label: residue.conditionName,
                      value: residue._id,
                    }))}
                    value={curCondition}
                    onChange={(e) => setCurCondition(e.target.value)}
                    feedbackInvalid="Please select the condition."
                    required
                  />
                </CCol>
              </CCol>
              <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
                <CCol>
                  <CFormLabel>Residue Material</CFormLabel>
                  <CFormSelect
                    value={curResidue}
                    onChange={handleResidue}
                    feedbackInvalid="Please select the redisue mateiral."
                    required
                  >
                    {curAllResidues?.map((residue) => (
                      <option key={residue._id} value={residue._id}>
                        {residue.residueName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                {curOtherStats && (
                  <CCol>
                    <CFormLabel>Other</CFormLabel>
                    <CFormInput
                      placeholder="Other"
                      value={curOther}
                      onChange={(e) => setCurOther(e.target.value)}
                      feedbackInvalid="Please input tthe other information."
                      required
                    />
                  </CCol>
                )}
              </CCol>
              <CCol>
                <CFormLabel>Material photo upload</CFormLabel>
                <CInputGroup className="mt-2">
                  <CInputGroupText>
                    <CIcon icon={cilImage} />
                  </CInputGroupText>
                  <CFormInput
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </CInputGroup>
              </CCol>
              <Carousel
                showThumbs={false}
                selectedItem={Math.min(activeIndex, [...curImageUrl, ...uploadedImages].length - 1)}
                onChange={setActiveIndex}
                className="mt-4"
              >
                {[...curImageUrl, ...uploadedImages].map((image, index) => (
                  <div key={index} className="position-relative">
                    <div
                      className="position-absolute top-0 cursor-pointer zindex-100"
                      style={{ right: '40px' }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <GrClose />
                    </div>
                    <div>
                      <img
                        src={
                          typeof image === 'string' && image.startsWith('data')
                            ? image
                            : `${process.env.REACT_APP_UPLOAD_URL}${image}`
                        }
                        style={{ height: '300px', objectFit: 'contain' }}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
              {((uploadedImages.length <= 0 && uploadStatus === true) ||
                curImageUrl.length <= 0) && (
                <div className="text-danger">Please upload the material images.</div>
              )}
              <CCol>
                <CFormLabel>Note</CFormLabel>
                <CFormTextarea
                  rows={3}
                  placeholder="Note"
                  value={curNote}
                  onChange={(e) => setCurNote(e.target.value)}
                  feedbackInvalid="Please input the note."
                  required
                />
              </CCol>
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
                        feedbackInvalid="Please upload the SDS file."
                        required
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
                  <CFormLabel>
                    Please select delivery date and see available dock time below
                  </CFormLabel>
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
                  {curDate?.length <= 0 && (
                    <div className="text-danger">Please select the delivery date.</div>
                  )}
                </CCol>
                <CCol>
                  <CFormSelect
                    options={allTimes
                      ?.filter((time) => !isNaN(time) && time !== null && time !== undefined)
                      .map((time) => ({
                        label: new Date(time * 1000).toISOString().substr(11, 8),
                        value: time,
                      }))}
                    value={curTime}
                    onChange={(e) => setCurTime(e.target.value)}
                    feedbackInvalid="Please select the available time."
                    required
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
                    By continuing, you have read and agree the{' '}
                    <strong
                      onClick={() => setVisiblePrivacy(!visiblePrivacy)}
                      className="cursor-pointer"
                    >
                      terms and conditions.
                    </strong>
                  </span>
                </CCol>
                <CButton color="primary" type="submit" className="wid-100 dark-blue">
                  Confirm
                </CButton>
              </CCol>
            </CCardBody>
          </CForm>
        </CCard>
        {/* Privacy Error Modal */}
        <CModal
          alignment="center"
          visible={visibleErrorPrivacy}
          onClose={() => setVisibleErrorPrivacy(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Terms and Conditions</CModalTitle>
          </CModalHeader>
          <CModalBody>Please make sure to check the required terms and conditions.</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleErrorPrivacy(false)}>
              Ok
            </CButton>
          </CModalFooter>
        </CModal>
        {/* Privacy Modal */}
        <CModal
          alignment="center"
          visible={visiblePrivacy}
          onClose={() => setVisiblePrivacy(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">Terms and Conditions</CModalTitle>
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
