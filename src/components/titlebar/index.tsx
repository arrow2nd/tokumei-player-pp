import React from 'react'
import { MdClose, MdMinimize } from 'react-icons/md'

import Button from '../common/button'

const Titlebar = (): JSX.Element => {
  const handleMinimizeClick = () => window.api.windowMinimize()
  const handleCloseClick = () => window.api.windowClose()

  return (
    <div className="fixed top-0 left-0 p-2 text-base drag-none">
      <Button onClick={handleCloseClick}>
        <MdClose />
      </Button>
      <Button onClick={handleMinimizeClick}>
        <MdMinimize />
      </Button>
    </div>
  )
}

export default Titlebar
