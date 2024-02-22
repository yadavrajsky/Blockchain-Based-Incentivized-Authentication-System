/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { showToast } from "../../Components/utils/showToast";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsAndMessages,
  fetchContractABI,
  fetchContractAddress,
} from "../contract/contractSlice";
import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";

function CompanyHomePage() {
  const { contractABI, contractAddress, error, message } = useSelector(
    (state) => state.contract
  );
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [etherAmount, setEtherAmount] = useState(1);
  const [etherUnit, setEtherUnit] = useState("ether"); // select from wei, ether and gwei
  const depositEther = async () => {
    try {
      // Check if Ether amount is a positive number
      if (isNaN(etherAmount) || etherAmount <= 0) {
        showToast("Invalid amount", null, "amount");
        return;
      }

      const contract = new web3.eth.Contract(contractABI, contractAddress);
      if (!contract) {
        showToast(
          "Contract not initialized. Please try again.",
          null,
          "Contract"
        );
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const fromAddress = accounts[0];

      // Convert Ether amount to Wei
      const valueInWei = web3.utils.toWei(etherAmount.toString(), etherUnit);

      // Construct transaction data
      const transactionData = contract.methods.addDeposit();
      const gasPrice = await web3.eth.getGasPrice();

      // Send transaction using MetaMask
      const transactionHash = await transactionData.send({
        from: fromAddress,
        value: valueInWei,
        gasPrice: gasPrice
      });
      console.log(transactionHash);

      showToast(null, `Transaction Sent`, "Company");
    } catch (error) {
      showToast(error?.data?.message, null, "Company");
    }
  };

  const registerCompany = async () => {
    try {
      if (!companyInput) {
        showToast("Please enter a company name", null, "Company");
        return;
      }
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      if (!contract) {
        showToast(
          "Contract not initialized. Please try again.",
          null,
          "Contract"
        );
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const fromAddress = accounts[0];
      const transactionData = contract.methods.registerCompany(companyInput);
      const gas = await transactionData.estimateGas({ from: fromAddress });
      const gasPrice = await web3.eth.getGasPrice();

      const transactionParameters = {
        from: fromAddress,
        to: contractAddress,
        gas: web3.utils.toHex(gas),
        gasPrice: web3.utils.toHex(gasPrice),
        data: transactionData.encodeABI(),
      };

      // Send transaction using MetaMask
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      showToast(null, `Transaction Sent`, "Company");
    } catch (error) {
      showToast(error?.data?.message, null, "Company");
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          // Fetch the current account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Fetch the account balance
          const weiBalance = await web3Instance.eth.getBalance(accounts[0]);
          const ethBalance = web3Instance.utils.fromWei(weiBalance, "ether");
          setBalance(parseFloat(ethBalance));
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.error("MetaMask not detected");
      }
    };

    initWeb3();
  }, []);
  useEffect(() => {
    dispatch(fetchContractABI());
    dispatch(fetchContractAddress());
  }, []);
  useEffect(() => {
    if (message) showToast(false, message, "contract");
    else if (error) showToast(error, false, "contract");
    dispatch(clearErrorsAndMessages());
  }, [error, message]);
  useEffect(() => {
    async function getCompanyName() {
      try {
        if (!web3) {
          console.error("Web3 instance not available");
          return;
        }
    
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const fromAddress = accounts[0];
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
    
        // Call the getRegisteredCompanyName function
        const result = await contract.methods
          .getRegisteredCompanyName()
          .call({ from: fromAddress });
        setCompanyName(result);
      } catch (error) {
        console.error("Error fetching company name:", error);
      }
    }
    if (contractABI.length && contractAddress) getCompanyName();
  }, [contractABI, contractAddress,web3]);
  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 border rounded-md shadow-lg">
         <div className="flex justify-center items-center">
          <Link className="text-3xl font-bold text-blue-700 mb-4 mx-auto flex" to={"/"}> Go Home <IoIosHome className="ml-3" />
</Link>
          </div> 

      {web3 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Connected Account: {account}</h2>
          <h2 className="text-2xl font-bold mb-4">Wallet Balance: {balance} ETH</h2>
          <h2 className="text-2xl font-bold mb-4">Contract Address: {contractAddress}</h2>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Company Name:</label>
            {companyName ? (
              <div className="mt-2 font-semibold">{companyName}</div>
            ) : (
              <div className="flex items-center">
                <input
                  className="mt-1 p-2 border rounded-md w-full mr-2"
                  type="text"
                  placeholder="Enter company name"
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
                  onClick={() => registerCompany()}
                >
                  Register Company
                </button>
              </div>
            )}
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ether Amount:</label>
            <input
              className="mt-1 p-2 border rounded-md w-full"
              type="number"
              placeholder="Enter amount"
              value={etherAmount}
              onChange={(e) => setEtherAmount(e.target.value)}
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ether Unit:</label>
            <select
              className="mt-1 p-2 border rounded-md w-full"
              value={etherUnit}
              onChange={(e) => setEtherUnit(e.target.value)}
            >
              <option value="ether">Ether</option>
              <option value="gwei">Gwei</option>
              <option value="wei">Wei</option>
              {/* Add other units as needed */}
            </select>
          </div>
  
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md mr-4"
            onClick={() => depositEther()}
          >
            Deposit Ether
          </button>
        </div>
      ) : (
        <p className="text-red-500">Please install MetaMask to use this feature.</p>
      )}
    </div>
  );
  ;
}

export default CompanyHomePage;
