/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type AppState } from '../../interfaces'
import { profileActions } from '../../redux/actions'

import { ModalLayout } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import TwinVersionHistory from '../../components/TwinVersionHistory/TwinVersionHistory'
import { type TwinVersionDeletePathParams, type TwinVersionHistoryParams } from '../../interfaces/twins'
import { twinService } from '../../services/twinService'
import { Skeleton } from '@mui/material'
import { APP_TABLE_CONFIGS } from '../../utils/constants'
import _debounce from 'lodash/debounce'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'

const ViewTwinDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const [twinVersionList, setTwinVersionList] = useState<any>([])
  const [loading, setLoading] = useState(true)
  /*
  Pagination Related Data
  */
  const [page, setPage] = useState<number>(APP_TABLE_CONFIGS.DEFAULT_PAGE)
  const [twinVersionDeleteStatus, setTwinVersionDeleteStatus] = useState<boolean>(false)
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const handleClose = () => {
    // dispatch(profileActions.openModal())
    navigate('/')
  }
  const { clientId, clientName, twinId, twinName, twinVersionDefaultId } = useParams()

  const [selectedValue, setSelectedValue] = React.useState(twinVersionDefaultId)
  const [updateTwinVersion, setUpdateTwinVersion] = useState<any>({})
  const [triggerToUpdate, setTriggerToUpdate] = useState<boolean>(false)

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'View Twin Details', userData)
  }, [])

  /*
  Set Debounce event for handle the unwanted API calls when click radio button time to time
  without using handleChange() directly
  */

  /*
 Need to find the selected value not set correctly
 API call working just check and do it it easy
 */
  const debouncedHandleChange = _debounce(async (value) => {
    setSelectedValue(value)
    setTriggerToUpdate(true)
  }, 1000) // Set the debounce delay, e.g., 1000 milliseconds (1 second)

  const handleChange = (event: any) => {
    triggerCustomGoogleAnalyticsEvent('btn', 'change_twin_version', 'change_twin_version', userData)
    // Use the debounced function
    void (async () => {
      await debouncedHandleChange(event.target.value)
    })()
  }

  const handleTwinVersionHistoryList = async (pageValue?: number) => {
    if (clientId !== undefined && twinId !== undefined) {
      const versionHistoryListParams: TwinVersionHistoryParams = {
        clientId,
        twinId,
        queryParams: {
          page: pageValue,
          pageSize: 1000
        }
      }
      const twinListResponse: any = await twinService.getAllTwinVersionHistory(versionHistoryListParams)
      setTwinVersionList(twinListResponse.data)
      setLoading(false)
    }
  }
  useEffect(() => {
    void handleTwinVersionHistoryList()
  }, [])
  useEffect(() => {
    void handleTwinVersionHistoryList()
  }, [updateTwinVersion])

  const handelUpdateTwinVersion = () => {
    void (async () => {
      if (selectedValue !== undefined && clientId !== undefined && twinId !== undefined) {
        const updateVersionPayload = { bodyParams: { defaultVersionId: selectedValue }, pathParams: { clientId, twinId } }
        const updateVersionRes = await twinService.updateTwinVersion(updateVersionPayload)
        setUpdateTwinVersion(updateVersionRes)
      }
    })()
  }
  useEffect(() => {
    if (triggerToUpdate) {
      handelUpdateTwinVersion()
    }
  }, [selectedValue, triggerToUpdate])

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    void handleTwinVersionHistoryList(value)
    setPage(value)
  }
  const handleTwinVersionDelete = (twinVersionId: string) => {
    triggerCustomGoogleAnalyticsEvent('btn', 'dlt_twin_version', 'dlt_twin_version', userData)
    void (async () => {
      if (clientId !== undefined && twinId !== undefined) {
        const twinVersionDeletePathParams: TwinVersionDeletePathParams = {
          pathParams: {
            clientId,
            twinId,
            id: twinVersionId
          }
        }
        const deleteRes = await twinService.deleteTwinVersion(twinVersionDeletePathParams)
        if (deleteRes.data) {
          setTwinVersionDeleteStatus(true)
        }
      }
    })()
  }

  useEffect(() => {
    void handleTwinVersionHistoryList()
  }, [twinVersionDeleteStatus])

  const handleBtnClick = () => {
    if (clientId !== undefined && twinId !== undefined && twinName !== undefined && clientName !== undefined) {
      navigate(`/manage-ul-admin/client-admin/${clientId}/${clientName}/manage-client-twins/${twinId}/${twinName}/details/upload-new-version`)
    }
  }
  return (
    <ModalLayout
      handleClose={handleClose}
      open={modalOpenStatus}
      activateBackArrow={true}
      headerText={twinName}
      isHeaderTextDisabled={false}
      routePath={clientName}
      contentLayout={
        <TwinVersionHistory
          deleteTwinVersion={handleTwinVersionDelete}
          page={page}
          handleChangePage={handleChangePage}
          isVersionList={loading}
          handleChange={handleChange}
          selectedValue={selectedValue}
          twinVersionList={twinVersionList}
          handleBtnClick={handleBtnClick}
        />
      }
    />
  )
}

export default ViewTwinDetails
