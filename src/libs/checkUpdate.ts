import axios from 'axios'
import { app } from 'electron'
import os from 'os'

import { GITHUB_API_URL } from '../data/constants'

interface IGitHubAPIResponse {
  tag_name: string
  html_url: string
  assets: {
    name: string
    browser_download_url: string
  }[]
}

/**
 * 更新チェック
 *
 * @returns ダウンロードページのURL
 */
export async function checkUpdate(): Promise<string | undefined> {
  const res = await axios.get<IGitHubAPIResponse>(GITHUB_API_URL, {
    timeout: 5000
  })

  if (res.status !== 200) {
    console.error(res.statusText)
    return undefined
  }

  // 更新が無い
  if (res.data.tag_name === `v${app.getVersion()}`) {
    return undefined
  }

  const osType = os.type().toString()
  const extList = new Map([
    ['Linux', 'AppImage'],
    ['Darwin', 'dmg'],
    ['Windows_NT', 'exe']
  ])

  const assets = res.data.assets.find(({ name }) => {
    const ext = extList.get(osType)
    return ext ? name.endsWith(ext) : undefined
  })

  // 見つからなかったらreleasesへのURLを返す
  return assets ? assets.browser_download_url : res.data.html_url
}
