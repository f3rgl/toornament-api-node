var rest = require('restler');
var request = require("request");
var prompt = require('prompt');
var csv_parse = require('csv-parse');
var config = require('./config.js');
var fs = require('fs');


var dateOfRun = new Date();
var outputFile = "../results/result_" + dateOfRun + ".csv";
var stream = fs.createWriteStream(outputFile);

prompt.start();

startProcess();


function getDisciplines(){

    rest.post('https://' + config.api.uri + '/v1/disciplines?api_key=config.api.api_key)', {
        data: "",
        headers: {"Content-type": "application/json"}
    }).on('success', function(data) {
        accessToken = JSON.parse(data).access_token;
        console.log("Success:" , data);
    }).on('fail', function(data) {
        console.log("Fail BIg Time:", data);
    });
};

function startProcess(){
    console.log("Config api = " + config.api.uri);
    console.log("Config api_key = " + config.api.api_key);
    console.log("Getting List of Disciplines");
    rest.get('https://' + config.api.uri + '/v1/disciplines?api_key=' + config.api.api_key,{
    }).on('success', function(data) {
        console.log("Success:" , data);
        getDisciplines();
    }).on('fail', function(data) {
        console.log("Fail Before:", data);
    });
};
