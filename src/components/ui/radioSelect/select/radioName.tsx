import React, { useMemo, ChangeEvent } from 'react'
import Select from '../../../common/select'
import { GroupOptionType } from '../../../../types/option'
import { createOptions } from './createOptions'

type Props = {
  className?: string
  radioOptions: GroupOptionType[]
  disabled: boolean
  onChange: (id: string, name: string) => void
}

const RadioNameSelect = ({
  className = '',
  radioOptions,
  disabled,
  onChange
}: Props): JSX.Element => {
  const optGroups = useMemo(
    () =>
      radioOptions.map((e) => (
        <optgroup className="font-sans" key={e.label} label={e.label}>
          {createOptions(e.options, 40)}
        </optgroup>
      )),
    [radioOptions]
  )

  const handleChangeValue = (e: ChangeEvent<HTMLSelectElement>) => {
    const idx = e.currentTarget.selectedIndex
    const radioName = e.currentTarget.innerText.split('\n')[idx]
    onChange(e.currentTarget.value, radioName)
  }

  return (
    <Select
      className={className}
      disabled={disabled}
      options={optGroups}
      onChange={handleChangeValue}
    />
  )
}

export default React.memo(RadioNameSelect)
