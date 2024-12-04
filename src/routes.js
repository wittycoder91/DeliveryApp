import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// data
const Delivery = React.lazy(() => import('./views/data/delivery/Delivery'))
const DeliveryDetail = React.lazy(() => import('./views/data/delivery/DeliveryDetail'))
const DeliveryLogs = React.lazy(() => import('./views/data/deliverylogs/Deliverylogs'))
const DeliverylogDetail = React.lazy(() => import('./views/data/deliverylogs/DeliverylogDetail'))

// Settings
const Profile = React.lazy(() => import('./views/settings/profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/data', name: 'Data', element: Delivery, exact: true },
  { path: '/data/delivery', name: 'Delivery', element: Delivery },
  { path: '/data/deliverydetail', name: 'Delivery Detail', element: DeliveryDetail },
  { path: '/data/deliverylogs', name: 'DeliveryLogs', element: DeliveryLogs },
  { path: '/data/deliverylogdetail', name: 'DeliveryLogDetail', element: DeliverylogDetail },
  { path: '/setting', name: 'Setting', element: Profile, exact: true },
  { path: '/setting/profile', name: 'Profile', element: Profile },
]

export default routes
