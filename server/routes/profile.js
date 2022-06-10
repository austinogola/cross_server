const router = require('express').Router();
const pool=require('../pool')

router.post('/',async(req,res)=>{
  try {
    const {user_id}=req.body
    console.log(user_id);

    const usrData=await pool.query('SELECT * FROM members WHERE user_id=$1',[user_id])

    const usrHistory=await pool.query('SELECT * FROM trans WHERE user_id=$1',[user_id])

    const profile={data:usrData,hist:usrHistory}
    res.status(200).json(profile)

  } catch (e) {
    console.log(e.message);
    res.status(404).json('Server Error')
  }
})

module.exports = router;
