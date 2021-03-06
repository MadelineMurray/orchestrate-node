// tslint:disable: no-console

import * as util from 'util'

import { TransactionClient } from '../../src'

export const start = async () => {
  try {
    const txClient = new TransactionClient('http://localhost:8031')

    const res = await txClient.send(
      {
        chain: 'besu',
        params: {
          to: '0x4a435585d27cd7e6dae2c714be8e414b5fd7d257',
          methodSignature: 'transfer(address,uint256)',
          args: ['0x6009608a02a7a15fd6689d6dad560c44e9ab61ff', 5000],
          annotations: {
            oneTimeKey: true
          }
        }
      },
      'ExampleOneTimeKey'
    )

    console.log(util.inspect(res, false, null, true))
  } catch (error) {
    console.error(error)
  }
}
