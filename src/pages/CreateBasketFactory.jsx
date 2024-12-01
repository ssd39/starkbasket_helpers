import React, { useState } from "react";
import { RpcProvider, Account, Contract, CallData } from 'starknet';
import basketFactory from "../abis/basketFactory";

const TokenForm = ({ onSubmit }) => {
  const [classHash, setClassHash] = useState("");

  const handleChange = (e) => {
    setClassHash(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(classHash);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Deploy Contract
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="classHash"
            >
              Class Hash
            </label>
            <input
              type="text"
              id="classHash"
              name="classHash"
              value={classHash}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 0x02d2cc667f2d1..."
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
  const handleFormSubmit = async (basketTokenClassHash) => {
    console.log("basketTokenClassHash Hash:", basketTokenClassHash);
    const provider = new RpcProvider({ baseUrl: "SN_SEPOLIA" });
    const privateKey0 =
      "";
    const account0Address =
      "0x01AeDF7F51F88733B58Bfa8ea2411cA0696c95f8defBA3cA1316501a0b1d37F9";

    const account0 = new Account(provider, account0Address, privateKey0);

    const testClassHash = "0x01051b82c755e03a4f50da3f60cff3d40d5c1fa775ed475fba84f2c2afcbd109";

    const contractCallData = new CallData(basketFactory);
    const contractConstructor = contractCallData.compile("constructor", {
        basket_token_class_hash: basketTokenClassHash
    });

    const deployResponse = await account0.deployContract({
      classHash: testClassHash,
      constructorCalldata: contractConstructor,
    });

    console.log(`TxHash: ${deployResponse.transaction_hash}`);
    await provider.waitForTransaction(deployResponse.transaction_hash);

    const { abi: testAbi } = await provider.getClassByHash(testClassHash);
    if (!testAbi) throw new Error("No ABI found for the class hash.");

    const myTestContract = new Contract(
      testAbi,
      deployResponse.contract_address,
      provider
    );
    console.log("✅ Contract deployed at =", myTestContract.address);
  };

  return <TokenForm onSubmit={handleFormSubmit} />;
};

export default App;
