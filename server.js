var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var app = express();
const PORT = 4000;


// 連接到 SQLite 資料庫
// var db = new sqlite3.Database('./MoneyNote.db', (err) => {
//     if (err) {
//         console.error('Error opening database: ' + err.message);
//     } else {
//         console.log('Connected to the MoneyNote SQLite database.');
//     }
// });

// 測試資料
let data = {
    records: [
      {
        fields: {
          category: "Food",
          note: "晚餐 （滷味）",
          date: "2024/06/14 Fri",
          amount: "130",
          expenseIncome: "Expense"
        }
      }
    ]
  };

// 設定網址GET路徑
app.get('/home', function(req, res) {
    console.log("GET From SERVER");
    // db.all('SELECT * FROM MoneyNoteTable', [], (err, rows) => {
    //     if (err) {
    //         console.error(err.message);
    //         res.status(500).send("Error fetching MoneyNoteTable");
    //     } else {       
    //         var formatData = transformData(rows);     
    //         res.send(formatData);
    //     }
    // });
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server is running on port");
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