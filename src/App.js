import { useState } from 'react'
import { ethers } from 'ethers'

function App() {

  const [connected, setConnected] = useState(false)
  const [id, setId] = useState(null)

  const connect = async () => {
    try {
      if (!connected) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const displayAddress = address?.substr(0, 6) + "..."
        const message = "Hello world 👋"
        const sig = await signer.signMessage(message)
        ethers.verifyMessage(message, sig)
        setId(displayAddress)
        setConnected(true)
      } else {
        window.ethereum.selectedAddress = null
        setConnected(false)
      }
    } catch(error) {
      console.log(error.message)
    }
  }

  return (
    <div className="parent">
      <nav className="glass">
        <a href="./">Home</a>
        <a href="./">About</a>
        <a href="./">Contact</a>
      </nav>
      <section className="glass">
        <button onClick={connect}>
          {connected ? id : "CONNECT"}
        </button>
      </section>
      <footer className="glass">
        @ssailsbury
      </footer>
    </div>
  );
}

export default App;
