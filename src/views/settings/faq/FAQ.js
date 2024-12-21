import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CCard,
  CCardBody,
  CCol,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const FAQ = () => {
  const [curDatas, setCurDatas] = useState([])

  useEffect(() => {
    getDatas()
  }, [])

  const getDatas = async () => {
    try {
      const response = await api.get(API_URLS.GETALLFAQS)

      if (response.data.success && response.data.data?.length > 0) {
        setCurDatas(response.data.data)
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

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-3 pt-3 mb-0">FAQ</h3>
        <CCardBody>
          <CAccordion>
            {curDatas.map((item, index) => (
              <CAccordionItem key={item._id} itemKey={index + 1}>
                <CAccordionHeader>{item.title}</CAccordionHeader>
                <CAccordionBody>{item.content}</CAccordionBody>
              </CAccordionItem>
            ))}
          </CAccordion>
        </CCardBody>
      </CCard>
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
  )
}

export default FAQ
