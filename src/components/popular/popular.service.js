import client from '../../services/client'

export const getPopular = async () =>
  client
    .get('/lists/populares-en-taquilla')
    .then(({ data }) => data.data?.contents?.data || [])
