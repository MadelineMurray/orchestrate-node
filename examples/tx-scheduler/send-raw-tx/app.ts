// tslint:disable: no-console

import { utils, Wallet } from 'ethers'
import * as cutil from 'util'

import { TransactionClient } from '../../../src/http/tx-scheduler'

export const start = async () => {
  try {
    const txScheduler = new TransactionClient('http://localhost:8041')

    // For development usage only, never expose your private key!
    const privateKey = '8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63'
    const wallet = new Wallet(privateKey)

    console.log('Generated address:', wallet.address)

    // We send 1 ETH to some other account
    const signedTransaction = await wallet.sign({
      nonce: 0,
      gasLimit: 21000,
      to: '0xdbb881a51cd4023e4400cef3ef73046743f08da3',
      value: utils.parseEther('1')
    })

    const res = await txScheduler.sendRaw({
      chain: 'besu',
      params: {
        raw: signedTransaction
      }
    })

    console.log(cutil.inspect(res, false, null, true))
  } catch (error) {
    console.error(error)
  }
}
