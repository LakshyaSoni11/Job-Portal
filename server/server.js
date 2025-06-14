import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebooks } from './controller/webhook.js'
import bodyParser from 'body-parser';

const app = express()
//connecting to database
await connectDB()

app.use(cors())


app.post('/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebooks);
app.use(express.json()); // Keep this after

app.get('/',(req,res)=>{
    res.send("app is working properly")
})
app.get('/debug-sentry' , function santryHandler(req,res){
    throw new Error("first sentry error");
    
})

const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);
app.listen(PORT,()=>{
    console.log('app is running on port ',PORT)
})