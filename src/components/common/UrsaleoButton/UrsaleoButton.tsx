import { Button, Typography } from '@mui/material'
import React from 'react'

const UrsaleoButton: React.FC<
{
  buttonTitle: string
  disabled?: boolean
  width: string
  height?: string
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  variant?: 'text' | 'outlined' | 'contained'
  textFontSize?: string
  buttonAction?: () => void
  borderRadius?: string
}> =
({
  buttonTitle,
  disabled,
  width,
  height,
  variant,
  color,
  textFontSize,
  buttonAction,
  borderRadius

}) => {
  return (
        <Button
            onClick={buttonAction}
            disabled={disabled}
            sx={{
              height: { height },
              width: { width },
              textTransform: 'none',
              borderRadius: { borderRadius },
              '&:disabled': {
                borderColor: 'gray'
              }
            }}
            variant={variant}
            color={color}>
            <Typography
                fontSize={textFontSize}
                color={disabled === true ? 'gray' : '#fff'}>
                {buttonTitle}</Typography>
        </Button>
  )
}

export default UrsaleoButton
