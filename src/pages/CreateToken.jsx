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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Token</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Token Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., MyToken"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="symbol">
              Token Symbol
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., MTK"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="supply">
              Initial Supply
            </label>
            <input
              type="number"
              id="supply"
              name="supply"
              value={formData.supply}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 1000000"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition-transform transform hover:scale-105"
          >
            Deploy Token
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const handleFormSubmit = async (data) => {
    console.log('Submitted Data:', data);
    const provider = new RpcProvider({ baseUrl: 'SN_SEPOLIA' });
    const privateKey0 = '';
    const account0Address = '0x01AeDF7F51F88733B58Bfa8ea2411cA0696c95f8defBA3cA1316501a0b1d37F9';

    const account0 = new Account(provider, account0Address, privateKey0);

    const testClassHash = '0x02d2cc667f2d1db3bb2748e77d577a12cb6fd947954591f1f9b803fe27659a5b';

    const contractCallData = new CallData(erc20);
    const contractConstructor = contractCallData.compile('constructor', {
      name: data.name,
      symbol: data.symbol,
      supply: data.supply,
      owner: account0Address
    });

    const deployResponse = await account0.deployContract({ classHash: testClassHash, constructorCalldata: contractConstructor });
    console.log(`TxHash: ${deployResponse.transaction_hash}`);
    await provider.waitForTransaction(deployResponse.transaction_hash);

    const { abi: testAbi } = await provider.getClassByHash(testClassHash);
    if (!testAbi) throw new Error('no abi.');

    const myTestContract = new Contract(testAbi, deployResponse.contract_address, provider);
    console.log('✅ Test Contract connected at =', myTestContract.address);
  };

  return <TokenForm onSubmit={handleFormSubmit} />;
};

export default App;
