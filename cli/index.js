#!/usr/bin/env node

var minimist = require("minimist");
var fs = require("fs");
var path = require("path");
var _ = require("underscore");

var FOLDER = "./mongrations"

// Main Processing
// ---------------

var args = minimist(process.argv.slice(2));

if (args._.length > 0) {
  createMigration(args);
} else {
  runMigrations();
}

function isJSFile(file){
  var index = file.indexOf(".js");
  var location = file.length - 3;
  return (index === location)
}

function runMigrations(){
  var folder = path.join(FOLDER, "/");

  var migrations = [];

  var cwd = path.join(process.cwd(), "/");

  fs.readdirSync(folder).forEach(function(file){
    if (!isJSFile(file)){ return; }

    var migration = require(path.join(cwd, folder, file));
    migrations.push(migration);
  });

  var connector = require(path.join(cwd, "mongrate.js"));

  connector.connect(function(){
    doMigration(migrations);
  });
}

function doMigration(migrations){
  var migration = migrations.pop();
  if (!migration) { return; }

  migration.migrate(function(err){
    if (err) { throw err; }

    doMigration(migrations);
  });
}

function createMigration(args){
  var timestamp = Date.now();
  var slug = getSlug(args._.join(" "));
  var descriptor = timestamp.toString() + "-" + slug;
  var filename = descriptor + ".js";

  var exists = fs.existsSync(FOLDER);
  if (!exists) {
    fs.mkdirSync(FOLDER);
  }
  
  var fileContent = "var Mongrate = require('mongrate');\r\nvar migration = new Mongrate.Migration('" + descriptor + "');\r\n";

  fs.writeFile(FOLDER + "/" + filename, fileContent, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Migration created at:", FOLDER + "/" + filename);
    }
  }); 
}

function getSlug(str){
  return str.replace(/[^0-9a-zA-Z\.\-]+/g, "-");
}
