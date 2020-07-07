import axios from 'axios'

const client = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/v3`,
})

client.interceptors.request.use((config) => {
  config.params = {
    classification_id: 5,
    device_identifier: 'web',
    locale: 'es',
    market_code: 'es',
    ...config.params,
  }

  return config
})

export default client
