export const API_URLS = {
  // Auth
  LOGIN: `${process.env.REACT_APP_API_URL}/auth/user/login`,
  REGISTER: `${process.env.REACT_APP_API_URL}/auth/user/register`,
  GETSELUSERINFOR: `${process.env.REACT_APP_API_URL}/user/get-sel-userinfor`,
  GETALLINDUSTRY: `${process.env.REACT_APP_API_URL}/auth/admin/get-allindustry`,
  // Dashboard
  GETDASHBOARDLOYALTY: `${process.env.REACT_APP_API_URL}/dashboard/user/get-dashboard-loyalty`,
  GETDASHBOARDWIDGET: `${process.env.REACT_APP_API_URL}/dashboard/user/get-dashboard-widget`,
  GETDASHBOARDDELIERY: `${process.env.REACT_APP_API_URL}/dashboard/user/get-dashboard-delivery`,
  GETDASHBOARDWEIGHT: `${process.env.REACT_APP_API_URL}/dashboard/user/get-dashboard-weight`,
  // Setting
  GETSELUSERINFORMATION: `${process.env.REACT_APP_API_URL}/setting/user/get-user-information`,
  UPDATESELUSERINFORMATION: `${process.env.REACT_APP_API_URL}/setting/user/update-user-information`,
  GETALLMATERIALS: `${process.env.REACT_APP_API_URL}/setting/admin/get-allmaterials`,
  GETALLPACKAGES: `${process.env.REACT_APP_API_URL}/setting/admin/get-allpackages`,
  GETSETTING: `${process.env.REACT_APP_API_URL}/setting/admin/get-setting`,
  GETALLUSERS: `${process.env.REACT_APP_API_URL}/setting/admin/get-allusers`,
  GETALLCOLOR: `${process.env.REACT_APP_API_URL}/setting/admin/get-allcolors`,
  GETALLRESIDUE: `${process.env.REACT_APP_API_URL}/setting/admin/get-all-residue-materials`,
  GETALLCONDITION: `${process.env.REACT_APP_API_URL}/setting/admin/get-all-conditions`,
  GETALLFAQS: `${process.env.REACT_APP_API_URL}/setting/admin/get-all-faq`,
  // Delivery
  ADDDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/user/add-delivery`,
  LASTESTDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/user/lastest-delivery`,
  GETDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/user/get-delivery`,
  UPDATESELDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/user/update-sel-delivery`,
  GETSELDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/admin/get-sel-delivery`,
  // Delivery Logs
  GETAllDELIVERYLOGS: `${process.env.REACT_APP_API_URL}/delivery/user/get-all-deliverylogs`,
  GETSELDELIVERYLOG: `${process.env.REACT_APP_API_URL}/delivery/user/get-sel-deliverylog`,
}
