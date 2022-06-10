const Pool = require('pg').Pool

const pool=new Pool({
    user:'cross_tester',
    database:'cross_test',
    password:'cross_tester',
    host:'localhost',
    port:5432
})

module.exports=pool