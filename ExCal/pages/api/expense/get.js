import connectToDatabase from '@/utilities/mongoose';
import authMiddleware from '@/utilities/middleware/authMiddleware';
import Expense from '@/models/Expense';
import User from '@/models/User';


export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Apply the auth middleware to extract user information
        await authMiddleware(req, res, async ()=>{
            // Extract user ID from the request data (decoded from token)
            const userId = req.data.user.id;

            // Connect to MongoDB
            await connectToDatabase();

            // Fetch user data from the database using the userId
            const user = await User.findById(userId);
            if (!user) {
              return res.status(404).json({ success: false, message: 'User not found' });
            }
    
            // Fetch expenses data from the database using the userId
            const expenses = await Expense.find({ userId });
            if (!expenses) {
                return res.status(404).json({ success: false, message: 'Expenses not found' });
            }

            res.status(200).json({ success: true, expenses });
        });
  
        
      } catch (error) {
        console.error('Error getting expenses:', error);
        res.status(500).json({ success: false, error: 'Error getting expenses' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  