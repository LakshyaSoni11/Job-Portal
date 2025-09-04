import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controller/webhook.js';
import companyRoute from "./routes/companyRoutes.js"
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'

//initiallized Express to connect with the server
const app = express();

// Connect to database
await connectDB();
await connectCloudinary();//run this whenever server runs
// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// 👉 CRITICAL: Webhook route MUST come before express.json() middleware
app.use('/webhooks', express.raw({ type: 'application/json' }));
app.post('/webhooks', clerkWebhooks);

// Use JSON middleware for other routes (after webhook routes)
app.use(express.json());
//now we will et the user data whenever their will be login request from he frontendthrough user
app.use(clerkMiddleware())
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5173'],
  credentials: true
}));
app.get('/', (req, res) => {
  res.send("App is working properly");
});

app.get('/debug-sentry', function santryHandler(req, res) {
  throw new Error("First Sentry error");
});
//endpoints
app.use('/api/company',companyRoute)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log('App is running on port', PORT);
});