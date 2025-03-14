/* eslint-disable max-len */
export enum APP_ROUTES {
  ROOT = '/',
  PROFILE = '/profile',
  NOTIFICATIONS = '/notifications',
  URSALEO_CLIENTS = '/:clientId/:id',
  VIEW_TWIN = '/client/:clientId/twin/:twinId/:twinVersionId',
  MANAGE_TWINS = '/manage-twins/:id',
  UL_ADMIN = '/manage-ul-admin',
  MANAGE_UL_ADMIN_ENTITLEMENT = '/manage-ul-admin/client-admin/:clientId/:clientName/manage-entitlement',
  EDIT_UL_ADMIN_ENTITLEMENT = '/manage-ul-admin/client-admin/:clientId/:clientName/manage-entitlement/:userId/:userRole/:userFirstName/edit',
  ADD_USERS_TO_CLIENT = '/manage-ul-admin/client-admin/:clientId/manage-entitlement/add-users',
  CLIENT_ADMIN_MENU = '/manage-ul-admin/client-admin/:clientId/:clientName',
  MANAGE_CLIENT_TWINS = '/manage-ul-admin/client-admin/:clientId/:clientName/manage-client-twins',
  VIEW_TWIN_DETAILS = '/manage-ul-admin/client-admin/:clientId/:clientName/manage-client-twins/:twinId/:twinName/details/:twinVersionDefaultId',
  ADD_NEW_CLIENT = '/manage-ul-admin/add-client',
  ADD_NEW_TWIN = '/manage-ul-admin/client-admin/:clientId/:clientName/manage-client-twins/add-twin',
  EDIT_TWIN = '/manage-ul-admin/client-admin/:clientId/:clientName/manage-client-twins/edit-twin/:twinId/:twinName',
  ADMIN_LIST = '/manage-ul-admin/admin-list',
  ADD_NEW_ADMIN = '/manage-ul-admin/admin-list/add-admin',
  WEB_SOCKET_DETAILS = '/document-view/:extension/:downloadableUrl/:name',
  CONFIGURATION = '/manage-ul-admin/client-admin/:clientId/:clientName/manage-configuration',
  MANAGE_CLIENT_CONFIGURATIONS = '/manage-ul-admin/client-admin/:clientId/:clientName/manage-configurations',
  UPLOAD_NEW_TWIN_VERSION = '/manage-ul-admin/client-admin/:clientId/:clientName/manage-client-twins/:twinId/:twinName/details/upload-new-version',
  NEW_USER_LANDING = '/login',
  CHATBOT = '/chatbot/:clientId',
}
