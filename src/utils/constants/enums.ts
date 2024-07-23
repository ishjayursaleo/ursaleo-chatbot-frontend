export enum APP_ACTION_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
  INITIAL = 'Initial'
}
export enum ALERT_VARIANT {
  SUCCESS = 'success',
  DEFAULT = 'default',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export enum ALERT_ORIGIN_VERTICAL_TYPE {
  BOTTOM = 'bottom',
  TOP = 'top'
}

export enum ALERT_ORIGIN_HORIZONTAL_TYPE {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center'
}

export enum APP_FEATURES {
  VIEW_DASHBOARD = 'viewDashboard',
  CREATE_GOAL = 'createGoal',
  VIEW_GOAL = 'viewGoal',
  EDIT_GOAL = 'editGoal',
  VIEW_ENGAGEMENT = 'viewEngagement',
  CREATE_ENGAGEMENT = 'createEngagement',
  EDIT_ENGAGEMENT = 'editEngagement',
  VIEW_SESSION = 'viewSession',
  VIEW_FEEDBACK = 'viewFeedback',
  VIEW_ASSESSMENT = 'ViewAssessment',
  VIEW_ASSESSMENT_RESULT = 'ViewAssessmentResults',
}

export enum BREAD_CRUB_TEXTS {
  HOME = 'Home',
  PROFILE = 'Profile',
  DASHBAORD = 'Dashboard',
  UNAUTHORIZED = 'Unauthorized',
  NOT_FOUND = 'Not Found',
  URSALEO = 'Ursaleo',
  MANAGETWINS = 'Twins',
  MANAGE_UL_ADMIN = 'ULAdmin',
  USER_ENTITLEMENT = 'User User',
  EDIT_USER_ENTITLEMENT = 'Edit Users',
  ADD_USERS_TO_CLIENT = 'Add Users',
  CLIENT_ADMIN_MENU = 'Client Menu',
  MANAGE_CLIENT_TWINS = ' Client Twins',
  VIEW_TWIN_DETAILS = 'Twin Details',
  ADD_NEW_CLIENT = 'Add New Client',
  ADD_NEW_TWIN = 'Add New Twin',
  ADMIN_LIST = 'Admin List',
  ADD_NEW_ADMIN = 'New Admin',
  UPLOAD_NEW_TWIN_VERSION = 'Upload New Twin Version',
  CHATBOT = 'Chatbot'
}

export enum URSALEO_USER_ROLES {
  ULADMIN = 'ULADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  READER = 'READER',
}

export enum WS_EVENT_TYPE {
  UPLOAD = 'UPLOAD',
  DELETE = 'DELETE',
  DOWNLOAD = 'DOWNLOAD',
  VIEW = 'VIEW'
}

export enum CONFIGURATION_STORAGE_TYPES {
  PROCORE = 'PROCORE',
  INTERNAL = 'INTERNAL'
}
