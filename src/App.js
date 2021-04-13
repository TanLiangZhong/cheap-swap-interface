import logo from './logo.svg';
import './App.css';
import {Button} from "antd";
import Web3 from 'web3'

let _web3 = null
const connectWallet = () => {
  if (window.ethereum) {
    console.log('connectWallet')
    _web3 = new Web3(window.ethereum);
    window.ethereum.enable().then(() => {
      _web3.eth.getAccounts().then(accounts => {
        _web3.eth.defaultAccount = accounts[0];
        console.log(accounts)
        getBalance(accounts[0])
      })
    })
  } else {
    console.log('未安装 MetaMask')
  }
}

const getBalance = address => {
  _web3.eth.getBalance(address).then(console.log)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Hello World !!!
        </p>
        <Button type="primary" onClick={connectWallet}>Connect Wallet</Button>
      </header>
    </div>
  );
}

export default App;
