import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CRow,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg } from 'src/config/common'
import { useNotification } from 'src/components/header/NotificationProvider'

const Tables = () => {
  const tableHeaders = [
    'No',
    'PO #',
    'Material',
    'Weight',
    'Packaging',
    'The Total of packages',
    'Residue Material',
    'Color',
    'Conditions',
    'Send Date',
    'Time',
    'Status',
  ]

  const navigate = useNavigate()
  const { notificationCount } = useNotification()
  const [visibleDel, setVisibleDel] = useState(false)
  const [curSearh, setCurSearch] = useState('')
  const [curData, setCurData] = useState([])

  const [curMaterial, setCurMaterial] = useState(0)
  const [allMaterials, setAllMaterials] = useState([])
  const [curPackage, setCurPackage] = useState(0)
  const [allPackages, setAllPackages] = useState([])

  useEffect(() => {
    getAllMaterials()
    getAllPackages()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getDelivery(curMaterial, curPackage, curSearh)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationCount])

  const getAllMaterials = async () => {
    try {
      const response = await api.get(API_URLS.GETALLMATERIALS)

      if (response.data.success) {
        let materials = response.data.data || []
        const allOption = {
          _id: '0',
          materialName: 'All',
          materialDesc: '',
          note: '',
        }
        materials = [allOption, ...materials]
        setAllMaterials(materials)
        setCurMaterial(0)
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
        let packages = response.data.data || []
        const allOption = {
          _id: '0',
          name: 'All',
        }
        packages = [allOption, ...packages]
        setAllPackages(packages)
        setCurPackage(0)
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
  const getDelivery = async (curMaterial, curPackage, curSearh) => {
    try {
      const response = await api.get(API_URLS.GETDELIVERY, {
        params: {
          curMaterial: curMaterial,
          curPackage: curPackage,
          curSearh: curSearh,
        },
      })

      if (response.data.success) {
        setCurData(response.data.data)
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

  const handleSearch = () => {
    getDelivery(curMaterial, curPackage, curSearh)
  }
  const handleGotoDetail = (selId) => {
    navigate(`/data/deliverydetail/${selId}`)
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CRow className="flex-row justify-content-between mx-4 mt-3 mb-2">
          <h3 className="w-max p-0 m-0">Delivery</h3>
          <CButton
            color="primary"
            className="wid-100 dark-blue"
            onClick={() => navigate(`/data/adddelivery`)}
          >
            Add
          </CButton>
        </CRow>
        <CCardBody className="p-0 d-flex flex-column">
          <img src="./images/table-banner.jpg" alt="" className="delivery-table-banner" />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <h3 className="px-4 pt-3 mb-0">Delivery Orders</h3>
        <CCardBody className="px-3 d-flex flex-column">
          {/* Table */}
          <CCol className="d-flex flex-wrap flex-md-row flex-column gap-3 mb-3">
            <CCol className="d-flex flex-row justify-content-center align-items-center gap-3">
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
            <CCol className="d-flex flex-row justify-content-center align-items-center gap-3">
              <CFormLabel>Package</CFormLabel>
              <CFormSelect
                options={allPackages?.map((packageItem) => ({
                  label: packageItem.name,
                  value: packageItem._id,
                }))}
                value={curPackage}
                onChange={(e) => setCurPackage(e.target.value)}
              />
            </CCol>
          </CCol>
          <CCol className="d-flex justify-content-center align-items-start gap-3">
            <CInputGroup className="flex-nowrap mb-4">
              <CInputGroupText id="addon-wrapping">
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput
                placeholder="Search Index"
                className="w-max"
                value={curSearh}
                onChange={(e) => setCurSearch(e.target.value)}
              />
            </CInputGroup>
            <CButton color="primary dark-blue" onClick={handleSearch}>
              Search
            </CButton>
          </CCol>
          <CCol className="table-responsive">
            <CTable>
              <CTableHead>
                <CTableRow>
                  {tableHeaders.map((header, index) => (
                    <CTableHeaderCell className="text-center" scope="col" key={index}>
                      {header}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {curData?.length > 0 ? (
                  curData.map((row, index) => (
                    <CTableRow
                      key={index}
                      onClick={() => handleGotoDetail(row?._id)}
                      className="cursor-pointer"
                    >
                      <CTableHeaderCell className="text-center" scope="row">
                        {index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell className="text-center">
                        {row?.po > 0 ? row?.po : ''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{row?.materialName}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.weight}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.packageName}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.countpackage}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.residue}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.color}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.condition}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.date}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {new Date(row?.time * 1000).toISOString().substr(11, 8)}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {row?.status === 0
                          ? 'Waiting'
                          : row?.status === 1
                            ? 'Pending'
                            : row?.status === 2
                              ? 'Received'
                              : 'Accepted'}
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={12} className="text-center">
                      There is no result
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCol>
        </CCardBody>
      </CCard>
      {/* Remove Modal */}
      <CModal
        alignment="center"
        visible={visibleDel}
        onClose={() => setVisibleDel(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Delivery Remove</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to remove the current delivery information</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDel(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => setVisibleDel(false)}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </CCol>
  )
}

export default Tables
