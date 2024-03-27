import axios from 'axios'

axios.defaults.withCredentials = true

export const BVID = 'BV1Z14y1A768'
export const CID = 942381986

/**
 * 获取稿件 cid
 * @param bvid 稿件 bvid
 */
export async function getCid(bvid: string): Promise<number> {
  const res = await axios.get('/api/x/player/pagelist', {
    params: {
      bvid,
      jsonp: 'jsonp'
    }
  })

  const cid = res.data.data[0].cid

  return cid
}

/**
 * 获取稿件的音源信息
 * @param bvid 稿件 bvid
 * @param cid 视频 cid
 */
export async function getVideoSourceInfo(
  bvid: string,
  cid: number
): Promise<{
  duration: number
  audioUrl: string
}> {
  const res = await axios.get('/api/x/player/playurl', {
    params: {
      bvid,
      cid,
      // DASH 格式
      fnval: 16
    }
  })
  // duration 视频时长
  const { duration, audio } = res.data.data.dash

  return {
    duration,
    audioUrl: audio[0].baseUrl
  }
}

/**
 * 获取稿件的基本信息
 * @param bvid 稿件 bvid
 */
export async function getBasicInfo(bvid: string): Promise<{
  title: string
  desc: string
}> {
  const { data } = await axios.get('/api/x/web-interface/view', {
    params: {
      bvid
    }
  })

  return {
    title: data.data.title,
    desc: data.data.desc
  }
}
