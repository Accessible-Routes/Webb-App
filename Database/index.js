// Entry Point of the API Server

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// global middleware
app.use(cors());


/* Creates an Express application.
The express() function is a top-level
function exported by the express module.
*/
const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'networkmon',
	host: 'psql',
	database: 'rim',
	password: 'temp',
	dialect: 'postgres',
	port: 5432
});


/* To handle the HTTP Methods Body Parser
is used, Generally used to extract the
entire body portion of an incoming
request stream and exposes it on req.body
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


pool.connect((err, client, release) => {
	if (err) {
		throw new Error();
		return console.error(
			'Error acquiring client', err.stack)

	}
	client.query('SELECT NOW()', (err, result) => {
		release()
		if (err) {
			return console.error(
				'Error executing query', err.stack)
		}
		console.log("Connected to Database !")
	})
})


//TODO: Query the building item for the specific passed IP, return all stats associated
app.get('/get_building', (req, res, next) => {
	//var ip = req.query.ip;
	var quer = ''
	pool.query(quer)
		.then(testData => {
			console.log(testData);
			res.send(testData.rows[0]);
		})

})

//TODO: query get all building names, RTT, last_tested date
app.get('/get_building_last', (req, res, next) => {
	var ip = req.query.ip;
	var quer = ''
	pool.query(quer)
		.then(testData => {
			console.log(testData);
			res.send(testData.rows[0]);
		})

})

app.get('/get_all', (req, res, next) => {
	var ip = req.query.ip;
	var quer = ''
	pool.query(quer)
		.then(testData => {
			console.log(testData);
			res.send(testData.rows);
		})

})

//TODO: Insert test event into test_events and update
app.get('/insert_test_event', (req, res, next) => {
	var ip = req.query.ip;
	var rtt = req.query.rtt;
	let quer = ''
	pool.query(quer)
		.then(testData => {
			console.log(testData);
			res.send(testData.command);
		})
})


// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(31415, function () {
	let host = server.address().address
	let port = server.address().port
	// Starting the Server at the port 3000
})
