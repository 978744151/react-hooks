import axios from 'axios'
import qs from 'qs'
import type { newAxiosRequestConfig } from './typed'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
axios.defaults.timeout = 30000
const baseRequestConfig: AxiosRequestConfig = {
  baseURL: '/',
}
const instancs = axios.create(baseRequestConfig)
instancs.interceptors.request.use(
  (config: newAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instancs.interceptors.response.use(
  (res: AxiosResponse) => {
    return res
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)
export default instancs