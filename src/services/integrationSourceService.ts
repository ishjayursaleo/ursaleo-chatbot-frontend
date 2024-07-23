import { axiosPrivateAPI } from '.'
import { type AxiosResponse } from 'axios'
import { type IntegrationSource } from '../interfaces/integrationSource'

const getIntegrationSourcesList = async ():
Promise<AxiosResponse<IntegrationSource[]>> => {
  return await axiosPrivateAPI.get('/api/integration-source/list')
}

export const integrationSourceService = {
  getIntegrationSourcesList
}
