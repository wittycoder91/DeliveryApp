import React, { useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilXCircle } from '@coreui/icons'

const Tables = () => {
  const tableHeaders = [
    'No',
    'Material',
    'Image',
    'Description',
    'Quality',
    'Amount',
    'Send Date',
    'location',
    'Note',
    'Action',
  ]

  const tableData = Array.from({ length: 3 }, (_, index) => ({
    no: index + 1,
    product: `Material ${index + 1}`,
    image: `Image ${index + 1}`,
    description: `Description ${index + 1}`,
    quality: `Quality ${index + 1}`,
    amount: `Amount ${index + 1}`,
    sendDate: `2020-09-${String(index + 10).padStart(2, '0')}`,
    location: `Location ${index + 1}`,
    note: `Note ${index + 1}`,
  }))

  const navigate = useNavigate()
  const [visibleDel, setVisibleDel] = useState(false)

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CRow className="flex-row justify-content-between mx-4 mt-3 mb-2">
          <h3 className="w-max p-0 m-0">Delivery</h3>
          <CButton
            color="primary"
            className="wid-100 dark-blue"
            onClick={() => navigate(`/data/deliverydetail`)}
          >
            Add
          </CButton>
        </CRow>
        <CCardBody className="p-0 d-flex flex-column">
          <img src="./images/table-banner.jpg" alt="" className="delivery-table-banner" />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <h3 className="px-4 pt-3 mb-0">Pending Deliveries</h3>
        <CCardBody className="p-0 d-flex flex-column">
          {/* Table */}
          <CCol className="table-responsive p-3">
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
                {tableData.map((row, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell className="text-center" scope="row">
                      {index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell className="text-center">{row.product}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.image}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.description}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.quality}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.amount}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.sendDate}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.location}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.note}</CTableDataCell>
                    <CTableDataCell>
                      <CCol className="d-flex justify-content-center align-items-center">
                        <CButton>
                          <CIcon
                            icon={cilPencil}
                            onClick={() => navigate(`/data/deliverydetail`)}
                          />
                        </CButton>
                        <CButton>
                          <CIcon icon={cilXCircle} onClick={() => setVisibleDel(!visibleDel)} />
                        </CButton>
                      </CCol>
                    </CTableDataCell>
                  </CTableRow>
                ))}
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
        <CModalBody>Do you want to remove delivery information</CModalBody>
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
