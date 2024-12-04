import React from 'react'

import { CCard, CCardBody, CCol, CRow, CCardHeader, CProgress } from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import WidgetsDropdown from './WidgetsDropdown'

const Dashboard = () => {
  const random = () => Math.round(Math.random() * 100)

  return (
    <CCol className="d-flex flex-column gap-3">
      <CCard className="p-4">
        <h3>Loyalty Rewards</h3>
        <CCol className="d-flex justify-content-center align-items-center gap-4">
          <CProgress height={30} color="warning" value={90} className="w-100 p-0 fs-5">
            90 / 150 XP
          </CProgress>
          <CCol className="d-flex justify-content-center align-items-center mx-2">
            <img src="/icons/gold.png" alt="" width={42} height={50} />
          </CCol>
        </CCol>
      </CCard>
      <CCard className="p-4 gap-2">
        <h3>Supply Information</h3>
        <WidgetsDropdown />
      </CCard>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Bar Chart</CCardHeader>
            <CCardBody>
              <CChartBar
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'Delivery History',
                      backgroundColor: '#f87979',
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                  ],
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Rewards Chart</CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'Rewards History',
                      backgroundColor: 'rgba(151, 187, 205, 0.2)',
                      borderColor: 'rgba(151, 187, 205, 1)',
                      pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                      pointBorderColor: '#fff',
                      data: [random(), random(), random(), random(), random(), random(), random()],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>
  )
}

export default Dashboard
