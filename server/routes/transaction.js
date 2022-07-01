const router=require('express').Router()
const pool=require('../pool')
const bcrypt=require('bcrypt')
const jwtGenerator=require('../methods/jwt')
const authorization=require('../middleware/authorization')


router.post('/initiate',authorization,async(req,res)=>{
    try {
        const {fromPlatform,toPlatform,fromAmount}=req.body
        console.log(req.body);
        console.log(fromPlatform,toPlatform,fromAmount);
        const trans=await pool.query('INSERT INTO trans(user_id,fromplatform,toplatform,amount,status) values($1,$2,$3,$4,$5) RETURNING trans_id',[
            req.user,fromPlatform,toPlatform,parseFloat(fromAmount),'initiated'
        ])
        console.log('transaction initiated');
        const trans_id=trans.rows[0].trans_id
        res.status(200).json({trans_id:trans_id})
    } catch (err) {
        console.log(err.message);
    }
})



router.get('/:id',authorization,async(req,res)=>{
    try{
        const trans_id=req.params.id

        const trans=await pool.query('SELECT * FROM trans WHERE user_id=$1 AND trans_id=$2 ',[req.user,trans_id])
        
        
        const transaction=trans.rows[0]

        res.status(200).json({"transaction":transaction})

    }catch(err){
        console.log(err.message);
    }
})


module.exports = router;
