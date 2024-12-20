import { jsPDF } from 'jspdf'
import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CRow,
  CCol,
  useColorModes,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilMenu, cilMoon, cilSun, cilBabyCarriage } from '@coreui/icons'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { AppHeaderDropdown } from './header/index'
import { useNotification } from './header/NotificationProvider'
import { showErrorMsg } from 'src/config/common'

const AppHeader = () => {
  const headerRef = useRef()
  const navigate = useNavigate()
  const [, setCookie] = useCookies()
  const { newData, setNewData, notificationCount, setNotificationCount } = useNotification()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // Download BOL
  const [visible, setVisible] = useState(false)
  const [curFilterData, setCurFilterData] = useState([])

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const handleDownloadConfirm = async () => {
    try {
      const response = await api.get(API_URLS.GETSELUSERINFOR, {
        params: { selEmail: localStorage.getItem('email') },
      })

      if (response.data.success && response.data.data?.length > 0) {
        const userData = response.data.data[0]

        if (userData) {
          const userName = userData?.name
          const userAddress = userData?.address
          const userCity = userData?.city
          const userState = userData?.state
          const userZipcode = userData?.zipcode

          for (let i = 0; i < curFilterData.length; i++) {
            const selData = curFilterData[i]
            const selPO = selData?.po
            const selWegiht = selData?.weight

            downloadInvoicePDF(
              userName,
              userAddress,
              userCity,
              userState,
              userZipcode,
              selPO,
              selWegiht,
            )
          }
        }
        setVisible(false)
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        showErrorMsg(error.response.data.msg)
      } else {
        showErrorMsg(error.message)
      }
    }
  }
  const setDownloadInvoice = () => {
    setCurFilterData([])
    const filteredData = newData.filter((item) => item.status === 1)

    if (filteredData.length > 0) {
      setCurFilterData(filteredData)
      setVisible(!visible)
    }
  }
  const handleGoToDelivery = (selStatus) => {
    setDownloadInvoice()

    setNotificationCount(0)
    setNewData([])
    setCookie('notification', 0)
    setCookie('notificationdata', [])

    if (selStatus < 0 || selStatus === 3) {
      navigate('/data/deliverylogs')
    } else {
      navigate('/data/delivery')
    }
  }
  const handleGoToMore = () => {
    setDownloadInvoice()

    setNotificationCount(0)
    setNewData([])
    setCookie('notification', 0)
    setCookie('notificationdata', [])

    const firstStatus = newData[0]?.status
    if (firstStatus < 0 || firstStatus === 3) {
      navigate('/data/deliverylogs')
    } else {
      navigate('/data/delivery')
    }
  }

  const downloadInvoicePDF = (
    userName,
    userAddress,
    userCity,
    userState,
    userZipcode,
    selPO,
    selWegiht,
  ) => {
    const doc = new jsPDF('p', 'pt', 'a4')
    const marginX = 40
    let currentY = 30
    const rowHeight = 20
    const pageWidth = doc.internal.pageSize.getWidth()

    // Title
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Bill of Lading', 210, currentY, { align: 'center' })

    // Bill Date
    currentY += 10
    doc.setFontSize(10)
    // Right-align: Calculate the position dynamically
    const billDateText = 'Bill Date: 11/27/2024'
    const billDateWidth = doc.getTextWidth(billDateText)
    // Position: 10px from the right margin
    const billDateX = pageWidth - marginX - billDateWidth - billDateWidth
    doc.text(billDateText, billDateX, currentY + 14)

    // Carrier and Shipment Info
    const headers = [
      [`Carrier Name: ${userName}`, 'Shipment Booking No:'],
      [`Carrier Address: ${userAddress}`, 'Trailer Number:'],
      [`City: ${userCity}`, 'Phone Number:'],
      [`State and Zip: ${userState} ${userZipcode}`, 'Fax Number:'],
    ]
    currentY += 20
    headers.forEach((header) => {
      doc.rect(marginX, currentY, 250, 20)
      doc.rect(marginX + 260, currentY, 250, 20)
      doc.text(header[0], marginX + 10, currentY + 14)
      doc.text(header[1], marginX + 270, currentY + 14)
      currentY += 20
    })

    // TO and FROM sections
    currentY += 10
    // Section headers
    doc.text('TO', marginX + 125, currentY + 7, { align: 'center' })
    doc.text('FROM', marginX + 385, currentY + 7, { align: 'center' })
    // Create individual rows for "TO" and "FROM"
    currentY += 10
    // TO Section
    doc.rect(marginX, currentY, 250, rowHeight)
    doc.text(userAddress, marginX + 10, currentY + 14)
    currentY += rowHeight
    doc.rect(marginX, currentY, 250, rowHeight)
    doc.text(userCity, marginX + 10, currentY + 14)
    currentY += rowHeight
    doc.rect(marginX, currentY, 250, rowHeight)
    doc.text(`${userState}, ${userZipcode}`, marginX + 10, currentY + 14)
    currentY += rowHeight
    doc.rect(marginX, currentY, 250, rowHeight)
    doc.text('', marginX + 10, currentY + 14)
    currentY += rowHeight
    doc.rect(marginX, currentY, 250, rowHeight)
    doc.text('', marginX + 10, currentY + 14)
    // Reset currentY to start of TO for FROM section alignment
    currentY -= rowHeight * 4
    // FROM Section
    doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 1
    doc.text('Arch Polymers, Inc.', marginX + 270, currentY + 14)
    currentY += rowHeight
    doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 2
    doc.text('300 PROGRESS WY', marginX + 270, currentY + 14)
    currentY += rowHeight
    doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 3
    doc.text('BELLEFONTAINE OH 43311', marginX + 270, currentY + 14)
    currentY += rowHeight
    doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 4
    doc.text('Tel: 614-437-5588', marginX + 270, currentY + 14)
    currentY += rowHeight
    doc.rect(marginX + 260, currentY, 250, rowHeight) // Row 4
    doc.text('', marginX + 270, currentY + 14)

    // PAYMENT and SHIPPER sections
    currentY += 30
    // Section headers
    doc.text('FROM PAYMENT, SEND BILL TO', marginX + 125, currentY + 7, { align: 'center' })
    doc.text("SHIPPER'S INSTRUCTIONS", marginX + 385, currentY + 7, { align: 'center' })
    // Create individual rows for "PAYMENT" and "SHIPPER"
    currentY += 10
    // PAYMENT Section
    const rows = 5
    for (let i = 0; i < rows; i++) {
      doc.rect(marginX, currentY, 250, rowHeight)
      doc.text('', marginX + 10, currentY + 14)
      currentY += rowHeight
    }
    // SHIPPER Section
    currentY -= rowHeight * 5
    for (let i = 0; i < rows; i++) {
      doc.rect(marginX + 260, currentY, 250, rowHeight)
      doc.text('', marginX + 10, currentY + 14)
      currentY += rowHeight
    }

    doc.setFontSize(9)
    currentY += 10
    // Table Headers
    const tableHeader = [
      { label: 'NO. SHIPPING UNITS', width: 130 },
      { label: 'TIME', width: 50 },
      { label: 'DESCRIPTION OF ARTICLES', width: 150 },
      { label: 'WEIGHT', width: 70 },
      { label: 'UNIT', width: 50 },
      { label: 'CHARGES', width: 60 },
    ]

    let tableX = marginX
    tableHeader.forEach((header) => {
      doc.rect(tableX, currentY, header.width, rowHeight)
      doc.text(header.label, tableX + 5, currentY + 14)
      tableX += header.width
    })

    // First Row
    currentY += rowHeight
    tableX = marginX
    doc.setFont('helvetica', 'normal')
    doc.rect(marginX, currentY, 130, rowHeight) // NO. SHIPPING UNITS
    doc.text('PP Purge', marginX + 5, currentY + 14)
    doc.rect(marginX + 130, currentY, 50, rowHeight) // TIME
    doc.rect(marginX + 180, currentY, 150, rowHeight) // DESCRIPTION
    doc.rect(marginX + 330, currentY, 70, rowHeight) // WEIGHT
    doc.text(`${selWegiht}`, marginX + 340, currentY + 14)
    doc.rect(marginX + 400, currentY, 50, rowHeight) // UNIT
    doc.text('LBS', marginX + 410, currentY + 14)
    doc.rect(marginX + 450, currentY, 60, rowHeight) // CHARGES

    // Second Row
    currentY += rowHeight
    tableX = marginX
    doc.setFont('helvetica', 'bold')
    doc.rect(marginX, currentY, 130, rowHeight)
    doc.text(`${selPO}`, marginX + 5, currentY + 14)
    doc.rect(marginX + 130, currentY, 50, rowHeight)
    doc.rect(marginX + 180, currentY, 150, rowHeight)
    doc.rect(marginX + 330, currentY, 70, rowHeight)
    doc.rect(marginX + 400, currentY, 50, rowHeight)
    doc.rect(marginX + 450, currentY, 60, rowHeight)

    // Third Row
    currentY += rowHeight
    tableX = marginX
    doc.rect(marginX, currentY, 130, rowHeight)
    doc.rect(marginX + 130, currentY, 50, rowHeight)
    doc.rect(marginX + 180, currentY, 150, rowHeight)
    doc.rect(marginX + 330, currentY, 70, rowHeight)
    doc.rect(marginX + 400, currentY, 50, rowHeight)
    doc.rect(marginX + 450, currentY, 60, rowHeight)

    // REMIT C.O.D. Section
    currentY += rowHeight
    doc.setFont('helvetica', 'bold')
    doc.rect(marginX, currentY, 250, rowHeight * 2 - 5) // REMIT C.O.D
    doc.text('REMIT C.O.D.', marginX + 5, currentY + 10)
    doc.rect(marginX + 250, currentY, 150, rowHeight * 2 - 5) // C.O.D AMOUNT
    doc.text('C.O.D. AMOUNT: $', marginX + 255, currentY + 10)
    doc.rect(marginX + 400, currentY, 110, rowHeight * 2 - 5) // C.O.D FEE
    doc.text('C.O.D. FEE', marginX + 405, currentY + 10)
    doc.text('PREPAID', marginX + 405, currentY + 20)
    doc.text('COLLECT', marginX + 405, currentY + 30)

    // TO & Consignor Section
    currentY += rowHeight * 2 - 5
    doc.setFont('helvetica', 'bold')
    doc.rect(marginX, currentY, 250, rowHeight * 5) // Address
    doc.text('TO:', marginX + 5, currentY + 14)
    doc.text('ADDRESS', marginX + 5, currentY + 30)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`${selPO}`, marginX + 5, currentY + 50)
    doc.rect(marginX + 250, currentY, 150, rowHeight * 5) // Signature
    doc.setFontSize(9)
    doc.text(
      'If this shipment is to be delivered to the consignee without recourse on the consignor, the consignor shall sign the following statement: The carrier shall not make delivery of this shipment without payment of freight and all other lawful charges.  _____________________________(Signature of Consignor)',
      marginX + 255,
      currentY + 14,
      { maxWidth: 145, align: 'left' },
    )
    doc.setFont('helvetica', 'bold')
    doc.rect(marginX + 400, currentY, 110, rowHeight * 5) // Address
    doc.text('TOTAL', marginX + 405, currentY + 14)
    doc.text('CHARGES $', marginX + 405, currentY + 25)

    // Note
    currentY += rowHeight * 5
    doc.setFont('helvetica', 'normal')
    doc.rect(marginX, currentY, 250, rowHeight * 3 + 10)
    doc.text(
      'NOTE: Where the rate is dependent on value; shippers are required to state specifically in writing the agreed or declared value of the property. The agreed or declared value of the property is hereby specifically stated by the shipper to be not exceeding              $                     per.',
      marginX + 5,
      currentY + 14,
      { maxWidth: 240, align: 'left' },
    )
    doc.rect(marginX + 250, currentY, 150, rowHeight * 3 + 10)
    doc.text('', marginX + 255, currentY + 14)
    doc.rect(marginX + 400, currentY, 110, rowHeight * 3 + 10)
    doc.text('Freight Charges are collect unless marked prepaid', marginX + 405, currentY + 14, {
      maxWidth: 100,
      align: 'left',
    })
    doc.setFont('helvetica', 'bold')
    doc.text('CHECK BOX IF PREPAID', marginX + 405, currentY + 50, {
      maxWidth: 100,
      align: 'left',
    })

    // Description
    currentY += rowHeight * 3 + 10
    doc.setFont('helvetica', 'normal')
    doc.rect(marginX, currentY, 510, rowHeight * 5)
    doc.text(
      'RECEIVED subject to the classifications and tariffs in effect on the date of the issue of this Bill of Lading, the property described above in apparent good order, except as noted (contents and condition of packages unknown), marked consigned and destined as indicated above which said carrier (the word carrier being understood through this contract as meaning any person or corporation in possession of the property under the contract) agrees to carry to its usual place of delivery as said destination. If on its route, otherwise to deliver to another carrier on the route to said destination. It is mutually agreed as to each carrier of all or any of said property, over all or any portion of said route to destination and as to each party at any time interested in all or any said property, that every service to be performed hereunder shall be subject to all the Bill of Lading terms and conditions in the governing classification on the date of shipment. Shipper hereby certifies that he is familiar with all the Bill of Lading terms and conditions in the governing classification and the said terms and conditions.',
      marginX + 5,
      currentY + 14,
      { maxWidth: 500, align: 'left' },
    )

    // Signature 1
    currentY += rowHeight * 5
    doc.rect(marginX, currentY, 170, rowHeight)
    doc.text('Shipper', marginX + 5, currentY + 14)
    doc.rect(marginX + 170, currentY, 170, rowHeight)
    doc.text('Carrier', marginX + 175, currentY + 14)
    doc.rect(marginX + 340, currentY, 170, rowHeight)
    doc.text('Consignee', marginX + 345, currentY + 14)

    // Signature 2
    currentY += rowHeight
    doc.rect(marginX, currentY, 170, rowHeight)
    doc.text('Per', marginX + 5, currentY + 14)
    doc.rect(marginX + 170, currentY, 170, rowHeight)
    doc.text('Per', marginX + 175, currentY + 14)
    doc.rect(marginX + 340, currentY, 170, rowHeight)
    doc.text('Date:', marginX + 345, currentY + 14)

    const timestampMs = Date.now()
    const newFilename = `bill_${timestampMs}.pdf`
    doc.save(newFilename)
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        {/* <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink
              href="/#/data/deliverylogs"
              className="position-relative"
              onClick={handleGoToDelivery}
            >
              <CIcon icon={cilBell} size="lg" />
              {notificationCount > 0 && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 end-0">
                  {notificationCount}
                </span>
              )}
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        <CHeaderNav className="ms-auto position-relative">
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CIcon icon={cilBell} size="lg" />
              {notificationCount > 0 && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 end-0">
                  {notificationCount}
                </span>
              )}
            </CDropdownToggle>
            {newData?.length > 0 && (
              <CDropdownMenu>
                {newData.slice(0, 4).map((row, index) => (
                  <CDropdownItem
                    key={index}
                    className="d-flex align-items-center"
                    as="button"
                    type="button"
                    onClick={() => handleGoToDelivery(row?.status)}
                  >
                    <CRow>
                      <CCol className="d-flex fw-bold">
                        <CIcon className="me-2" icon={cilBabyCarriage} size="lg" />
                        <CRow className="d-flex justify-content-between w-100">
                          <CCol>{row?.userName}</CCol>
                          <CCol>
                            {row?.status === 0
                              ? 'Waiting'
                              : row?.status === 1
                                ? 'Pending for Receiving'
                                : row?.status === 2
                                  ? 'Received'
                                  : row?.status === 3
                                    ? 'Accepted'
                                    : 'Rejected'}
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol className="ms-4">
                        {row?.materialName} &nbsp; {row?.packagingName}
                      </CCol>
                      <CCol className="ms-4 fw-bolder">{row?.weight} lbs</CCol>
                    </CRow>
                  </CDropdownItem>
                ))}
                {newData.length > 4 && (
                  <CDropdownItem
                    className="text-center text-primary"
                    as="button"
                    type="button"
                    onClick={handleGoToMore}
                  >
                    See more
                  </CDropdownItem>
                )}
              </CDropdownMenu>
            )}
          </CDropdown>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">BOL Information</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to download the BOL template?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={handleDownloadConfirm}>
            Yes
          </CButton>
        </CModalFooter>
      </CModal>
    </CHeader>
  )
}

export default AppHeader
