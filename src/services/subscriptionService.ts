import { axiosPrivateAPI } from '.'

const unsubscribeAll = async (payload: { userId: string, browserRefId: string }) => {
  return await axiosPrivateAPI.put('/api/subscription?isSignOut=true', payload)
}

export const subscriptionService = {
  unsubscribeAll
}
