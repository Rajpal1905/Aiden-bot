const app = require('./app')
const appRouter = require('./src/routes')

require('dotenv').config();

require('./src/config/dbConnection').dbConnect()

app.get('/',(req,res)=>{
     res.send('Default Route')
})
app.use("/api/v1",appRouter)
app.listen(process.env.PORT,()=>{
    console.log(`App is running on ${process.env.PORT}`)  
})  