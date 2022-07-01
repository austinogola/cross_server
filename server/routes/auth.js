const router=require('express').Router()
const pool=require('../pool')
const bcrypt=require('bcrypt')
const jwtGenerator=require('../methods/jwt')
const authorization=require('../middleware/authorization')

router.post('/register',async(req,res)=>{
    try {
        const {fname,lname,phone,email,password}=req.body
        console.log(email);
        const usr= await pool.query('SELECT * FROM members WHERE email=$1 OR phone=$2',[email,phone])

        if(usr.rows.length==0){
            const salt=await bcrypt.genSalt(10)
            const encryPassword=await bcrypt.hash(password,salt)
            const newUser=await pool.query('INSERT INTO members(fname,lname,phone,email,password) values($1,$2,$3,$4,$5)',[
            fname,lname,phone,email,encryPassword])

            console.log('User added');

            const token=jwtGenerator(newUser.rows.user_id)
            res.status(200).json({token})

        }
        else{
          res.status(409).json({"Error":'User already exists'})
        }
    }
    catch (error) {
        console.log(error.message);
    }
})

router.post('/login',async(req,res)=>{
    try {
        const {phone,email,password}=req.body
        const usr= await pool.query('SELECT * FROM members WHERE email=$1 OR phone=$2',[email,phone])
        if(usr.rowCount==0){
            res.status(403).send('Invalid credentials')
        }
        else{
            const passwordValid=await bcrypt.compare(password,usr.rows[0].password)
            if(passwordValid){
                const token=jwtGenerator(usr.rows[0].user_id)
                res.status(200).json({token})
            }
            else{
                res.status(403).json("Not authorized,Invalid credentials")
            }

        }
    }
    catch (error) {
        console.log(error.message)
    }
})

router.get('/verify',authorization,async(req,res)=>{
    try {
        res.status(200).json(true)
    } catch (error) {
        res.status(500).json({"Err":"Server Error"})
    }
})

router.get('/user',authorization,async(req,res)=>{
  try {
    res.status(200).json(req.user)
  } catch (e) {
    res.status(500).json('Server Error')
  }
})



module.exports=router
