const chatRouter = require('./chatRoutes');
const userRouter = require('./userRoutes');

const appRouter = require('express').Router();

appRouter.use('/user',userRouter)
appRouter.use('/chat',chatRouter)
    
module.exports = appRouter;