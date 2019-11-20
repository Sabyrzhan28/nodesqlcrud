const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes/api');
const PORT = 3000;

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api',api);

var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'crud'
});

con.connect();

app.get('/',function(req,res){
    res.send('Hello from server');
})

app.post('/add-user',function(req,res){

let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
let query = mysql.format(insertQuery,["users","name","surname","year", req.body.uname, req.body.usurname,req.body.uyear]);

con.query(query,(err, response) => {
	if(err) {
	console.error(err);
	}
	console.log("Row inserted");
});

	res.redirect('/api/test');

});

app.post('/update-user',function(req,res){

let updateQuery = 'UPDATE users SET name = ?,surname = ?,year = ? WHERE id = ?';
let query = mysql.format(updateQuery,[req.body.uname, req.body.usurname,req.body.uyear,req.body.uid]);

con.query(query,(err, response) => {
	if(err) {
	console.error(err);
	}
	console.log("Row updated");
	res.redirect('/api/test');
});


});



app.get('/delete/:id', function(req,res){
var id = req.params.id;
con.query('DELETE FROM users WHERE id = ?', id, (err, rows) => {
      res.redirect('/api/test');
});

});


app.get('/update/:id', function(req,res){

res.render('update.ejs',{
			id: req.params.id
		});

});



app.listen(PORT,function(){
    console.log('Server running on localhost:' + PORT);
})
