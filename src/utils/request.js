import axios from 'axios'
import { stringify } from 'qs'

const _baseURL = ''

const createRequestConfig = (url, method, params, data, baseURL, blob) => {
  const config = {
    url,
    method,
    params,
    data,
    baseURL,
    headers: {},
    paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
    withCredentials: true,
  }
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  if (blob) {
    config.responseType = 'blob'
  }
  if (baseURL) {
    config.baseURL = baseURL
  }
  return config
}

export const request = async (
  url,
  method = 'GET',
  params = {},
  data = {},
  baseURL = _baseURL,
  blob = false
) => {
  try {
    const config = createRequestConfig(url, method, params, data, baseURL, blob)
    const response = await axios.request(config)
    return { success: true, payload: response.data, status: response.status }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      error: e.response?.data || 'Что-то пошло не так',
      status: e.response?.status,
    }
  }
}
