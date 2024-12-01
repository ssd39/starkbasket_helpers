import React, { useState } from "react";
import { RpcProvider, Account, Contract, CallData } from "starknet";
import basketFactory from "../abis/basketFactory";

const TokenForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    tokens: [""],
    weights: [""],
    whitelisted: [""],
    salt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (name, index, value) => {
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [name]: updatedArray,
    });
  };

  const addField = (name) => {
    setFormData({
      ...formData,
      [name]: [...formData[name], ""],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Deploy Your Contract
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
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
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="symbol"
            >
              Symbol
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

          {/* Tokens */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tokens
            </label>
            {formData.tokens.map((token, index) => (
              <input
                key={index}
                type="text"
                value={token}
                onChange={(e) =>
                  handleArrayChange("tokens", index, e.target.value)
                }
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
                placeholder="Enter token address"
                required
              />
            ))}
            <button
              type="button"
              onClick={() => addField("tokens")}
              className="text-blue-500 hover:underline"
            >
              + Add Token
            </button>
          </div>

          {/* Weights */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Weights
            </label>
            {formData.weights.map((weight, index) => (
              <input
                key={index}
                type="text"
                value={weight}
                onChange={(e) =>
                  handleArrayChange("weights", index, e.target.value)
                }
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
                placeholder="Enter weight (u256)"
                required
              />
            ))}
            <button
              type="button"
              onClick={() => addField("weights")}
              className="text-blue-500 hover:underline"
            >
              + Add Weight
            </button>
          </div>

          {/* Whitelisted */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Whitelisted Addresses
            </label>
            {formData.whitelisted.map((address, index) => (
              <input
                key={index}
                type="text"
                value={address}
                onChange={(e) =>
                  handleArrayChange("whitelisted", index, e.target.value)
                }
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
                placeholder="Enter address"
                required
              />
            ))}
            <button
              type="button"
              onClick={() => addField("whitelisted")}
              className="text-blue-500 hover:underline"
            >
              + Add Address
            </button>
          </div>

          {/* Salt */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="salt"
            >
              Salt
            </label>
            <input
              type="text"
              id="salt"
              name="salt"
              value={formData.salt}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter salt (felt252)"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition-transform transform hover:scale-105"
          >
            Deploy Contract
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const handleFormSubmit = async (data) => {
    console.log("Submitted Data:", data);
    const provider = new RpcProvider({ baseUrl: "SN_SEPOLIA" });
    const privateKey0 =
      "MY_PK";
    const account0Address =
      "0x01AeDF7F51F88733B58Bfa8ea2411cA0696c95f8defBA3cA1316501a0b1d37F9";
    const basket_factory_address =
      "0x10e37fe4fbd7c9a4f92b2f066120016bf02b13f3eb1dc682565dcc5345c2941";

    const account0 = new Account(provider, account0Address, privateKey0);


    const myTestContract = new Contract(basketFactory, basket_factory_address, provider);
    const contractConstructor = myTestContract.populate('create_basket', [data.name, data.symbol, data.tokens, data.weights, data.whitelisted, data.salt]);

    myTestContract.connect(account0);

    // Interaction with the contract with call
    const res = await myTestContract.create_basket(contractConstructor.calldata);
    console.log(`TxHash: ${res.transaction_hash}`)
    await provider.waitForTransaction(res.transaction_hash);
    console.log('Basket created successfully')

  };

  return <TokenForm onSubmit={handleFormSubmit} />;
};

export default App;
