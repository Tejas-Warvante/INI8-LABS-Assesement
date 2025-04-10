const Registration = require('../models/registrationModel');

exports.getAll = (req, res) => {
  Registration.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { name, email, dob } = req.body;
  if (!name || !email || !dob) return res.status(400).json({ error: "All fields required" });

  Registration.create({ name, email, dob }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User created", id: result.insertId });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { name, email, dob } = req.body;
  Registration.update(id, { name, email, dob }, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User updated" });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Registration.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
};
