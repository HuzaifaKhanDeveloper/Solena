import React from 'react'
import WalletContextProvider from './contexts/WalletContextProvider'
import HomePage from './components/Home'

const App = () => {
  return (
    <WalletContextProvider>
      <HomePage />
    </WalletContextProvider>
  )
}

export default App