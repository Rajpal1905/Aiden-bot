const cookieParser = require('cookie-parser');
const express = require('express')
const cors = require('cors')

require('dotenv').config();

const app = express()
 
app.use(cors ({origin:"http://localhost:5173" , credentials:true}))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(express.json()) 

module.exports = app;