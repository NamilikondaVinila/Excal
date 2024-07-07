// pages/api/signup.js

import User from "@/models/User";
import generateToken from "@/utilities/auth/generateToken";
import connectToDatabase from "@/utilities/mongoose";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { fullName, email, phone, password } = req.body;
      
      // Validate input fields
      if (!fullName || !email || !phone || !password) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
      }
  
      if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        return res.status(400).json({ success: false, error: 'Phone number must be a 10-digit number' });
      }
  
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ success: false, error: 'Invalid email address' });
      }
  
  
      // Add your signup logic here (e.g., save user to database)
      try {
        // Connect to MongoDB using Mongoose
        await connectToDatabase();
  
        // Create a new user document using the User model
        const newUser = new User({ fullName, email, phone, password });
  
        // Save the user document to the database
        await newUser.save();
        
        const token = generateToken({user: {id: newUser._id}},"DHIRAJ_SECRET", '1h');
        return res.status(200).json({ success: true,token: token, message: 'Signup successful' });
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ success: false, error: 'Error creating user' });
      }
      
      
    } else {
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
  }
  