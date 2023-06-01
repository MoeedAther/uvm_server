import stripe from 'stripe';
import { userModel } from "../app.js";
import mongoose from 'mongoose';

const stripeInstance = stripe("sk_test_51N5NPnFbhi4Ic3xLxJKNMO6SPDmvh8Z00WGZxnGUYZuhinmP2kJ8WC1UoE9mqMGzOwm2MF7fZHC6vmch80EfUs0v00uVoWYdUe");

export const withdraw = async (req, res) => {
  const { amount, currency, bank_account, email } = req.body;

  try {
    // Retrieve the user's account balance from the database
    const user = await userModel.findOne({ uemail: email }).exec();
    
    if (user) {
      const accountBalance = parseFloat(user.ubalance);

      // Check if the account has sufficient funds
      if (accountBalance >= parseFloat(amount)) {
        // Calculate the tax amount
        const tax = parseFloat(amount) * 0.05;
        const transferAmount = parseFloat(amount) - tax;

        // Deduct the transfer amount and tax from the account balance
        user.ubalance = (accountBalance - parseFloat(amount)).toString();

        // Save the updated user balance
        await user.save();

        const transfer = await stripeInstance.transfers.create({
          amount: transferAmount.toFixed(2),
          currency,
          destination: bank_account,
        });

        res.json({ message: 'Transfer successful', transfer });
      } else {
        res.json({ message: 'Insufficient funds in the account' });
      }
    } else {
      res.json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error transferring funds', error });
  }
};
