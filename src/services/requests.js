import axios from 'axios'
import { decamelizeKeys, camelizeKeys } from 'humps'

export const API_URL = 'https://opentdb.com/api.php'

const instance = axios.create({
  baseURL: API_URL,
  transformResponse: [
    response => (response ? camelizeKeys(JSON.parse(response)) : response),
  ],
  transformRequest: [
    response => (response ? decamelizeKeys(JSON.parse(response)) : response),
  ],
})

export default instance
