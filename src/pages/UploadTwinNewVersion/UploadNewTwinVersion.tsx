/* eslint-disable @typescript-eslint/no-unused-vars */

import UploadNewTwinVersion from '../../components/UploadNewTwinVersion/UploadNewTwinVersion'
import { ModalLayout } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
// import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type AppState } from '../../interfaces'
import React, { useEffect, useState } from 'react'
import { type AxiosResponse } from 'axios'
import { alertActions } from '../../redux/actions'
import { ALERT_VARIANT, APP_CONFIGS } from '../../utils/constants'
import { useMutation } from '@tanstack/react-query'
import { twinService } from '../../services/twinService'
import { type CreateTwinVersionRequest, type CreateTwinVersionResponse } from '../../interfaces/twins'
import * as yup from 'yup'

// import { useMutation } from '@tareact-query'
const bodyParams = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  accessUrl: yup.string().required('Access URL is required')
})

const pathParams = yup.object().shape({
  clientId: yup.string().required('Client ID is required'),
  twinId: yup.string().required('Twin ID is required')
})

const payloadSchema = yup.object().shape({
  pathParams,
  bodyParams
})
const UploadNewVersion = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const handleClose = () => {
    navigate('/')
  }
  const { clientId, clientName, twinId, twinName } = useParams()

  const [accessUrl, setAccessUrl] = useState<string>('dev/')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [modelFile, setModelFile] = useState<File | null>(null)

  const { mutate: CreateTwinVersion, isPending: isCreatePending } = useMutation({
    mutationKey: ['CreateTwinVersion', clientId, twinId],
    mutationFn: async (payload: CreateTwinVersionRequest) => {
      return await twinService.createTwinVersion(payload)
    },
    onSuccess: (data: AxiosResponse<CreateTwinVersionResponse>) => {
      dispatch(alertActions.triggerAlert({
        message: 'Twin Version Created Successfully',
        options: {
          autoHideDuration: 2000,
          variant: ALERT_VARIANT.SUCCESS
        }
      }))
      navigate(-1)
    },
    onError: () => {
      dispatch(alertActions.triggerAlert({
        message: ' Unable To Create Twin Version',
        options: {
          autoHideDuration: 2000,
          variant: ALERT_VARIANT.ERROR
        }
      }))
    }
  })
  useEffect(() => {
    getEnvironmentType()
  }, [])

  const getEnvironmentType = () => {
    const value = APP_CONFIGS.APP_ENV + '/'
    setAccessUrl(value)
  }
  const handleNameValueChange = (event: any) => {
    setName(event.target.value)
  }
  const handleDescriptionValueChange = (event: any) => {
    setDescription(event.target.value)
  }
  const handleModelFileValueChange = (event: any) => {
    setModelFile(event.target.files[0])
  }

  const handleUploadBtnClick = () => {
    if (clientId !== undefined && twinId !== undefined) {
      const payload: CreateTwinVersionRequest = {
        pathParams: {
          clientId,
          twinId
        },
        bodyParams: {
          name,
          description,
          accessUrl,
          ...(modelFile !== null ? { modelFile } : {})
        },
        isMultipart: modelFile !== null
      }

      payloadSchema.validate(payload)
        .then((res) => {
          CreateTwinVersion(payload)
        })
        .catch((err) => {
          dispatch(alertActions.triggerAlert({
            message: err.message,
            options: {
              autoHideDuration: 2000,
              variant: ALERT_VARIANT.ERROR
            }
          }))
        })
    }
  }
  return (
    <ModalLayout
      handleClose={handleClose}
      open={modalOpenStatus}
      activateBackArrow={true}
      headerText={'Upload New Version'}
      isHeaderTextDisabled={false}
      routePath={'Versions'}
      contentLayout={
        <UploadNewTwinVersion
        handleNameValueChange={handleNameValueChange}
        handleDescriptionValueChange={handleDescriptionValueChange}
        handleModelFileValueChange={handleModelFileValueChange}
        handleUploadBtnClick={handleUploadBtnClick}
        />
      }
    />
  )
}

export default UploadNewVersion
