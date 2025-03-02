import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Web3context } from './context/Web3Provider'
import { getCurrentWallet } from './utils/walletConnection'

function App() {
  const web3state = useContext(Web3context);

  console.log('webstate from the app.js ', web3state);

  return (
    <main>
      <h1>HOLAAA !</h1>
    </main>
  )
}

export default App
