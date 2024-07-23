import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const FormTextField: React.FC<{
  label: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  value?: string
  disabled?: boolean
  startAdornment?: string
  isRequired?: boolean
}> = ({ label, onChange, placeholder, value, disabled, startAdornment, isRequired = false }) => {
  if (placeholder == null) {
    placeholder = `Type ${label.toLowerCase()} here`
  }

  return (
    <Grid
      sm={12}
      container
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Grid
        item
        sm={3}
        flexDirection={'column'}
        display='flex'
        justifyContent='start'
        alignItems='end'
        style={{ paddingRight: '2rem' }}
      >
        <Typography display='inline' color='white' fontSize='1.125rem' fontWeight={400}>
          {label}
          {isRequired &&
            <Typography
              display='inline'
              fontStyle={'italic'}
              color='gray'
              fontSize='1rem'
              fontWeight={400}>{' *'}</Typography>
          }
        </Typography>
      </Grid>
      <Grid item sm={9} style={{ paddingRight: '2.5rem' }}>
        <TextField
          fullWidth
          value={value}
          autoComplete='off'
          onChange={onChange}
          id="outlined-basic"
          placeholder={placeholder}
          variant="standard"
          color='secondary'
          InputProps={{
            startAdornment,
            disableUnderline: true,
            readOnly: disabled,
            style: {
              color: '#fff',
              alignItems: 'center',
              fontSize: '1.125rem',
              backgroundColor: '#303030',
              padding: '0 3rem 0 1rem',
              justifyContent: 'center',
              borderRadius: '0.438rem',
              height: '3.4375rem'
            }
          }}
        />
      </Grid>
    </Grid>
  )
}

export default FormTextField
