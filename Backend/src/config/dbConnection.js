const mongoose = require('mongoose')

exports.dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("Connected"))
    .catch((err)=>{console.log("not connected",err)
        process.exit(1)
    })
}