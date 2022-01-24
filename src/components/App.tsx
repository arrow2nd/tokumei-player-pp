import React from 'react'

import TitleBar from './titlebar'
import UI from './ui'

const App = (): JSX.Element => (
  <div className="flex flex-col justify-center items-center pt-2 h-screen drag font-default select-none bg-white">
    <TitleBar />
    <UI />
  </div>
)

export default App
