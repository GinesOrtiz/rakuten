import client from '../../services/client'

export const getCollection = (collection) =>
  client.get(`/lists/${collection}`).then(({ data }) => {
    const response = data.data

    response.contents = response.contents?.data || []

    return response
  })
