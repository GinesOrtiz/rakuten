import client from '../../services/client'

export const getTrailer = (content_id) =>
  client
    .post('/me/streamings', {
      audio_language: 'SPA',
      audio_quality: '2.0',
      content_id,
      content_type: 'movies',
      device_serial: 'device_serial_1',
      device_stream_video_quality: 'FHD',
      player: 'web:PD-NONE',
      subtitle_language: 'MIS',
      video_type: 'trailer',
    })
    .then(({ data }) => data.data)
