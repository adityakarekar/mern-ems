const express = require("express");
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create new employee
router.post("/", authMiddleware, async (req, res) => {
  const { name, position, department, salary } = req.body;
  try {
    const employee = new Employee({
      name,
      position,
      department,
      salary,
      createdBy: req.user,
    });
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all employees
router.get("/", authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find({ createdBy: req.user });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update employee
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete employee
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
