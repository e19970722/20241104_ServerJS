var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var app = express();

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 連接到 SQLite 資料庫
var db = new sqlite3.Database('./MoneyNote.db', (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Connected to the MoneyNote SQLite database.');
    }
});

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
app.get('/moneynote', function(req, res) {
    console.log("GET From SERVER");
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

app.listen(6060, () => {
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