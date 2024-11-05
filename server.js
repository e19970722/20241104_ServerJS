const express = require('express');
const app = express();
var sqlite3 = require('sqlite3').verbose();
const PORT = 4000;

var db = new sqlite3.Database('./MoneyNote.db', (err) => {
  if (err) {
    console.error('Error opening database: ' + err.message);
  } else {
    console.log('Connected to the MoneyNote SQLite database.');
  }
});

function transformData(inputArray) {
  return {
    records: inputArray.map(item => ({
      fields: {
        category: item.category,
        note: item.note,
        date: item.date,
        amount: item.amount,
        expenseIncome: item.expenseIncome
      }
    }))
  };
}

app.get('/home', (req, res) => {
  db.all('SELECT * FROM MoneyNoteTable', [], (err, rows) => {
    if (err) {
        console.error(err.message);
        res.status(500).send("Error fetching MoneyNoteTable");
    } else {       
        var formatData = transformData(rows);     
        res.send(formatData);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;