import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import Web3 from 'web3';

// @ts-ignore
const { ethereum } = window;
let _web3: any = null;

export default () => {
  const [address, setAddress] = useState<String>('0');
  const [balance, setBalance] = useState<String>('0');
  const [wrongNetwork, setWrongNetwork] = useState<boolean>(false);

  const getBalance = () => {
    _web3.eth.getBalance(address).then(setBalance);
  };

  const connectWallet = () => {
    if (ethereum) {
      _web3 = new Web3(ethereum);

      ethereum.enable().then(() => {
        console.log('chainId: ', ethereum.chainId);

        _web3.eth.getAccounts().then((accounts: String[]) => {
          _web3.eth.defaultAccount = accounts[0];
          setAddress(accounts[0]);
          _web3.currentProvider;
        });
      });
    } else {
      alert('未安装 MetaMask');
    }
  };

  ethereum.on('accountsChanged', (accounts: String) => {
    console.log('accountsChanged', accounts);
    setAddress(accounts[0]);
    getBalance();
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
  });

  ethereum.on('chainChanged', (chainId: String) => {
    console.log('chainChanged', chainId);
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  });

  useEffect(() => {
    // useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
  }, []);

  return (
    <PageContainer className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        {/*<Spin spinning={loading} size='large' />*/}
        <p>{address}</p>
        <p>{balance}</p>
        <Button type="primary" onClick={connectWallet}>
          Connect Wallet
        </Button>
        <Button type="primary" onClick={getBalance}>
          Balance
        </Button>
      </div>
    </PageContainer>
  );
};
