import React, { useState } from 'react';
import { RpcProvider, Account, Contract, json, stark, uint256, shortString, CallData } from 'starknet';
import erc20 from '../abis/erc20';
const TokenForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const multipliedSupply = formData.supply * 10 ** 18;
    onSubmit({
      ...formData,
      supply: multipliedSupply.toString(),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Token Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="symbol">
              Symbol
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="supply">
              Supply
            </label>
            <input
              type="number"
              id="supply"
              name="supply"
              value={formData.supply}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const handleFormSubmit = async (data) => {
    console.log('Submitted Data:', data);
    // connect provider
    const provider = new RpcProvider({ baseUrl: 'SN_SEPOLIA' });
    // connect your account. To adapt to your own account:
    const privateKey0 = '';
    const account0Address = '0x01AeDF7F51F88733B58Bfa8ea2411cA0696c95f8defBA3cA1316501a0b1d37F9';

    const account0 = new Account(provider, account0Address, privateKey0);

    // Deploy Test contract in devnet
    // ClassHash of the already declared contract
    const testClassHash = '0x00e107d2fe3eb8da26235c9bfcc5c63f40c2c939386f759b4778b1825e66ce8b';


      const contractCallData = new CallData(erc20);
    const contractConstructor = contractCallData.compile('constructor', {
        name: data.name,
        symbol: data.symbol, // for Cairo v2.4.0 onwards
        supply: data.supply,
    });

    const deployResponse = await account0.deployContract({ classHash: testClassHash, constructorCalldata:contractConstructor });
    console.log(`TxHash: ${deployResponse.transaction_hash}`)
    await provider.waitForTransaction(deployResponse.transaction_hash);

    // read abi of Test contract
    const { abi: testAbi } = await provider.getClassByHash(testClassHash);
    if (testAbi === undefined) {
    throw new Error('no abi.');
    }

    // Connect the new contract instance:
    const myTestContract = new Contract(testAbi, deployResponse.contract_address, provider);
    console.log('✅ Test Contract connected at =', myTestContract.address);
  };

  return <TokenForm onSubmit={handleFormSubmit} />;
};

export default App;
