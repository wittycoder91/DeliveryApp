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
import { downloadInvoicePDF } from 'src/config/common'
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
