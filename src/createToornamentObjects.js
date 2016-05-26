var rest = require('restler');
var request = require("request");
var prompt = require('prompt');
var csv_parse = require('csv-parse');
var config = require('./config.js');
var fs = require('fs');

var accessToken;
var dateOfRun = new Date();
var outputFile = "../results/result_" + dateOfRun + ".csv";
var stream = fs.createWriteStream(outputFile);

prompt.start();

startProcess();

function getAccessToken(){

    console.log("Getting Access Token");
    console.log('https://' + config.api.uri + '/oauth/v2/token', {
        data: "{\"grant_type\": \"client_credentials\", \"client_id\": \"" + config.api.client_id + "\",\"client_secret\": \"" + config.api.client_secret + "\"}",
        headers: {"Content-type": "application/json"}})
    rest.post('https://' + config.api.uri + '/oauth/v2/token', {
        data: "{\"grant_type\": \"client_credentials\", \"client_id\": \"" + config.api.client_id + "\",\"client_secret\": \"" + config.api.client_secret + "\"}",        
        headers: {"Content-type": "application/json"}
        }).on('success', function(data) {
            console.log("Success:" , data);
        }).on('fail', function(data) {
            console.log("Failed To Get Access Token:", data);
        });
};    

function getDisciplines(){

    console.log("Getting List of Disciplines");
    rest.get('https://' + config.api.uri + '/v1/disciplines?api_key=' + config.api.api_key, {
        data: "",
        headers: {"Content-type": "application/json"}
    }).on('success', function(data) {
        console.log("Success:" , data);
    }).on('fail', function(data) {
        console.log("Failed To Get Disciplines:", data);
    });
};

function startProcess(){
    console.log("Config api = " + config.api.uri);
    console.log("Config api_key = " + config.api.api_key);
    console.log("Config client_id = " + config.api.client_id);
    console.log("Config client_secret = " + config.api.client_secret);
    getAccessToken();
//    getDisciplines();
/*
    rest.get('https://' + config.api.uri + '/v1/disciplines?api_key=' + config.api.api_key,{
    }).on('success', function(data) {
        console.log("Success - Getting Disciplines:");
        getDisciplines();
        getAccessToken();
    }).on('fail', function(data) {
        console.log("Fail Before:", data);
    });
*/
};
