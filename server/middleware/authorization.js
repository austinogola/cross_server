const jwt=require('jsonwebtoken')
require('dotenv').config()

const authorization=async(req,res,next)=>{
    try {
        const jwtToken=req.header("jwtToken")

        if(!jwtToken){
            res.status(403).send('Not Authorized')
        }
        else{
            const payload=await jwt.verify(jwtToken,process.env.jwtSecret)
            console.log(payload.user);
            req.user=payload.user
            next()
        }
    } catch (error) {
        console.log(error.message);
        return res.status(401).send("Not Authorized")
    }
}

module.exports=authorization
