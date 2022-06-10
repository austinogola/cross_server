const router=require('express').Router()
const pool=require('../pool')
const bcrypt=require('bcrypt')
const jwtGenerator=require('../methods/jwt')


router.post('/initiated',async(res,req)=>{
    try {
        const {transaction_type,amount}=req.body
        const tran=pool.query('INSERT INTO trans(transaction_type,transaction_date,amount,status)')
    } catch (err) {
        console.log(err.message);
    }
})


module.exports = router;
