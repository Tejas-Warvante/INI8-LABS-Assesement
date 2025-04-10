const db = require('../config/db');

const Registration = {
  getAll: (callback) => {
    db.query('SELECT * FROM Registration', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM Registration WHERE id = ?', [id], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO Registration SET ?', data, callback);
  },
  update: (id, data, callback) => {
    db.query('UPDATE Registration SET ? WHERE id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM Registration WHERE id = ?', [id], callback);
  }
};

module.exports = Registration;
