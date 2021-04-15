import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import Web3 from 'web3';
import { connect } from 'umi';

import StorageAbi from '../../abi/StorageAbi.json';

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

  const test = () => {
    const storageContract = new _web3.eth.Contract(
      StorageAbi,
      '0xC0F39204d2ea2D8AFacCdB429b471768709475eb',
    );

    // send 改变合约状态, 用于写入数据
    storageContract.methods
      .store(999)
      .send({ from: address })
      .then((r: any) => {
        console.log('store', r);
      });

    // call 调用方式无法改变智能合约状态, 用于读取数据
    storageContract.methods
      .retrieve()
      .call()
      .then((r: any) => {
        console.log('retrieve', r);
      });
  };

  useEffect(() => {
    // @ts-ignore
    /*connect( (mapStateToProps,     mapDispatchToProps,     mergeProps,     options) =>{
      console.log(mapStateToProps)
      console.log(mapDispatchToProps)
      console.log(mergeProps)
      console.log(options)
    } )*/
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
        <Button type="primary" onClick={test}>
          Test
        </Button>
      </div>
    </PageContainer>
  );
};
