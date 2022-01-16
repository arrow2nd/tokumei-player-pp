import React from 'react'

import { Option } from '../../../../types/option'

/**
 * option要素を作成
 * @param items オプションリスト
 * @returns option要素
 */
export function createOptions(items: Option[]): JSX.Element[] {
  return items.map(({ label, value }) => (
    <option className="font-sans" key={label} value={value}>
      {label}
    </option>
  ))
}
