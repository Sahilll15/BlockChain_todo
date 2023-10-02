import React from 'react'
import { useState } from 'react'
import { Web3 } from 'web3'
import ABI from './ABI.json'
import { useNavigate } from 'react-router-dom'
const Wallet = ({ saveState }) => {
    const navigate = useNavigate()

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request(
                    {
                        method: 'eth_requestAccounts',
                    }
                )
                console.log(web3, accounts)
                const contractAddress = '0x67c3ff3cBD3E36267fac6185BAE5BE453532E4DC'
                const contract = new web3.eth.Contract(ABI, contractAddress)
                console.log(contract.methods)
                saveState({
                    web3,
                    account: accounts[0],
                    contract
                })
                navigate('/')
            } else {
                window.alert("Please install Metamask")
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
        </div>
    )
}

export default Wallet