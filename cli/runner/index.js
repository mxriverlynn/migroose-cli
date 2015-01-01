var fs = require("fs");
var path = require("path");

// Migration Runner
// ----------------

function Runner(cwd, migrationFolder){
  this.cwd = cwd;
  this.migrationFolder = migrationFolder;
}

// Instance Methods
// ----------------

Runner.prototype.run = function(cb){
  var migrations = this.getMigrations();
  if (migrations.length === 0){ return; }

  this.openConnection(function(){
    doMigrations(migrations, cb);
  });
};

// Private Methods
// ---------------

Runner.prototype.getMigrations = function(){
  var migrations = [];

  var folder = path.join(this.cwd, this.migrationFolder);
  fs.readdirSync(folder).forEach(function(file){
    if (!isJSFile(file)){ return; }

    var migration = require(path.join(cwd, folder, file));
    migrations.push(migration);
  });

  return migrations;
};

Runner.prototype.openConnection = function(cb){
  var mongrateFile = path.join(this.cwd, "mongrate.js");
  var connector = require(mongrateFile);
  connector.connect(cb);
};

Runner.prototype.doMigration = function(migrations, cb){
  var that = this;

  var migration = migrations.shift();
  if (!migration) { return cb(); }

  migration.migrate(function(err){
    if (err) { throw err; }

    setImmediate(function(){
      that.doMigration(migrations, cb);
    });
  });
};

// Helpers
// -------

function isJSFile(file){
  var index = file.indexOf(".js");
  var location = file.length - 3;
  return (index === location)
}

// Exports
// -------

module.exports = Runner;
