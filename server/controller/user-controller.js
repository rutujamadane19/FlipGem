const User = require('../model/userSchema.js');


exports.userLogIn = async (request, response) => {
    try {
        let user = await User.findOne({ username: request.body.username, password: request.body.password });
        if(user) {
            return response.status(200).json({user:user,msg:"success"});
        } else {
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        return response.json('Error: ', error.message);        
    }
}

const {Wallet} = require('ethers')
exports.userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).json({ message: 'User already exist'});
        }
        const wallet = Wallet.createRandom();
        const user = request.body;
        user.walletAddress= wallet.address;
        user.walletMnemonic= wallet.mnemonic.phrase;
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({user:user,msg:"success"});
        
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}



