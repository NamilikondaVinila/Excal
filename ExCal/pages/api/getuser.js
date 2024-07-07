import User from '@/models/User';
import authMiddleware from '../../utilities/middleware/authMiddleware';
import connectToDatabase from '@/utilities/mongoose';

export const config = {
  api: {
    externalResolver: true,
  },
}


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase(); // Connect to the database

      authMiddleware(req, res, async () => {
        const userId = req.data.user.id;

        // Fetch user data from the database using the userId
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        // If user found, send the user information in the response
        return res.status(200).json({
          success: true,
          user: { id: user._id, fullName: user.fullName, email: user.email, phone: user.phone }
        });
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
