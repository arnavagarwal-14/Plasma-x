const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// parse application/json
app.use(bodyParser.urlencoded({extended: true}));

//Create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1234",
	database: "plasmabankdb",
});

conn.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("MYSQL connected");
    }
})

//for donors
app.get("/donor", (req, res) => {
	let sql = "SELECT * FROM donor";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

app.post("/donor", (req, res) => {
	let data = { age: req.body.age, d_name: req.body.dname, 
		d_phone: req.body.dphone, d_gender: req.body.dgender, 
		d_address: req.body.daddress, d_bloodgrp: req.body.dbloodgroup, 
		d_email: req.body.demail};
	let sql = "INSERT INTO donor SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

app.get("/donor/:bloodgroup", (req, res) => {
	let sql = "SELECT * FROM donor WHERE d_bloodgrp=" + req.params.bloodgroup + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

app.get("/donor/:city", (req, res) => {
	let sql = "SELECT * FROM donor WHERE d_address=" + req.params.city + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

app.delete("/donor/:id", (req, res) => {
	let sql = "DELETE FROM donor WHERE d_code=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});

//for patients
app.get("/patient", (req, res) => {
	let sql = "SELECT * FROM patient";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

app.post("/patient", (req, res) => {
	let data = { p_age: req.body.page, p_name: req.body.pname, 
		p_phone: req.body.pphone, p_gender: req.body.pgender, 
		p_city: req.body.paddress, p_bloodgrp: req.body.pbloodgroup, 
		p_email: req.body.pemail};
	let sql = "INSERT INTO patient SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

app.get("/patient/:bloodgroup", (req, res) => {
	let sql = "SELECT * FROM patient WHERE p_bloodgrp=" + req.params.bloodgroup + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

app.delete("/patient/:id", (req, res) => {
	let sql = "DELETE FROM patient WHERE p_id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});

//for volunteers
app.get("/volunteer", (req, res) => {
	let sql = "SELECT * FROM volunteer";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

app.post("/volunteer", (req, res) => {
	let data = { v_age: req.body.vage, v_name: req.body.vname, 
		v_phone: req.body.vphone, v_gender: req.body.vgender, 
		v_city: req.body.vaddress, v_email: req.body.vemail};
	let sql = "INSERT INTO volunteer SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

app.get("/volunteer/:city", (req, res) => {
	let sql = "SELECT * FROM volunteer WHERE v_city=" + req.params.city + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

app.delete("/volunteer/:id", (req, res) => {
	let sql = "DELETE FROM volunteer WHERE v_id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});


app.listen(8000, () => {
	console.log("server started on port 8000...");
});