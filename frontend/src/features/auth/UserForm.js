import React, { useState } from 'react'
import { toast } from 'react-toastify';
const UserForm = ({handleSubmit}) => {
    const [wallet, setWallet] = useState("");
    const [password, setPassword] = useState("");
    async function connectWallet(e) {
        e.preventDefault()
        if (typeof window.ethereum !== "undefined") {
            try {
                // Request the user to connect their wallet
                await window.ethereum.request({ method: "eth_requestAccounts" });
                // Get the user's account address
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                setWallet(accounts[0]);
                toast.success("Wallet Address Connected Successfully")
            } catch (error) {
                console.error(error);
                toast.error(error.message)
            }
        } else {
            toast.error("Please install MetaMask!")
        }
    }
    const handleSubmitClick = (e) => {
        e.preventDefault()
        handleSubmit({ wallet, password })
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <button
                className="py-2 px-3 my-2 bg-cyan-400 hover:bg-cyan-500 transition-all active:border-cyan-500 text-white rounded-lg"
                onClick={connectWallet}
            >
                Connect Wallet
            </button>
            <div className="flex flex-col items-start">
                <label className="font-bold mr-2 float-left" htmlFor="wallet">
                    Wallet Address
                </label>
                <input
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    type="text"
                    id="wallet"
                    className="p-2 w-[50vw] text-black border-blue-400 border-2 rounded-md"
                    placeholder="Enter Wallet Address"
                />
            </div>
            <div className="flex flex-col items-start">
                <label className="font-bold mr-2 float-left" htmlFor="password">
                    Password
                </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    autoComplete="on"
                    className="p-2 w-[50vw] text-black border-blue-400 border-2 rounded-md"
                    placeholder="Enter Wallet Password"
                />
            </div>
            <div className="flex justify-around items-center">
                <button
                    onClick={(e)=>handleSubmitClick(e)}
                    className="py-2 text-black font-semibold px-3 my-2 bg-amber-400 hover:bg-amber-500 transition-all active:border-amber-500 rounded-lg"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
export default UserForm