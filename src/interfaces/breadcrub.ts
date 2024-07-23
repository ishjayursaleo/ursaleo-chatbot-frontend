export interface BreadCrumb {
  id: number
  title: string
  path: string // FIRST BREADCRUMB PATH SHOULD BE ADDED
  isActive: boolean
}
export interface ApplicationBreadCrumbs {
  UNAUTHORIZED: BreadCrumb[]
  NOTFOUND: BreadCrumb[]
  PROFILE: BreadCrumb[]
  NOTIFICATIONS: BreadCrumb[]
  DASHBOARD: BreadCrumb[]
  URSALEO: BreadCrumb[]
  UL_ADMIN: BreadCrumb[]
  MANAGETWINS: BreadCrumb[]
  MANAGE_UL_ADMIN_ENTITLEMENT: BreadCrumb[]
  EDIT_UL_ADMIN_ENTITLEMENT: BreadCrumb[]
  ADD_USERS_TO_CLIENT: BreadCrumb[]
  CLIENT_ADMIN_MENU: BreadCrumb[]
  MANAGE_CLIENT_TWINS: BreadCrumb[]
  VIEW_TWIN_DETAILS: BreadCrumb[]
  ADD_NEW_CLIENT: BreadCrumb[]
  ADD_NEW_TWIN: BreadCrumb[]
  ADMIN_LIST: BreadCrumb[]
  ADD_NEW_ADMIN: BreadCrumb[]
  UPLOAD_NEW_TWIN_VERSION: BreadCrumb[]
  CHATBOT: BreadCrumb[]
}
