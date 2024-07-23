import React, { useState, useEffect } from 'react'
import { styled, type Theme } from '@mui/material/styles'
import Tab, { tabClasses } from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
// import ManageClientConfiguration from '../ManageClientConfiguration/ManageClientConfiguration'
import { Grid } from '@mui/material'
import { clientConfigurationService } from '../../services/clientConfigurationService'
import { useParams } from 'react-router-dom'
import {
  type ClientConfigurationGetResponse,
  type ClientConfigurationListParams
} from '../../interfaces/clientConfiguration'
import ManageClientConfiguration from '../ManageClientConfiguration/ManageClientConfiguration'
import { integrationSourceService } from '../../services/integrationSourceService'
import { type IntegrationSource } from '../../interfaces/integrationSource'

export default function ClientConfigTabsModal () {
  const [configs, setConfigs] = useState<Array<ClientConfigurationGetResponse | null>>([])
  const [value, setValue] = useState(0)
  const { clientId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [integrationSources, setIntegrationSources] = useState<IntegrationSource[]>([])

  useEffect(() => {
    void (async () => {
      if (clientId == null) return
      const params: ClientConfigurationListParams = {
        pathParams: {
          clientId
        },
        queryParams: {
          include: 'integrationSource'
        }
      }
      try {
        setIsLoading(true)
        const configsResponse = await clientConfigurationService.getConfigurations(params)
        if (configsResponse.data != null) {
          setConfigs([...configsResponse.data, null])
        }
        const integrationSourcesResponse = await integrationSourceService.getIntegrationSourcesList()
        if (integrationSourcesResponse.data != null) {
          setIntegrationSources(integrationSourcesResponse.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
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
              {configs.map((config, index) => {
                return <TabItem
                  key={config?.id ?? index}
                  label={config?.integrationSource?.source ?? '+ Add New'}
                  {...a11yProps(index)}
                />
              })}
            </Tabs>
          </Box>
          {configs.map((config, index) => {
            return <CustomTabPanel key={config?.id ?? index} value={value} index={index}>
              <ManageClientConfiguration
                integrationSources={integrationSources}
                config={config}
                isLoading={isLoading}
              />
            </CustomTabPanel>
          })}
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>}
    </Box>
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
