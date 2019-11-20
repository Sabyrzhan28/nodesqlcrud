const express = require('express')
const router = express.Router()

var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'crud'
});

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
});

router.get('/', (req, res)=>{
    res.send('From API route');
})

router.get('/test',(req, res)=>{
con.query('SELECT * from users', function(err,users) {
	if (!err){
		res.render('index.ejs',{
			data: users
		});
	}else{
		console.log('Error while performing Query.');
	}
});

})




module.exports = router;