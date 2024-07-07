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
    
            // Parse request body for expense data
            const { date, description, amount } = req.body;
    
            // Create new expense object
            const newExpense = new Expense({
                userId,
                date: new Date(date), // Convert date string to Date object
                description,
                amount,
            });
    
            // Save the new expense to MongoDB
            const savedExpense = await newExpense.save();
    
            res.status(201).json({ success: true, data: savedExpense });
        });
  
        
      } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ success: false, error: 'Error adding expense' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  