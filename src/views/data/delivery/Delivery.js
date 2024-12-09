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
    'Weight',
    'Packaging',
    'The Total of packages',
    'Residue Material',
    'Color',
    'Conditions',
    'Image',
    'Send Date',
    'Status',
    'Action',
  ]

  const tableData = Array.from({ length: 3 }, (_, index) => ({
    no: index + 1,
    material: `Material ${index + 1}`,
    weight: `Weight ${index + 1}`,
    packaging: `Packaging ${index + 1}`,
    packagingCount: `The Total of packages ${index + 1}`,
    residue: `Residue Material ${index + 1}`,
    color: `Color ${index + 1}`,
    conditions: `Conditions ${index + 1}`,
    image: `Image ${index + 1}`,
    sendDate: `2020-09-${String(index + 10).padStart(2, '0')}`,
    status: index % 2 === 0 ? 'Pending' : 'Accepted',
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
        <h3 className="px-4 pt-3 mb-0">Pending & Accepted Deliveries</h3>
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
                    <CTableDataCell className="text-center">{row.material}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.weight}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.packaging}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.packagingCount}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.residue}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.color}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.conditions}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.image}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.sendDate}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.status}</CTableDataCell>
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
