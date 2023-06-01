import { userModel } from '../app.js';

class adminController {
  static adminInfo = async (req, res) => {
    try {
      const users = await userModel.find({});

      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const userCounts = new Map();
      let depositCountForCurrentDay = 0;
      let depositCountForCurrentMonth = 0;
      const userCountsByDay = {};

      users.forEach(user => {
        const timestamp = user._id.getTimestamp();
        const createdAt = new Date(timestamp);
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();
        const monthYear = months[month] + '-' + year;

        if (userCounts.has(monthYear)) {
          userCounts.set(monthYear, userCounts.get(monthYear) + 1);
        } else {
          userCounts.set(monthYear, 1);
        }

        // Check deposit for specific current date and day
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const currentDay = currentDate.getDate();

        if (month === currentMonth && year === currentYear && createdAt.getDate() === currentDay) {
          depositCountForCurrentDay += user.deposit;
        }

        // Check deposit for the current month
        if (month === currentMonth && year === currentYear) {
          depositCountForCurrentMonth += user.deposit;
        }

        const dayMonthYear = createdAt.getDate() + ' ' + months[month] + ' ' + year;
        if (userCountsByDay[dayMonthYear]) {
          userCountsByDay[dayMonthYear] += 1;
        } else {
          userCountsByDay[dayMonthYear] = 1;
        }
      });

      const response = [];
      months.forEach(month => {
        const year = new Date().getFullYear();
        const monthYear = month + '-' + year;
        const userCount = userCounts.get(monthYear) || 0;
        response.push({ month, userCount });
      });

      const allDays = [];
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1); // Set to the previous day
      while (currentDate.getFullYear() >= new Date().getFullYear() - 1) {
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const dayMonthYear = day + ' ' + months[month] + ' ' + year;
        const userCount = userCountsByDay[dayMonthYear] || 0;
        allDays.push({ date: dayMonthYear, userCount });
        currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
      }
      allDays.reverse(); // Reverse the array to get the dates in ascending order

      res.json({
        response,
        depositCountForCurrentDay,
        depositCountForCurrentMonth: depositCountForCurrentMonth || 0,
        userCountsByDay: allDays
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default adminController;
