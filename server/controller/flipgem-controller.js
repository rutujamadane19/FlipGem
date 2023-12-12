const user = require("../model/userSchema");
const { flipGemConnector, RewardRulesConnector } = require("../utils/flipgem");
const {formatUnixTimestamp} = require('../utils/getDate');
const { ethers } = require("hardhat");

const getAmount = async (req, res) => {
    try {
        const { userId } = req.body;
        const myuser = await user.findById(userId);

        if (!myuser) {
            return res.status(400).json({ msg: "User not found" });
        }

        if (!myuser.walletAddress) {
            return res.status(400).json({ msg: "Wallet address not found for the user" });
        }

        const useraddress = myuser.walletAddress;
        const flipGem = await flipGemConnector();
        // console.log(flipGem.symbol());

        let addrBalance;
        try {
            addrBalance = await flipGem.balanceOf(useraddress);
        } catch (balanceErr) {
            return res.status(500).json({ msg: "Error fetching balance" });
        }

        const data = addrBalance.toString();

        return res.status(200).json({ balance: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const setRewardRulesForAction = async (req, res) => {
    try {
        const { product_id, reward } = req.body;
        const rewardRules = await RewardRulesConnector();
        // console.log(rewardRules);
        const tx = await rewardRules.setRewardForAction(product_id, reward);
        await tx.wait(); // Wait for the transaction to be mined
        
        return res.status(200).json({ msg: "Reward rule successfully set" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error setting reward rule" });
    }
};

const setCoupenAmount = async (req, res) => {
    try {
        const { coupen_id, reward } = req.body;
        const rewardRules = await RewardRulesConnector();
        
        const tx = await rewardRules.setCoupenAmount(coupen_id, reward);
        await tx.wait(); // Wait for the transaction to be mined
        
        return res.status(200).json({ msg: "Coupen rule successfully set" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error setting coupen rule" });
    }
};
const getRewardRulesForAction = async (req, res) => {
    try {
        const { product_id } = req.body;
        const rewardRules = await RewardRulesConnector();
        
        const tx = await rewardRules.getRewardForAction(product_id);
        return res.status(200).json({tx: tx.toString(10)});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error getting reward rule" });
    }
};

const getCoupenAmount = async (req, res) => {
    try {
        const { coupen_id} = req.body;
        const rewardRules = await RewardRulesConnector();
        
        const tx = await rewardRules.getCoupenAmountForAction(coupen_id);
        
        return res.status(200).json({ price: tx.toString(10) });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error getting coupen rule" });
    }
};

const transferReward = async (req, res) => {
    const { userId,product_id } = req.body;
    const myuser = await user.findById(userId);

    if (!myuser) {
        return res.status(400).json({ msg: "User not found" });
    }

    if (!myuser.walletAddress) {
        return res.status(400).json({ msg: "Wallet address not found for the user" });
    }

    const rewardRules = await RewardRulesConnector();
    const tx = await rewardRules.transferReward(myuser.walletAddress,product_id);
    await tx.wait(); 
    res.status(200).json({ msg: "Reward transfered successfully" });
}
const deductCoupen= async (req, res) => {
    const { userId,coupen_id } = req.body;
    try {
        const myuser = await user.findById(userId);
        if (!myuser) {
            return res.status(400).json({ msg: "User not found" });
        }
        
        if (!myuser.walletAddress) {
            return res.status(400).json({ msg: "Wallet address not found for the user" });
        }
        
        const rewardRules = await RewardRulesConnector();
        const tx = await rewardRules.deductCoupon(myuser.walletAddress,coupen_id);
        console.log(tx);
        await tx.wait(); 
        return res.status(200).json({ msg: "Reward transfered successfully" });
    } catch (error) {
        console.log("server error");
        return res.status(500).json("server eror")
    }
 
}

const decayReward= async (req, res) => {
    const { userId,coupen_id } = req.body;
    const myuser = await user.findById(userId);

    if (!myuser) {
        return res.status(400).json({ msg: "User not found" });
    }

    if (!myuser.walletAddress) {
        return res.status(400).json({ msg: "Wallet address not found for the user" });
    }

    const rewardRules = RewardRulesConnector();
    const tx = await rewardRules.decayReward(myuser.walletAddress,amount);
    await tx.wait(); 
    res.status(200).json({ msg: "Reward transfered successfully" });
}

const getUserTransactions=async(req,res)=>{
    try {
        const { userId } = req.body;
        const myuser = await user.findById(userId);

        if (!myuser) {
            return res.status(400).json({ msg: "User not found" });
        }

        if (!myuser.walletAddress) {
            return res.status(400).json({ msg: "Wallet address not found for the user" });
        }

        const useraddress = myuser.walletAddress;
        const rewardRules=await RewardRulesConnector();
        const resp=await rewardRules.getUserTransactions(useraddress);
        const data = [];
        for(let i = 0; i < resp.length; ++i){
            const obj = {
                "from":resp[i][0],
                "to":resp[i][1],
                "amount":resp[i][2].toString(10),
                "timestamp": formatUnixTimestamp(resp[i][3].toString(10))
            }
            data.push(obj)
        }
        const newdata=data.reverse();
        return res.status(200).json({transactions:newdata});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
}
module.exports = {
    getAmount,
    setRewardRulesForAction,
    getRewardRulesForAction,
    getCoupenAmount,
    setCoupenAmount,
    transferReward,
    deductCoupen,
    decayReward,
    getUserTransactions
};
