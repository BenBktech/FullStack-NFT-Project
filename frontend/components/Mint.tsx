import Contract from "../../BackEnd/artifacts/contracts/NFTIsERC721A.sol/NFTIsERC721A.json"
import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification, Button } from "@web3uikit/core"

const Mint = () => {

    const { isWeb3Enabled } = useMoralis()

    const dispatch = useNotification()

    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState(1);

    const contractAddress: string = "0x67e5e7871A38A9d6a214B96dE1aB7c8f9508a489";

    useEffect(() => {
        if(isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const { runContractFunction: getPrice } = useWeb3Contract({
        abi: Contract.abi,
        contractAddress: contractAddress, // specify the networkId
        functionName: "getPrice",
        params: {},
    })

    const { runContractFunction: publicMint, isLoading, isFetching } = useWeb3Contract({
        abi: Contract.abi,
        contractAddress: contractAddress, // specify the networkId
        functionName: "publicMint",
        params: {quantity},
        msgValue: price
    })

    async function updateUI() {
        const price = (await getPrice()).toString()
        setPrice(price)
    }

    const handleSuccess = async function(tx: any) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function() {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            title: "Transaction Notification",
            position: "topR",
        })
    }

    return (
        <div className="flex__mint">
            <button className="" onClick={ async function() {
                setQuantity(1)
                await publicMint({
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error)
                    })}}
                    disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                        <div className="">Minting...</div>
                        )
                        : (
                            <div>Mint 1 NFT</div>
                        )}
            </button>
            <button className="" onClick={ async function() {
                setQuantity(2)
                await publicMint({
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error)
                    })}}
                    disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                        <div className="">Minting...</div>
                        )
                        : (
                            <div>Mint 2 NFTs</div>
                        )}
            </button>
            <button className="" onClick={ async function() {
                setQuantity(3)
                await publicMint({
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error)
                    })}}
                    disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                        <div className="">Minting...</div>
                        )
                        : (
                            <div>Mint 3 NFTs</div>
                        )}
            </button>
        </div>
    )
}

export default Mint