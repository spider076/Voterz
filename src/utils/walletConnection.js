const getWeb3state = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("No Web3 Provider found");
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        const chainHex = await window.ethereum.request({
            method: "eth_chainId"
        })

        const chainId = parseInt(chainHex, 16);

        return { data: { selectedAccount: accounts[0], chainId, contractInstance: null }, status: "Connected !" }
    } catch (error) {
        console.error("Error : ", error);
        return {
            data: null,
            status: "😥 " + err.message,
        }
    }
}

const getCurrentWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts", // this method returns the metamask connected accounts in realtime(altho you have to call it wraped up in the function)
            })

            console.log('addresccount :', addressArray);
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "👆🏽 Write a message in the text-field above.",
                }
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to MetaMask using the top right button.",
                }
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            }
        }
    } else {
        return {
            address: "",
            status: "please install metamask and come back !",
        }
    }
}

export { getWeb3state, getCurrentWallet }