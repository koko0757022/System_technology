var express = require('express');
var app = express();
var fs = require('fs');


mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
})
connection.connect();

var count = 1
r={};
r.type='T';
r.device='102';
r.unit='0';
r.ip="10.42.0.187";
r.seq = count;
r.value=10.25;
var tempvalue = 0;



app.get("/20145331", function(req, res) {
  fs.appendFile('abc',JSON.stringify(req.query)+"\n", function(err) {

   count = count +1;
   r.seq = count;
   r.value = parseFloat(req.query.tmp);  
   if(err) {
        return console.log(err);

    }
    console.log("The file was saved!");
  });


  //console.log("param=" + typeof parseFloat(req.query.tmp));
  


  var qstr = 'select * from sensors where time > date_sub(now(), INTERVAL 1 DAY) ';
  connection.query(qstr, function(err, rows, cols) {
    if (err) {
      throw err;
      res.send('query error: '+ qstr);
      return;
    }
    

   // console.log("Got "+ rows.length +" records");
    var html = "<!doctype html><html><body>";
    html += "<H1> Sensor Data for Last 24 Hours</H1>";
    html += "<table border=1 cellpadding=3 cellspacing=0>";
    html += "<tr><td>Seq#<td>Time Stamp<td>Temperature";

    for (var i=0; i< 15 /*rows.length*/; i++) {
       html += "<tr><td>"+rows[i].seq+"<td>"+rows[i].time+"<td>"+rows[i].value;
    }

    
    html += "</table>";
    html += "</body></html>";
    res.send(html);
  });
   
 var query = connection.query('insert into sensors set ?', r, function(err, rows, cols) {
    console.log("-----database save-----");
});


});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
