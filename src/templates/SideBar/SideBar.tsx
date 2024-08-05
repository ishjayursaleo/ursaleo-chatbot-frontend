/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/space-before-function-paren  */
/* eslint-disable @typescript-eslint/indent */

import React, { useEffect, useRef, useState, useMemo } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, TextField, Typography, useMediaQuery, withStyles, IconButton } from '@mui/material'
import { styled, width } from '@mui/system'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Icon from '@mui/material/Icon'
import { type AppState, type ClientListRequestParams } from '../../interfaces'
import { ALERT_VARIANT, APP_CONFIGS } from '../../utils/constants'
import { useSelector, useDispatch } from 'react-redux'
import { alertActions } from '../../redux/actions'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Switch, Space } from 'antd'

import chatbotIcon from './robot.png' // Add your chatbot image path here

// assets | components
import ursaleoLogo from '../../assets/img/ursaleoLogo.png'

// services
import { clientService, axiosPrivateAPI } from '../../services'
import { twinService } from '../../services/twinService'

// interfaces
import { type DownloadFileParams, type TwinVersionHistoryParams } from '../../interfaces/twins'

// utils
import { triggerCustomGoogleAnalyticsEvent } from '../../utils/helpers/googleAnalytics'

// custom hooks
import useOutsideClick from '../../hooks/useOutSideClick'

// styles
import styles from '../AppLayout/AppLayout.module.scss'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import sideBarStyles from '../SideBar/SideBar.module.scss'

const ClientSelectAutocomplete = styled(Autocomplete)({
  backgroundColor: 'transparent',
  '& .MuiInputLabel-root': {
    color: 'white' // Set label (placeholder) color
  },
  '& .MuiInputBase-input': {
    color: 'white', // Set text color
    fontSize: '1rem',
    textAlign: 'left'
  },
  '& .MuiAutocomplete-popupIndicator': {
    color: 'white' // Set dropdown icon color
  }
})

