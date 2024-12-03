import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// data
const DeliveryLogs = React.lazy(() => import('./views/data/deliverylogs/Deliverylogs'))
const Delivery = React.lazy(() => import('./views/data/delivery/Delivery'))

// Settings
const Profile = React.lazy(() => import('./views/settings/profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/data', name: 'Data', element: Delivery, exact: true },
  { path: '/data/deliverylogs', name: 'DeliveryLogs', element: DeliveryLogs },
  { path: '/data/delivery', name: 'Delivery', element: Delivery },
  { path: '/setting', name: 'Setting', element: Profile, exact: true },
  { path: '/setting/profile', name: 'Profile', element: Profile },
]

export default routes
