const mongoose = require("mongoose");
const Budget = require("../models/budget");
const Expense = require("../models/expense");

// const budgetCreate = (req, res) => {
//   const budget = req.body;
//   const newBudget = new Budget(budget);
//   newBudget
//     .save()
//     .then(budget => {
//       if (!budget) throw new Error("No budget created");
//       res.status(201).json({ message: "Budget created successfully" });
//     })
//     .catch(error => {
//       res.status(422).json({ error: error.message });
//     });
// };

// async and await
const budgetCreate = async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    const savedBudget = await newBudget.save();
    res.status(201).json({ message: "Budget created successfully" });
  }
  catch(error) {
    res.status.json({ error: error.message });
  }
};

// const budgetDifference = (req, res) => {
//   const { id } = req.params;
//   Budget.findById(id)
//     .then(budget => {
//       if (!budget) throw new Error("No budget found");
//       Expense.aggregate([
//         {
//           $group: {
//             _id: "$budget",
//             totalExpenses: {
//               $sum: "$amount"
//             }
//           }
//         }
//       ])
//         .then(result => {
//           if (!result) throw new Error("No expense found");
//           const difference = budget.budgetAmount - result[0].totalExpenses;
//           res.status(200).json({ difference });
//         })
//         .catch(error => {
//           res.status(422).json({ error: error.message });
//         });
//     })
//     .catch(error => {
//       res.status(422).json({ error: error.message });
//     });
// };

// async and await
const budgetDifference = async (req, res) => {
  try {
    const { id } = req.params;
    const foundBudget = await Budget.findById(id);
    const foundExpenses = await Expense.aggregate([
      {
        $group: {
          _id: "$budget",
          totalExpenses: {
            $sum: "$amount"
          }
        }
      }
    ]);
    const difference = foundBudget.budgetAmount - foundExpenses[0].totalExpenses;
    res.status(200).json({ difference });
  }
  catch(error) {
    res.status(422).json({ error: error.message });
  }
};

module.exports = {
  budgetCreate,
  budgetDifference
};
