import { type ApplicationBreadCrumbs } from '../../interfaces'
import { BREAD_CRUB_TEXTS } from './enums'
import { APP_ROUTES } from './routes'

export const APP_TABLE_CONFIGS = {
  DEFAULT_ROWS_PER_PAGE: 5,
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_COUNT: 1
}

export const PERMISSION_TYPES = {
  FULL_PERMISSION: 'EVERY',
  PARTIAL_PERMISSION: 'SOME'
}

export const BREAD_CRUMB: ApplicationBreadCrumbs = {
  MANAGETWINS: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGETWINS,
      path: '#',
      isActive: true
    }
  ],
  PROFILE: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.PROFILE,
      path: APP_ROUTES.PROFILE,
      isActive: true
    }
  ],
  NOTIFICATIONS: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: 'Notifications',
      path: APP_ROUTES.NOTIFICATIONS,
      isActive: true
    }
  ],
  DASHBOARD: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.DASHBAORD,
      path: APP_ROUTES.ROOT,
      isActive: true
    }
  ],
  URSALEO: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.DASHBAORD,
      path: APP_ROUTES.ROOT,
      isActive: true
    },
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.URSALEO,
      path: APP_ROUTES.URSALEO_CLIENTS,
      isActive: true
    }
  ],
  UNAUTHORIZED: [],
  NOTFOUND: [],
  UL_ADMIN: [],
  MANAGE_UL_ADMIN_ENTITLEMENT: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGE_UL_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 3,
      title: BREAD_CRUB_TEXTS.USER_ENTITLEMENT,
      path: APP_ROUTES.MANAGE_UL_ADMIN_ENTITLEMENT,
      isActive: true
    }
  ],
  EDIT_UL_ADMIN_ENTITLEMENT: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGE_UL_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 3,
      title: BREAD_CRUB_TEXTS.USER_ENTITLEMENT,
      path: APP_ROUTES.MANAGE_UL_ADMIN_ENTITLEMENT,
      isActive: false
    },
    {
      id: 4,
      title: BREAD_CRUB_TEXTS.EDIT_USER_ENTITLEMENT,
      path: APP_ROUTES.EDIT_UL_ADMIN_ENTITLEMENT,
      isActive: true
    }
  ],
  ADD_USERS_TO_CLIENT: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGE_UL_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 3,
      title: BREAD_CRUB_TEXTS.USER_ENTITLEMENT,
      path: APP_ROUTES.MANAGE_UL_ADMIN_ENTITLEMENT,
      isActive: false
    },
    {
      id: 4,
      title: BREAD_CRUB_TEXTS.ADD_USERS_TO_CLIENT,
      path: APP_ROUTES.ADD_USERS_TO_CLIENT,
      isActive: true
    }
  ],
  CLIENT_ADMIN_MENU: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGE_UL_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 3,
      title: BREAD_CRUB_TEXTS.CLIENT_ADMIN_MENU,
      path: APP_ROUTES.CLIENT_ADMIN_MENU,
      isActive: true
    }
  ],
  MANAGE_CLIENT_TWINS: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGE_UL_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 3,
      title: BREAD_CRUB_TEXTS.CLIENT_ADMIN_MENU,
      path: APP_ROUTES.CLIENT_ADMIN_MENU,
      isActive: false
    },
    {
      id: 4,
      title: BREAD_CRUB_TEXTS.MANAGE_CLIENT_TWINS,
      path: APP_ROUTES.MANAGE_CLIENT_TWINS,
      isActive: true
    }
  ],
  VIEW_TWIN_DETAILS: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGE_UL_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 3,
      title: BREAD_CRUB_TEXTS.CLIENT_ADMIN_MENU,
      path: APP_ROUTES.CLIENT_ADMIN_MENU,
      isActive: false
    },
    {
      id: 4,
      title: BREAD_CRUB_TEXTS.MANAGE_CLIENT_TWINS,
      path: APP_ROUTES.MANAGE_CLIENT_TWINS,
      isActive: false
    },
    {
      id: 5,
      title: BREAD_CRUB_TEXTS.VIEW_TWIN_DETAILS,
      path: APP_ROUTES.VIEW_TWIN_DETAILS,
      isActive: true
    }
  ],
  ADD_NEW_CLIENT: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGE_UL_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 3,
      title: BREAD_CRUB_TEXTS.ADD_NEW_CLIENT,
      path: APP_ROUTES.ADD_NEW_CLIENT,
      isActive: true
    }
  ],
  ADD_NEW_TWIN: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGE_UL_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 3,
      title: BREAD_CRUB_TEXTS.CLIENT_ADMIN_MENU,
      path: APP_ROUTES.CLIENT_ADMIN_MENU,
      isActive: false
    },
    {
      id: 4,
      title: BREAD_CRUB_TEXTS.MANAGE_CLIENT_TWINS,
      path: APP_ROUTES.MANAGE_CLIENT_TWINS,
      isActive: false
    },
    {
      id: 5,
      title: BREAD_CRUB_TEXTS.ADD_NEW_TWIN,
      path: APP_ROUTES.ADD_NEW_TWIN,
      isActive: true
    }
  ],
  ADMIN_LIST: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.ADMIN_LIST,
      path: APP_ROUTES.UL_ADMIN,
      isActive: true
    }
  ],
  ADD_NEW_ADMIN: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.ADMIN_LIST,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.ADD_NEW_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: true
    }
  ],
  UPLOAD_NEW_TWIN_VERSION: [
    {
      id: 1,
      title: BREAD_CRUB_TEXTS.HOME,
      path: APP_ROUTES.ROOT,
      isActive: false
    },
    {
      id: 2,
      title: BREAD_CRUB_TEXTS.MANAGE_UL_ADMIN,
      path: APP_ROUTES.UL_ADMIN,
      isActive: false
    },
    {
      id: 3,
      title: BREAD_CRUB_TEXTS.CLIENT_ADMIN_MENU,
      path: APP_ROUTES.CLIENT_ADMIN_MENU,
      isActive: false
    },
    {
      id: 4,
      title: BREAD_CRUB_TEXTS.MANAGE_CLIENT_TWINS,
      path: APP_ROUTES.MANAGE_CLIENT_TWINS,
      isActive: false
    },
    {
      id: 5,
      title: BREAD_CRUB_TEXTS.VIEW_TWIN_DETAILS,
      path: APP_ROUTES.VIEW_TWIN_DETAILS,
      isActive: false
    },
    {
      id: 6,
      title: BREAD_CRUB_TEXTS.UPLOAD_NEW_TWIN_VERSION,
      path: APP_ROUTES.UPLOAD_NEW_TWIN_VERSION,
      isActive: true
    }
  ],
  CHATBOT: []
}
