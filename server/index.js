const express=require('express')
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(cors())


app.use('/auth',require('./routes/auth'))
app.use('/profile',require('./routes/profile'))
app.use('/transaction',require('./routes/transaction'))


app.listen(4000,()=>{
    console.log('Server running on Port 4000');
})
