import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import {
  CAvatar,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showErrorMsg } from 'src/config/common'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const [cookies, , removeCookie] = useCookies()
  const dispatch = useDispatch()
  const avatar = useSelector((state) => state.avatar)

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await api.get(API_URLS.GETSELUSERINFOR, {
          params: { selEmail: localStorage.getItem('email') },
        })

        if (response.data.success && response.data.data?.length > 0) {
          const rawAvatarPath = response.data.data[0].avatarPath
          const normalizedAvatarPath = rawAvatarPath.replace(/\\/g, '/')
          const avatarUrl = `${process.env.REACT_APP_UPLOAD_URL}${normalizedAvatarPath}`
          dispatch({ type: 'setAvatar', avatar: avatarUrl })
        }
      } catch (error) {
        if (error.response?.data?.msg) {
          showErrorMsg(error.response.data.msg)
        } else {
          showErrorMsg(error.message)
        }
      }
    }

    fetchAvatar()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    Object.keys(cookies).forEach((cookieName) => removeCookie(cookieName))

    navigate('/login')
  }

  return (
    <CCol className="d-flex">
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          {/* <CAvatar src={curAvatar} size="md" /> */}
          <CAvatar src={avatar} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
          <CDropdownItem href="/#/setting/setting">
            <CIcon icon={cilUser} className="me-2" />
            Setting
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem href="#/login" onClick={handleLogout}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Log out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </CCol>
  )
}

export default AppHeaderDropdown
