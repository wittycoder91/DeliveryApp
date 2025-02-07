import React, { useEffect, useState } from 'react'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
// import { CCard, CCardBody, CCol, CRow, CProgress, CFormLabel } from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'

import api from 'src/services'
import WidgetsDropdown from './WidgetsDropdown'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const Dashboard = () => {
  // const [curWeight, setCurWeight] = useState(0)
  // const [curPlanWeight, setCurPlanWeight] = useState(0)
  // const [curLoyalty, setCurLoyalty] = useState(0)
  // const [curImageUrl, setCurImageUrl] = useState('')
  // const [curLoyaltyLevel, setCurLoyaltyLevel] = useState('')
  // const [curRewards, setCurRewards] = useState('')
  // const [curBenefit, setCurBenefit] = useState('')
  const [curDeliveryData, setDeliveryData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Delivery History',
        backgroundColor: '#f87979',
        data: [],
      },
    ],
  })
  const [weightData, setWeightData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Weight History',
        backgroundColor: '#f87979',
        data: [],
      },
    ],
  })

  useEffect(() => {
    // getLoyaltyData()
    getDeliveryData()
    getWeightData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const getLoyaltyData = async () => {
  //   try {
  //     const response = await api.get(API_URLS.GETDASHBOARDLOYALTY)

  //     if (response.data.success && response.data.data) {
  //       setCurWeight(response.data.data?.totalweight)
  //       setCurPlanWeight(response.data.data?.loyaltyVal)
  //       setCurLoyalty(response.data.data?.loyalty)
  //       setCurBenefit(response.data.data?.benefit)

  //       if (response.data.data?.loyalty === 1) {
  //         setCurImageUrl('/icons/bronz.png')
  //         setCurLoyaltyLevel('Bronze')
  //       } else if (response.data.data?.loyalty === 2) {
  //         setCurImageUrl('/icons/silver.png')
  //         setCurLoyaltyLevel('Silver')
  //       } else if (response.data.data?.loyalty === 3) {
  //         setCurImageUrl('/icons/gold.png')
  //         setCurLoyaltyLevel('Golden')
  //       } else {
  //         setCurImageUrl('/icons/beginner.png')
  //         setCurLoyaltyLevel('Beginner')
  //       }

  //       let rewardsStr = ''
  //       rewardsStr = response.data.data?.totalweight
  //       if (response.data.data?.loyalty < 3) {
  //         rewardsStr += ' / ' + response.data.data?.loyaltyVal + ' LBS'
  //       }
  //       setCurRewards(rewardsStr)
  //     } else {
  //       showWarningMsg(response.data.message)
  //     }
  //   } catch (error) {
  //     if (error.response.data.msg) {
  //       showErrorMsg(error.response.data.msg)
  //     } else {
  //       showErrorMsg(error.message)
  //     }
  //   }
  // }
  const getDeliveryData = async () => {
    try {
      const response = await api.get(API_URLS.GETDASHBOARDDELIERY)

      if (response.data.success && response.data.data) {
        const chartData = response.data.data

        // Process the data to populate the chart
        const updatedData = {
          labels: chartData.map((item) => item.month),
          datasets: [
            {
              label: 'Delivery History',
              backgroundColor: '#f87979',
              data: chartData.map((item) => item.count),
            },
          ],
        }

        setDeliveryData(updatedData)
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
  const getWeightData = async () => {
    try {
      const response = await api.get(API_URLS.GETDASHBOARDWEIGHT)

      if (response.data.success && response.data.data) {
        const chartData = response.data.data

        // Process the data to populate the chart
        const updatedData = {
          labels: chartData.map((item) => item.month),
          datasets: [
            {
              label: 'Weight History',
              backgroundColor: '#79f879',
              data: chartData.map((item) => item.totalWeight),
            },
          ],
        }

        setWeightData(updatedData)
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

  return (
    <CCol className="d-flex flex-column gap-3">
      {/* <CCard className="d-flex flex-column gap-3 p-4">
        <CCol className="d-flex flex-row gap-3">
          {curImageUrl.length > 0 && (
            <div className="mx-2">
              <img src={curImageUrl} alt="" width={60} height={75} />
            </div>
          )}
          <CCol>
            <CCol className="d-flex flex-row align-items-center justify-content-between">
              <h3>My Loyalty Level: {curLoyaltyLevel}</h3>
              <h5>
                {curLoyalty === 0 ? (
                  <>
                    <span className="text-success fw-bold">{curPlanWeight - curWeight} </span>
                    LBS until Bronze
                  </>
                ) : curLoyalty === 1 ? (
                  <>
                    <span className="text-success fw-bold">{curPlanWeight - curWeight} </span>
                    LBS until Silver
                  </>
                ) : curLoyalty === 2 ? (
                  <>
                    <span className="text-success fw-bold">{curPlanWeight - curWeight} </span>
                    LBS until Golden
                  </>
                ) : (
                  ''
                )}
              </h5>
            </CCol>
            <CCol className="d-flex justify-content-center align-items-center position-relative gap-4">
              <CProgress
                height={30}
                color="warning"
                value={curLoyalty === 3 ? 100 : (curWeight / curPlanWeight) * 100}
                className="w-100 p-0 fs-5"
              />
              <CFormLabel className="position-absolute text-black fs-4 mb-0">
                {curRewards}
              </CFormLabel>
            </CCol>
          </CCol>
        </CCol>
        <div>
          <h5>Loyalty Rewards Benefit</h5>
          <p>{curBenefit}</p>
        </div>
      </CCard> */}
      <CCard className="p-4 gap-2">
        <h3>Supply Information</h3>
        <WidgetsDropdown />
      </CCard>
      <CRow>
        <CCol md={6}>
          <CCard className="mb-4">
            <h3 className="px-4 pt-3">Delivery Chart</h3>
            <CCardBody>
              <CChartBar data={curDeliveryData} labels="months" />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className="mb-4">
            <h3 className="px-4 pt-3">Estimated Weight Chart</h3>
            <CCardBody>
              <CChartLine data={weightData} labels="months" />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>
  )
}

export default Dashboard
