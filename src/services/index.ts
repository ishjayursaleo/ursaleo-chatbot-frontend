/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios'
import { APP_CONFIGS } from '../utils/constants'
import { exceptionHandler } from '../utils/helpers'
import { config } from 'process'
axios.defaults.baseURL = APP_CONFIGS.API_BASE

export const axiosPublicAPI = axios.create()
export const axiosPrivateAPI = axios.create()

export const getAccessToken = () => {
  return localStorage.getItem('access_token')
}

// Function to retrieve refresh token from local storage
const getRefreshToken = () => {
  return localStorage.getItem('refresh_token')
}
axiosPrivateAPI.interceptors.request.use(
  async config => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  async error => {
    return await Promise.reject(error)
  }
)

// Response interceptor for API calls
axiosPrivateAPI.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // Refresh token logic
    if ((error.response && error.response.status === 401 && !originalRequest._retry)) {
      originalRequest._retry = true
      const accessToken = getAccessToken()
      if (accessToken) {
        try {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return await axiosPrivateAPI(originalRequest)
        } catch (refreshError) {
          // Handle token refresh failure or expiration
          console.error('Token refresh failed:', refreshError)
          // Redirect to login or handle as needed
        }
      }
    }

    return await Promise.reject(error)
  }
)

export * from './clientService'
export * from './entitlementService'
