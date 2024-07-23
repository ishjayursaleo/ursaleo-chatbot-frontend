import React, { useState } from 'react'
import { styled, type Theme } from '@mui/material/styles'
import Tab, { tabClasses } from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Grid, Modal } from '@mui/material'
import { type IntegrationSource } from '../../interfaces/integrationSource'
import styles from './TwinConfigTabsModal.module.scss'
import ManageTwinConfiguration from '../ManageTwinConfiguration/ManageTwinConfiguration'
import { useSelector } from 'react-redux'
import { type AppState } from '../../interfaces'
import { type TwinConfigurationGetResponse } from '../../interfaces/twinConfiguration'
import ManageTwinConfigurationEdit from '../ManageTwinConfiguration/ManageTwinConfigurationEdit'

export default function TwinConfigTabsModal (
  { open, closeModal, isLoading, integrationSources, isEditMode }:
  { open: boolean, isLoading: boolean, integrationSources: IntegrationSource[], closeModal: () => void, isEditMode: boolean }
) {
  const [value, setValue] = useState(0)
  const twinConfigs = useSelector((state: AppState) => state.twinConfigurations.twinConfigList)
    .configs as TwinConfigurationGetResponse[]

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalBox}>
        <Typography className={styles.modalTitle} id="modal-modal-title">
          {`${isEditMode ? 'Edit ' : ''}Configuration`}
        </Typography>
        <Box sx={{ width: '100%', marginTop: '2rem' }}>
          {!isLoading && <Grid container sm={12} sx={{ display: 'flex', alignItems: 'start' }}>
            <Grid item sm={1}></Grid>
            <Grid item sm={10}>
              <Box>
                <Tabs
                  style={{ backgroundColor: '#2E2D2C' }}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  {twinConfigs.map((config, index) => {
                    const label = config?.integrationSourceId != null
                      ? integrationSources.find(source => source.id === config.integrationSourceId)?.source
                      : '+ Add New'
                    return <TabItem
                      key={config?.id ?? index}
                      label={label}
                      {...a11yProps(index)}
                    />
                  })}
                </Tabs>
              </Box>
              {twinConfigs.map((config, index) => {
                return <CustomTabPanel key={config?.id ?? index} value={value} index={index}>
                  {!isEditMode
                    ? <ManageTwinConfiguration
                      closeModal={closeModal}
                      integrationSources={integrationSources}
                      config={config}
                      isLoading={isLoading}
                    />
                    : <ManageTwinConfigurationEdit
                      closeModal={closeModal}
                      integrationSources={integrationSources}
                      config={config}
                      isLoading={isLoading}
                    />
                  }
                </CustomTabPanel>
              })}
            </Grid>
            <Grid item sm={1}></Grid>
          </Grid>}
        </Box>
      </div>
    </Modal>
  )
}

const TabItem = styled(Tab)({
  color: '#6e6e6e',
  backgroundColor: '#454545',
  fontSize: '1.125rem'
},
({ theme }: { theme: Theme }) => ({
  opacity: 1,
  overflow: 'initial',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginInlineEnd: theme.spacing(1),
  borderTopLeftRadius: theme.spacing(1),
  borderTopRightRadius: theme.spacing(1),
  transition: '0.2s',
  zIndex: 2,
  textTransform: 'initial',
  '&:before': {
    transition: '0.2s'
  },
  [`& + .${tabClasses.selected}::before`]: {
    opacity: 0
  },
  '&:hover': {
    [`&:not(.${tabClasses.selected})`]: {
      backgroundColor: 'rgba(0 0 0 / 0.2)'
    },
    '&::before': {
      opacity: 0
    },
    [`& + .${tabClasses.root}::before`]: {
      opacity: 0
    }
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: '#000',
    color: theme.palette.common.white
  },
  [`&.${tabClasses.selected} + .${tabClasses.root}`]: {
    zIndex: 1
  },
  [`&.${tabClasses.selected} + .${tabClasses.root}::before`]: {
    opacity: 0
  }
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps (index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
