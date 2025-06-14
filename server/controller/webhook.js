import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebooks = async (req , res) => {
  try {
    //this is clerk svix instance with webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = whook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });
//creating data from req.body
    const { data, type } = req.body
    
    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ''
        };
        await User.create(userData);
        console.log("User created:", userData);
        return res.status(201).json({ success: true });
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("User updated:", data.id);
        return res.json({ success: true });
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        console.log("User deleted:", data.id);
        return res.json({ success: true });
      }

      default:
        return res.status(400).json({ success: false, message: "Unknown event type" });
    }

  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).json({ success: false, message: "Webhook error present" });
  }
}
