import React from 'react'
import Titlebar from './titlebar'
import UI from './ui'

const App = (): JSX.Element => (
  <>
    <div className="flex flex-col pt-2 h-screen justify-center items-center drag font-default">
      <Titlebar />
      <UI />
    </div>
  </>
)

export default App
