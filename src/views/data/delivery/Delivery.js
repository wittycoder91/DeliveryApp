import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CContainer,
  CFormSelect,
  CRow,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { cilPencil, cilSearch, cilXCircle, cilImage } from '@coreui/icons'

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
    'Status',
    'Note',
    'Action',
  ]

  const tableData = Array.from({ length: 500 }, (_, index) => ({
    no: index + 1,
    product: `Material ${index + 1}`,
    image: `Image ${index + 1}`,
    description: `Description ${index + 1}`,
    quality: `Quality ${index + 1}`,
    amount: `Amount ${index + 1}`,
    sendDate: `2020-09-${String(index + 10).padStart(2, '0')}`,
    location: `Location ${index + 1}`,
    status: index % 2 === 0 ? 'Accepted' : 'Pending',
    note: `Note ${index + 1}`,
  }))

  const [visible, setVisible] = useState(false)
  const [visibleDel, setVisibleDel] = useState(false)
  const [selected, setSelected] = useState()
  const [logoPreview, setLogoPreview] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10) // Default rows per page
  const totalPages = Math.ceil(tableData.length / itemsPerPage)
  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTableData = tableData.slice(startIndex, startIndex + itemsPerPage)

  // Handle the Table pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }
  const getPaginationItems = () => {
    const pages = []
    const maxVisiblePages = 3
    const delta = 1

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > delta + 2) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - delta)
      const end = Math.min(totalPages - 1, currentPage + delta)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - (delta + 1)) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }

  // Preview the upload Material Image
  const handleLogoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result) // Set the preview URL
      }
      reader.readAsDataURL(file) // Convert the file to a base64 string
    }
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Delivery</strong>
        </CCardHeader>
        <CCardBody>
          {/* Table */}
          <CContainer className="mb-3">
            <CButton color="primary" className="w-max" onClick={() => setVisible(!visible)}>
              Add
            </CButton>
          </CContainer>
          <CContainer className="d-flex justify-content-center align-items-start gap-3">
            <CInputGroup className="flex-nowrap mb-4">
              <CInputGroupText id="addon-wrapping">
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput
                placeholder="Search Index"
                aria-label="Search Index"
                aria-describedby="addon-wrapping"
                className="w-max"
              />
            </CInputGroup>
            <CButton color="primary">Search</CButton>
          </CContainer>
          <CContainer className="table-responsive">
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
                {currentTableData.map((row, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell className="text-center" scope="row">
                      {startIndex + index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell className="text-center">{row.product}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.image}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.description}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.quality}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.amount}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.sendDate}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.location}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.status}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.note}</CTableDataCell>
                    <CTableDataCell>
                      <CCol className="d-flex justify-content-center align-items-center">
                        <CButton>
                          <CIcon icon={cilPencil} onClick={() => setVisible(!visible)} />
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
          </CContainer>
          {/* Pagination */}
          <CRow className="mt-2">
            <CCol
              xs={12}
              sm={6}
              className="mb-2 mb-sm-0 d-flex justify-content-center justify-content-sm-start"
            >
              <CFormSelect
                value={itemsPerPage}
                className="w-max h-max"
                onChange={handleItemsPerPageChange}
              >
                <option value={10}>10 rows</option>
                <option value={15}>15 rows</option>
                <option value={20}>20 rows</option>
                <option value={30}>30 rows</option>
                <option value={50}>50 rows</option>
                <option value={100}>100 rows</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12} sm={6} className="d-flex justify-content-center justify-content-sm-end">
              <CPagination className="d-flex flex-wrap align-items-center justify-content-center">
                {/* Previous Button */}
                <CPaginationItem
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &laquo;
                </CPaginationItem>

                {/* Pagination Numbers */}
                {getPaginationItems().map((page, index) =>
                  page === '...' ? (
                    <CPaginationItem key={`ellipsis-${index}`} disabled>
                      ...
                    </CPaginationItem>
                  ) : (
                    <CPaginationItem
                      key={page}
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </CPaginationItem>
                  ),
                )}

                {/* Next Button */}
                <CPaginationItem
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &raquo;
                </CPaginationItem>
              </CPagination>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      {/* Add Modal */}
      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">Delivery</CModalTitle>
        </CModalHeader>
        <CModalBody className="d-flex flex-column gap-2">
          <CCol className="d-flex gap-4">
            <CCol>
              <CFormLabel>Material</CFormLabel>
              <CFormSelect
                options={[
                  { label: 'One', value: '1' },
                  { label: 'Two', value: '2' },
                ]}
              />
            </CCol>
            <CCol>
              <CFormLabel>Amount</CFormLabel>
              <CFormInput placeholder="Amount" />
            </CCol>
          </CCol>
          <CCol className="d-flex gap-4">
            <CCol>
              <CFormLabel>Color</CFormLabel>
              <CFormInput placeholder="Color" />
            </CCol>
            <CCol>
              <CFormLabel>Quality</CFormLabel>
              <CFormInput type="number" placeholder="Quality" />
            </CCol>
          </CCol>
          <CCol className="d-flex gap-4">
            <CCol>
              <CFormLabel>Location</CFormLabel>
              <CFormInput placeholder="Location" />
            </CCol>
            <CCol>
              <CFormLabel>Note</CFormLabel>
              <CFormInput placeholder="Note" />
            </CCol>
          </CCol>
          <CCol>
            <CFormLabel>Description</CFormLabel>
            <CFormTextarea rows={3}></CFormTextarea>
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
          {logoPreview && (
            <div className="mb-4 text-center">
              <p className="text-body-secondary">Logo Preview:</p>
              <img
                src={logoPreview}
                alt="Logo Preview"
                style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
              />
            </div>
          )}
          <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
            <CCol>
              <CFormLabel>Date</CFormLabel>
              <DayPicker mode="single" selected={selected} onSelect={setSelected} />
            </CCol>
            <CCol>
              <CFormLabel>Time</CFormLabel>
              <CFormSelect
                options={[
                  { label: '8:00 AM', value: '1' },
                  { label: '12:00 AM', value: '2' },
                  { label: '2:00 PM', value: '3' },
                  { label: '5:00 PM', value: '4' },
                ]}
              />
            </CCol>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
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
          <CButton color="primary">Confirm</CButton>
        </CModalFooter>
      </CModal>
    </CCol>
  )
}

export default Tables
