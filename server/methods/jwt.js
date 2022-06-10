const jwt=require('jsonwebtoken')

require('dotenv').config()

const jwtGenerator=(user_id)=>{
    const payload={
        user:user_id
    }

    return jwt.sign({user:user_id},process.env.jwtSecret,{expiresIn:'5h'})
}

module.exports=jwtGenerator
