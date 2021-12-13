/**
 * 5秒でタイムアウトするfetch
 * @param url URL
 * @returns レスポンス
 */
export async function fetchTimeout(url: string) {
  // 5秒でタイムアウト
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), 5000)

  const res = await fetch(url, { signal: ctrl.signal }).catch((err) => {
    throw new Error(`[Error] timeout! (${err})`)
  })

  clearTimeout(id)

  return res
}
