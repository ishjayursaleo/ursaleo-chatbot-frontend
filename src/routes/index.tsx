/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {
  AddNewAdminUser,
  AddNewClient,
  AddNewTwin,
  AddNewUsers,
  AdminClientMenu,
  Dashboard,
  EditEntitlement,
  ManageEntitlement,
  NewUserLanding,
  ULAdminHome,
  ULAdminList,
  UploadNewTwinVersion,
  WebSocketDetails,
  ChatBot
} from '../pages'
import { AppLayout } from '../templates'
import { APP_ROUTES, BREAD_CRUMB } from '../utils/constants'
import ManageTwins from '../pages/ManageTwins/ManageTwins'
import ManageClientTwins from '../pages/ManageClientTwins/ManageClientTwins'
import ViewTwinDetails from '../pages/ViewTwinDetails/ViewTwinDetails'
import ManageNewClientConfiguration from '../pages/ManageNewClientConfiguration/ManageNewClientConfiguration'
import EditTwin from '../pages/EditTwin/EditTwin'

const publicRoutes: any = [
  {
    path: APP_ROUTES.NEW_USER_LANDING,
    element: <NewUserLanding />
  }
]

const privateRoutes: any = [
  {
    path: APP_ROUTES.ROOT,
    element: <AppLayout breadCrumb={BREAD_CRUMB.DASHBOARD}><Dashboard /></AppLayout>
  },
  {
    path: APP_ROUTES.VIEW_TWIN,
    element: <AppLayout breadCrumb={BREAD_CRUMB.URSALEO}><ManageTwins /></AppLayout>
  },
  {
    path: APP_ROUTES.MANAGE_TWINS,
    element: <AppLayout breadCrumb={BREAD_CRUMB.MANAGETWINS}><ManageTwins /></AppLayout>
  },
  {
    path: APP_ROUTES.UL_ADMIN,
    element: <AppLayout breadCrumb={BREAD_CRUMB.UL_ADMIN}><ULAdminHome /></AppLayout>
  },
  {
    path: APP_ROUTES.MANAGE_UL_ADMIN_ENTITLEMENT,
    element: <AppLayout breadCrumb={BREAD_CRUMB.MANAGE_UL_ADMIN_ENTITLEMENT}><ManageEntitlement /></AppLayout>
  },
  {
    path: APP_ROUTES.EDIT_UL_ADMIN_ENTITLEMENT,
    element: <AppLayout breadCrumb={BREAD_CRUMB.EDIT_UL_ADMIN_ENTITLEMENT}><EditEntitlement /></AppLayout>
  },
  {
    path: APP_ROUTES.ADD_USERS_TO_CLIENT,
    element: <AppLayout breadCrumb={BREAD_CRUMB.ADD_USERS_TO_CLIENT}><AddNewUsers /></AppLayout>
  },
  {
    path: APP_ROUTES.CLIENT_ADMIN_MENU,
    element: <AppLayout breadCrumb={BREAD_CRUMB.CLIENT_ADMIN_MENU}><AdminClientMenu /></AppLayout>
  },
  {
    path: APP_ROUTES.MANAGE_CLIENT_TWINS,
    element: <AppLayout breadCrumb={BREAD_CRUMB.MANAGE_CLIENT_TWINS}><ManageClientTwins /></AppLayout>
  },
  {
    path: APP_ROUTES.VIEW_TWIN_DETAILS,
    element: <AppLayout breadCrumb={BREAD_CRUMB.VIEW_TWIN_DETAILS}><ViewTwinDetails /></AppLayout>
  },
  {
    path: APP_ROUTES.ADD_NEW_CLIENT,
    element: <AppLayout breadCrumb={BREAD_CRUMB.ADD_NEW_CLIENT}><AddNewClient /></AppLayout>
  },
  {
    path: APP_ROUTES.ADD_NEW_TWIN,
    element: <AppLayout breadCrumb={BREAD_CRUMB.ADD_NEW_TWIN}><AddNewTwin /></AppLayout>
  },
  {
    path: APP_ROUTES.EDIT_TWIN,
    element: <AppLayout breadCrumb={BREAD_CRUMB.ADD_NEW_TWIN}><EditTwin /></AppLayout>
  },
  {
    path: APP_ROUTES.ADMIN_LIST,
    element: <AppLayout breadCrumb={BREAD_CRUMB.ADMIN_LIST}><ULAdminList /></AppLayout>
  },
  {
    path: APP_ROUTES.ADD_NEW_ADMIN,
    element: <AppLayout breadCrumb={BREAD_CRUMB.ADD_NEW_ADMIN}><AddNewAdminUser /></AppLayout>
  },
  {
    path: APP_ROUTES.MANAGE_CLIENT_CONFIGURATIONS,
    element: <AppLayout breadCrumb={BREAD_CRUMB.ADD_NEW_ADMIN}><ManageNewClientConfiguration /></AppLayout>
  },
  {
    path: APP_ROUTES.UPLOAD_NEW_TWIN_VERSION,
    element: <AppLayout breadCrumb={BREAD_CRUMB.UPLOAD_NEW_TWIN_VERSION}><UploadNewTwinVersion /></AppLayout>
  },
  {
    path: APP_ROUTES.WEB_SOCKET_DETAILS,
    element: <AppLayout breadCrumb={BREAD_CRUMB.ADD_NEW_ADMIN}><WebSocketDetails /></AppLayout>
  },
  {
    path: APP_ROUTES.CHATBOT,
    element: <AppLayout breadCrumb={BREAD_CRUMB.ADD_NEW_ADMIN} showsidebar={false}><ChatBot /></AppLayout>
  }
]

const routes: any = [...publicRoutes, ...privateRoutes]

export { routes }
