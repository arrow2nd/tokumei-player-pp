import React from 'react'

import { truncate } from '../../../../scripts/util'
import { OptionType } from '../../../../types/option'

/**
 * option要素を作成
 *
 * @param items オプションリスト
 * @param maxLen ラベル文字列の最大長
 * @returns option要素
 */
export function createOptions(
  items: OptionType[],
  maxLen: number
): JSX.Element[] {
  return items.map((e) => (
    <option className="font-sans" key={e.label} value={e.value}>
      {truncate(e.label, maxLen)}
    </option>
  ))
}
