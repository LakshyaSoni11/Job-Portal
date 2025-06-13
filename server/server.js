import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebooks } from './controller/webhook.js'

const app = express()

await connectDB()

app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("app is working properly")
})
app.get('/debug-sentry' , function santryHandler(req,res){
    throw new Error("first sentry error");
    
})

app.post('/webhooks',clerkWebooks)

const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);
app.listen(PORT,()=>{
    console.log('app is running on port ',PORT)
})