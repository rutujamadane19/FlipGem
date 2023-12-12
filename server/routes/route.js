const express = require('express');
const {
    getProductById,
    getProducts
} = require('../controller/product-controller.js');
const {
    userSignUp,
    userLogIn
} = require('../controller/user-controller.js');
// const { addItemInCart } = require('../controller/cart-controller.js');
const {
    addPaymentGateway,
    paymentResponse
} = require('../controller/payment-controller.js');
const {
    getAmount,
    setRewardRulesForAction,
    getRewardRulesForAction,
    getCoupenAmount,
    setCoupenAmount,
    transferReward,
    decayReward,
    deductCoupen,
    getUserTransactions
} = require('../controller/flipgem-controller.js');

const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

// router.post('/cart/add', addItemInCart);
router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);

//flipgem
router.post('/getflipgem',getAmount);
router.post('/setreward',setRewardRulesForAction);
router.post('/getreward',getRewardRulesForAction);
router.post('/setcoupen',setCoupenAmount);
router.post('/getcoupen',getCoupenAmount);
router.post('/transferreward',transferReward);
router.post('/decayreward',decayReward);
router.post('/deductcoupen',deductCoupen);
router.post('/getusertransactions',getUserTransactions);
module.exports= router;