import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // Validate environment variable
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      console.error("CLERK_WEBHOOK_SECRET is not set");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Debug: Log all headers
    console.log("=== ALL HEADERS ===");
    console.log(JSON.stringify(req.headers, null, 2));
    console.log("==================");

    // Get headers (try both formats)
    const svix_id = req.headers["svix-id"] || req.headers["svix_id"];
    const svix_timestamp = req.headers["svix-timestamp"] || req.headers["svix_timestamp"];
    const svix_signature = req.headers["svix-signature"] || req.headers["svix_signature"];

    console.log("Extracted headers:", { svix_id, svix_timestamp, svix_signature });

    // Validate headers
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("Missing svix headers", {
        svix_id: !!svix_id,
        svix_timestamp: !!svix_timestamp,
        svix_signature: !!svix_signature,
        availableHeaders: Object.keys(req.headers)
      });
      return res.status(400).json({ success: false, message: "Missing webhook headers" });
    }

    // Convert body to string if it's a Buffer (for raw body middleware)
    const body = Buffer.isBuffer(req.body) ? req.body.toString() : JSON.stringify(req.body);

    // Verify signature and get event
    const evt = whook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    });

    const { data, type } = evt;

    console.log(`Webhook received: ${type}`);

    switch (type) {
      case 'user.created': {
        // The user data is directly in 'data', not nested
        // Validate required data
        if (!data.id || !data.email_addresses?.[0]?.email_address) {
          console.error("Missing required user data", { 
            hasId: !!data.id, 
            hasEmail: !!data.email_addresses?.[0]?.email_address,
            dataKeys: Object.keys(data)
          });
          return res.status(400).json({ success: false, message: "Invalid user data" });
        }

        const userToCreate = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Unknown User',
          image: data.profile_image_url || data.image_url || '',
          resume: ''
        };
        
        await User.create(userToCreate);
        console.log("User created successfully:", userToCreate._id);
        return res.status(201).json({ success: true, message: "User created successfully" });
      }

      case 'user.updated': {
        // The user data is directly in 'data', not nested
        if (!data.id) {
          console.error("Missing user ID for update");
          return res.status(400).json({ success: false, message: "Missing user ID" });
        }

        const updateData = {};
        
        if (data.email_addresses?.[0]?.email_address) {
          updateData.email = data.email_addresses[0].email_address;
        }
        
        if (data.first_name || data.last_name) {
          updateData.name = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        }
        
        if (data.profile_image_url !== undefined || data.image_url !== undefined) {
          updateData.image = data.profile_image_url || data.image_url || '';
        }

        // Only update if there's data to update
        if (Object.keys(updateData).length > 0) {
          await User.findByIdAndUpdate(data.id, updateData, { new: true });
          console.log("User updated successfully:", data.id);
        }
        
        return res.status(200).json({ success: true, message: "User updated successfully" });
      }

      case 'user.deleted': {
        // The user data is directly in 'data', not nested
        if (!data.id) {
          console.error("Missing user ID for deletion");
          return res.status(400).json({ success: false, message: "Missing user ID" });
        }

        await User.findByIdAndDelete(data.id);
        console.log("User deleted successfully:", data.id);
        return res.status(200).json({ success: true, message: "User deleted successfully" });
      }

      default:
        console.log(`Unhandled event type: ${type}`);
        return res.status(200).json({ success: true, message: "Event received but not processed" });
    }

  } catch (error) {
    console.error("Webhook error:", error);
    
    // Handle specific Svix errors
    if (error.name === 'WebhookVerificationError') {
      return res.status(400).json({ success: false, message: "Invalid webhook signature" });
    }
    
    // Handle database errors
    if (error.name === 'MongoError' || error.name === 'ValidationError') {
      return res.status(500).json({ success: false, message: "Database error" });
    }
    
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};