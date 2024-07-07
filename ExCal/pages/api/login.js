import User from "@/models/User";
import generateToken from "@/utilities/auth/generateToken";
import connectToDatabase from "@/utilities/mongoose";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Extract email and password from the request body
      const { email, password } = req.body;

      try {
        await connectToDatabase();

        const user = await User.findOne({email: email});
        
        // Simulate user authentication (replace with actual authentication logic)
        if ( user && bcrypt.compare(password, user.password)) {
          // Authentication successful
          const token = generateToken({user: {id: user._id}},"DHIRAJ_SECRET", '1h');
          return res.status(200).json({success: true,token: token, message: 'Login successful!' });
        } else {
          // Authentication failed
          return res.status(401).json({success: false, message: 'Invalid email or password' });
        }
      } catch (error) {
        return res.status(500).json({ success: false, error: 'Error loggin in user' });
      }

      
    } else {
      return res.status(405).end(); // Method Not Allowed
    }
}