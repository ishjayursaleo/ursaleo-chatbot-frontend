import { isEmpty, isNull, isUndefined } from 'lodash'

const isNullOrUndefinedOrEmpty = (item: string | number | object | null | undefined): boolean => {
  if (isNull(item) || isEmpty(item) || isUndefined(item)) return true
  return false
}

export default isNullOrUndefinedOrEmpty
