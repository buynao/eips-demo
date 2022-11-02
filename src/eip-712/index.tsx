import React from 'react'
import CodeBlock from '~cps/CodeBlock'
import { ethereum, simpleToast } from '~utils/index'

const alert = (msg: string) => {
  simpleToast('success', msg)
}

const alertErr = (err: Error) => {
  console.log('err', err)
  simpleToast('error', err.message)
}

const TYPES = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
  Entry: [
    { name: 'id', type: 'address' },
    { name: 'value', type: 'uint256' },
  ],
  Entries: [{ name: 'content', type: 'Entry[]' }],
}
const DOMAIN = {
  name: 'test-domain',
  version: '0.0.1',
  chainId: '0x1',
  verifyingContract: 0,
}
const message = {
  content: [
    { id: 0, value: 0 },
    { id: 1, value: 2 },
  ],
}

const eth_signTypedData_v3 = () => {
  try {
    ethereum
      .request({
        method: 'eth_signTypedData_v3',
        params: [
          '0xe9A147EADb46df9b149fD01A1A2A296263Fae7EE',
          JSON.stringify({
            types: TYPES,
            domain: DOMAIN,
            primaryType: 'Entries',
            message: message,
          }),
        ],
        from: '0xe9A147EADb46df9b149fD01A1A2A296263Fae7EE',
      })
      .then(() => {
        alert('Add Ethereum Chain Successful')
      })
      .catch(alertErr)
  } catch (e) {
    alertErr(e as Error)
  }
}

const eth_signTypedData_v4 = () => {
  return ethereum
    .request({
      method: 'eth_signTypedData_v4',
      params: [
        '0xe9A147EADb46df9b149fD01A1A2A296263Fae7EE',
        JSON.stringify({ types: TYPES, domain: DOMAIN, primaryType: 'Entries', message: message }),
      ],
      from: '0xe9A147EADb46df9b149fD01A1A2A296263Fae7EE',
    })
    .then(() => {
      alert('Add Ethereum Chain Successful')
    })
    .catch(alertErr)
}
const methods = [
  {
    onClick: eth_signTypedData_v3,
    name: 'eth_signTypedData_v3',
    code: `
      ethereum.request({
        method: 'eth_signTypedData_v3',
        params: [
          ${JSON.stringify({
            types: TYPES.Entries,
            domain: DOMAIN,
            primaryType: 'Entries',
            message: message,
          })},
        ],
        from: '0xe9A147EADb46df9b149fD01A1A2A296263Fae7EE',
      })
    `,
  },
  {
    onClick: eth_signTypedData_v4,
    name: 'eth_signTypedData_v4',
    code: `
      ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [
          ${JSON.stringify({
            types: TYPES.Entries,
            domain: DOMAIN,
            primaryType: 'Entries',
            message: message,
          })},
        ],
        from: '0xe9A147EADb46df9b149fD01A1A2A296263Fae7EE',
      })
    `,
  },
]

const EIP3085: React.FC<{}> = () => {
  return (
    <div className="page">
      <h3 id="h1">EIP-712</h3>
      {methods.map(method => {
        return <CodeBlock key={method.name} {...method} />
      })}
    </div>
  )
}
export default EIP3085