function SideBar(props: any) {
  const { open, setOpen, userData, myEntitlementList } = props
  const navigate = useNavigate()

  /** sidebar reference */
  const sidebarRef = useRef(null)

  /** media queries */
  const matches = useMediaQuery('(max-width:900px)')
  const isMobile = useMediaQuery('(max-width:430px)')

  // This is the ClientArray for populate the dropdown
  const [clients, setClients] = useState([])
  // side bar client list API
  const [sideBarClientList, setSideBarClientList] = useState<any>()
  const [selectedTwinList, setSelectedTwinList] = useState<any>([])
  const [selectedClientLabel, setSelectedClientLabel] = useState('')
  const [hasSetRoles, setHasSetRoles] = useState<boolean>(false)
  const [userRoles, setUserRoles] = useState<string[]>([])
  // const [navClass, setNavClass] = useState('')
  const [selectedValue, setSelectedValue] = useState<string>()
  const { clientId, twinId, twinVersionId } = useParams()
  const userDetails = useSelector((state: AppState) => state.entitlement.myEntitlements?.data)
  const userId = userDetails !== null && userDetails.length > 0 ? userDetails[0]?.userId : null
  const dispatch = useDispatch()
  const [deepLinkUrl, setDeepLinkUrl] = useState('')
  const [isUIVisible, setIsUIVisible] = useState(false)
  const [isEnvLocal, setIsEnvLocal] = useState(false)
  const browserRefId = localStorage.getItem('browserRefId')
  const [loadingTwinId, setLoadingTwinId] = useState<string | undefined>(undefined)

  const mappedData = useMemo(() => clients.map((client: any) => ({
    label: client.name,
    value: client.id
  })), [clients])

  // Add a new state to track the initial value for the dropdown
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string | undefined>(undefined)

  useEffect(() => {
    setIsEnvLocal(false)
  }, [selectedDropdownValue])
  // Initialize the dropdown value on component mount
  useEffect(() => {
    if (mappedData.length > 0 && selectedDropdownValue === undefined) {
      const firstOption = mappedData[0]
      if (firstOption) {
        setSelectedDropdownValue(firstOption.value)
        handleSelectedValue(null, firstOption, true) // Call the function with the first value
        setIsUIVisible(true)
      }
    }
  }, [mappedData])

  // Filter the All Client List Details and create ClientArray
  useEffect(() => {
    if (sideBarClientList !== undefined) {
      setClients(sideBarClientList.data.filter((clientDetails: any) => clientDetails !== null))
    }
  }, [sideBarClientList])

  useEffect(() => {
    changeClientBasedOnSelectedValue(selectedValue)
  }, [selectedValue])

  useEffect(() => {
    if (hasSetRoles) {
      const userRolesString = localStorage.getItem('userRoles')

      if (userRolesString !== null) {
        setUserRoles(JSON.parse(userRolesString))
      } else {
        console.log('No userRoles found in localStorage')
      }
    }
  }, [hasSetRoles])

  useEffect(() => {
    if (myEntitlementList.status === 'success') {
      const userRoles: string[] = myEntitlementList.data.map((userDetails: any) => userDetails.role)
      const uniqueUserRoles: string[] = userRoles.filter((role, index, array) => array.indexOf(role) === index)

      const result = hasNullClientIdAndTwinId(myEntitlementList.data)
      if (result) {
        uniqueUserRoles.push('ULADMIN')
      }

      localStorage.setItem('userRoles', JSON.stringify(uniqueUserRoles))
      setHasSetRoles(true)
      getSideBarClients()
    }
  }, [myEntitlementList.status])

  const getSideBarClients = () => {
    void (async () => {
      const allClientListParams: ClientListRequestParams = {
        queryParam: {
          page: 1,
          pageSize: 1000,
          isUlAdminScreen: true
        }
      }
      const clientListResponse: any = await clientService.getClientList(allClientListParams)
      setSideBarClientList(clientListResponse.data)
    })()
  }

  const hasNullClientIdAndTwinId = (array: any) => {
    for (const obj of array) {
      if (obj.clientId === null && obj.twinId === null) {
        return true
      }
    }
    return false
  }

  const changeClientBasedOnSelectedValue = (selectedValue: any) => {
    void (async () => {
      if (selectedValue === '' || selectedValue === undefined) return
      try {
        const selectedTwinParams = {
          clientId: selectedValue,
          queryParams: {
            include: 'versions'
          }
        }
        const selectedTwinListResponse = await twinService.getAllTwinList(selectedTwinParams)
        setSelectedTwinList(selectedTwinListResponse?.data.data.filter(twin => twin?.versions.length > 0))
      } catch (error) {
        console.log('Error Fetch Twin List', error)
      }
    })()
  }

  const handleSelectedValue = (event: any, changeValue: any, isInitial?: boolean) => {
    setSelectedValue('')
    if (changeValue) {
      const { value, label } = changeValue
      setSelectedValue(value)
      setSelectedClientLabel(label)
      setSelectedDropdownValue(value)
    } else {
      setSelectedTwinList([])
      setSelectedClientLabel('')
      setSelectedDropdownValue(undefined)
    }
    if (!isInitial) {
      navigate('/')
    }
  }

  /*
  This where handle to set the clicked twin moduleFile path to download the twin
  */
  const handleTwinVersionHistoryList = async (ClintObj: { clientId: string, twinId: string, twinVersionId: string }) => {
    try {
      const { clientId, twinId, twinVersionId } = ClintObj
      setLoadingTwinId(twinId)
      // setSelectedTwinId(twinId)
      const versionHistoryListParams: TwinVersionHistoryParams = { clientId, twinId }
      // get list of Twins
      const twinListResponse = await twinService.getAllTwinVersionHistory(versionHistoryListParams)
      const twinVersionListData = twinListResponse.data.data

      triggerCustomGoogleAnalyticsEvent('btn', `select_twin_${twinId}`, twinId.toString(), userData)

      const path = twinVersionListData[0]?.modelFilePath
      if (path !== null) {
        const params: DownloadFileParams = {
          pathParams: {
            clientId: selectedValue
          },
          queryParams: {
            path
          }
        }
        // request the  to get the twin file
        const twinDownloadResponse = await twinService.downloadTwin(params)
        const apiResponse = `data:image/png;base64,${twinDownloadResponse.data}`
      }
      showDeepLink(clientId, twinId, twinVersionId)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingTwinId(undefined)
    }
  }

  const showDeepLink = (clientId: string, twinId: string, twinVersionId: string) => {
    void (async () => {
      if (browserRefId == null) return
      try {
        let url
        if (isEnvLocal) {
          const payload = {
            userId,
            clientId: selectedValue ?? clientId,
            twinId,
            twinVersionId,
            browserRefId,
            source: 'LOCAL'
          }
          const URL = `${APP_CONFIGS.API_BASE}/api/token/fetch-nuclear-server-url`
          const response = await axiosPrivateAPI.post(URL, payload)
          url = response.data
        } else {
          const deepLinkRes = await createDeepLink(clientId, twinId, twinVersionId, browserRefId)
          setDeepLinkUrl(deepLinkRes?.deepLink)
          url = deepLinkRes?.deepLink
          triggerCustomGoogleAnalyticsEvent('btn', 'launch_deepLink', url, userData)
        }
        if (twinId === "5e5dd81d-dbcb-4b66-93a3-489ec1a83690" && clientId === "5b691e07-d270-4816-88aa-f9a240b7f324") {
          url = "http://13.202.129.194:8011/streaming/webrtc-demo/?server=13.202.129.194"
        }
          window.open(url, '_blank')
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const createDeepLink = async (clientId: string, twinId: string, twinVersionId: string, browserRefId: string) => {
    const payload = {
      userId,
      clientId: selectedValue ?? clientId,
      twinId,
      twinVersionId,
      browserRefId
    }
    try {
      const URL = `${APP_CONFIGS.API_BASE}/api/token/create-deep-link`
      const response: any = await axiosPrivateAPI.post(URL, payload)
      // Assuming the response contains a URL
      return response.data
    } catch (error) {
      dispatch(alertActions.triggerAlert({ message: 'Nonce token has already been created.', options: { autoHideDuration: 3000, variant: ALERT_VARIANT.WARNING } }))
      console.error('Error:', error)
    }
  }

  const handleEnvChange = (event: any) => {
    setIsEnvLocal(event)
  }

  const handleChatbotClick = () => {
    if (selectedValue) {
      navigate(`/chatbot/${selectedValue}`)
    }
  }

  return (
    <React.Fragment>
      <aside ref={sidebarRef} className={'layout-row sideNavigation'}>
        <aside className={'navBar'}>
          <aside className={'bodyWrapper'}>
          <aside className={'logo-section'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {!open && (
              <div className="contentGroup">
                <img className='img-logo' width='auto' height='35px' src={ursaleoLogo} alt="ursaleo-logo" />
              </div>
            )}
            <div style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', marginRight: '10px', textAlign: 'center' }}>
              <IconButton onClick={handleChatbotClick}>
                <img src={chatbotIcon} alt="Chatbot" width="70" height="60" />
              </IconButton>
              <h6 style={{ color: '#D7E9FF', fontSize: '1rem', margin: '0 10px 0 0' }}>CHAT AI</h6>
            </div>
          </aside>
            <div className={'content-wrapper'}>
              <div className={'navBarContent layout-row name-field'}>
                <Typography textAlign='center' color='#F7F7F7' fontSize={'28px'}>
                  Select a twin
                </Typography>
              </div>
              <div className={`${styles.searchDropdown} dropdown-list`}>
                <ClientSelectAutocomplete
                  disablePortal
                  id="combo-box-demo"
                  popupIcon={<ExpandMoreIcon />}
                  options={mappedData}
                  value={selectedDropdownValue !== undefined
                    ? mappedData.find(option => option.value === selectedDropdownValue)
                    : null}
                  sx={{
                    width: '370px',
                    height: '47px',
                    minWidth: '370px',
                    '&.MuiAutocomplete-root': {
                      borderRadius: '0.5rem' // Set your desired border-radius here
                    },
                    '& .MuiInputBase-input': {
                      padding: '7px 7px 6px 0 !important',
                      textAlign: 'start',
                      fontSize: '18px',
                      color: '#F7F7F7',
                      fontfamily: 'Noto Sans, Regular'
                    },
                    '& .MuiAutocomplete-clearIndicator': {
                      display: 'none'
                    },
                    '& .MuiSvgIcon-root': {
                      height: '1.5em',
                      width: '1.5em'
                    }
                  }}
                  onChange={(event: any, changeValue: any) => {
                    handleSelectedValue(event, changeValue)
                  }
                  }
                  PaperComponent={({ children }: any) => (
                    <ul
                      className={styles.dropdownOption}
                    >
                      {children}
                    </ul>
                  )}
                  renderOption={(props: any, option: any) => (
                    <li {...props} className={styles.dropOptionWrapper}>
                      {option.label}
                    </li>
                  )}

                  renderInput={(params: any) =>
                    <TextField {...params}
                      InputProps={{ ...params.InputProps, disableUnderline: true }}
                      placeholder="Select a Client"
                      variant='standard'
                      color='secondary'
                      sx={{
                        padding: '1rem 0rem',
                        border: '1px solid #fff',
                        borderRadius: '8px',
                        '& fieldset': {
                          border: 'none'
                        },
                        '& input::placeholder': {
                          paddingLeft: '1rem'
                        },
                        '& input': {
                          marginLeft: '0.8em'
                        }
                      }}
                    />
                  }
                />
              </div>
              <div className='twin-list'>
                {(APP_CONFIGS.APP_ENV !== 'dev' && selectedTwinList.length > 0) &&
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{
                      width: '370px',
                      display: 'flex',
                      justifyContent: 'end',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <Typography fontSize={'0.75rem'} color={'#bbbbbb'}>
                        LOCAL
                      </Typography>
                      {/* <Switch className={sideBarStyles.test}
                        checked={isEnvLocal}
                        onChange={handleEnvChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        size='medium'
                      /> */}
                      <Switch checked={isEnvLocal}
                        style={{ borderColor: 'white' }}
                        className={isEnvLocal ? sideBarStyles.antSwitch : sideBarStyles.antSwitchChecked }
                        onChange={handleEnvChange}
                        checkedChildren="On"
                        unCheckedChildren="Off"
                        defaultChecked />
                    </div>
                  </div>}
                {
                  selectedTwinList.map((twin: any) => (
                    <aside key={twin.id} className={'links'}>
                      <NavLink
                        onClick={() => {
                          handleTwinVersionHistoryList({ clientId: twin.clientId, twinId: twin.id, twinVersionId: twin.defaultVersionId })
                        }}
                        className={({ isActive }) =>
                          isActive ? 'layout-row is-active navLink twinList-wrapper' : 'layout-row navLink'
                        }
                        state={{
                          selectedClient: selectedClientLabel,
                          selectedTwin: twin.name
                        }}
                        to={`/client/${twin.clientId}/twin/${twin.id}/${twin.defaultVersionId}`}
                      >
                        {twin.icon ? (
                          <div className={'appLinkIcon'}>
                            {twin.icon}
                          </div>
                        ) : null}
                        <div className={'navBarContent layout-row'}>
                          <span className='twinName'>{twin.name}</span>
                          <span className={`launch${selectedTwinList.length === 0 ? ' disabled' : ''}`}>
                            {
                              loadingTwinId === twin.id
                                ? <CircularProgress style={{ color: '#fff' }} />
                                : <RocketLaunchIcon />
                            }
                          </span>
                        </div>
                      </NavLink>
                    </aside>
                  ))
                }
              </div>
            </div>
          </aside>
        </aside>
      </aside>
    </React.Fragment>
  )
}

export default SideBar
