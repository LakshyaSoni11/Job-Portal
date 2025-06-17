import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controller/webhook.js';

const app = express();

// Connect to database
await connectDB();

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

app.get('/', (req, res) => {
  res.send("App is working properly");
});

app.get('/debug-sentry', function santryHandler(req, res) {
  throw new Error("First Sentry error");
});

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log('App is running on port', PORT);
});