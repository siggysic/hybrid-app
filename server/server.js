var app = require('express')();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8081;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'tasks'
});

// host     : 'mysql9.000webhost.com',
// user     : 'a4950250_test',
// password : 'testtest',
// database : 'a4950250_test'

var GetAllTaskSql = "SELECT * FROM task"

var GetTaskByIdSql = "SELECT * FROM task WHERE id = ?"

var InsertTaskSql = "INSERT INTO task(name, status, level) VALUES(?, ?, ?)"

var DeleteTaskByIdSql = "DELETE FROM task WHERE id = ?"

var UpdateTaskSql = "UPDATE task SET name = ?, status = ?, level = ? WHERE id = ?"
 
app.get('/tasks', function (req, res) {
  connection.query(GetAllTaskSql, function (error, results) {
    res.send(results);
  });
});

app.get('/tasks/:taskId', function (req, res) {
  connection.query(GetTaskByIdSql, req.params.taskId, function (error, results) {
    res.send(results);
  });
});

app.delete('/tasks/:taskId', function (req, res) {
  connection.query(DeleteTaskByIdSql, req.params.taskId, function (error, results) {
    res.send(results);
  });
});

app.post('/tasks', function (req, res) {
  connection.query(InsertTaskSql, [req.body.name, req.body.status, req.body.level], function (error, results) {
    res.send(results);
  });
});

app.put('/tasks/:taskId', function (req, res) {
  connection.query(UpdateTaskSql, [req.body.name, req.body.status, req.body.level, req.params.taskId], function (error, results) {
    res.send(results);
  });
});

app.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});
 
app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

// connection.end();