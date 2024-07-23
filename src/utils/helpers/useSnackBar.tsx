import React from 'react'
import { Button } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { type AlertMessage, type AppState } from '../../interfaces'
import { ALERT_ORIGIN_HORIZONTAL_TYPE, ALERT_ORIGIN_VERTICAL_TYPE } from '../constants'
import { alertActions } from '../../redux/actions'

let displayed: number[] = []

const useSnackBar = () => {
  const dispatch = useDispatch<any>()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const alerts = useSelector((state: AppState) => state.alerts.alertList)

  const storeDisplayed = (key: number | undefined) => {
    if (key != null) {
      displayed = [...displayed, key]
    }
  }

  const removeDisplayed = (id: number | string) => {
    displayed = [...displayed.filter(key => id !== key)]
  }

  React.useEffect(() => {
    alerts.forEach((alert: AlertMessage) => {
      // do nothing if snackbar is already displayed
      if (alert.options?.key !== undefined && displayed.includes(alert.options?.key)) return

      // display snackbar using notistack
      enqueueSnackbar(alert.message, {
        key: new Date().getTime() + Math.random(),
        variant: alert.options?.variant,
        anchorOrigin: {
          horizontal: alert.options?.anchorOrigin?.horizontal ?? ALERT_ORIGIN_HORIZONTAL_TYPE.RIGHT,
          vertical: alert.options?.anchorOrigin?.vertical ?? ALERT_ORIGIN_VERTICAL_TYPE.TOP
        },
        persist: alert.options?.persist ?? false,
        preventDuplicate: true,
        autoHideDuration: alert.options?.autoHideDuration ?? 4000,
        action: key => (
          <Button color='inherit' size='small' onClick={() => { closeSnackbar(key) }}>Dismiss</Button>
        ),
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(alertActions.removeAlert(alert))
          removeDisplayed(myKey)
        }
      })

      // keep track of snackbars that we've displayed
      storeDisplayed(alert.options?.key)
    })
  }, [alerts])
}

export default useSnackBar
