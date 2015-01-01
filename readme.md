# Mongrate-CLI

Command line tooling for the [mongrate migration framework](/derickbailey/mongrate).

## Get Started

Install it globally

```
npm install -g mongrate-cli
```

### Generate A Migration

Use the command line to generate a migration file.

```
mongrate "example migration"
```

This will produce a `mongrations/##########-example-migration.js` file
where "#########" is a timestamp.

### Connection To Your MongoDB Database

To run your migrations, you need to provide a connection to 
a MongoDB instance using a `mongrate.js` file in your project.

0. create a mongrate.js file
0. export a `connect` function that opens your database connection

```js
// mongrate.js

var mongoose = require("mongoose");

module.exports = {
  connect: function(cb){
    var conn = "mongodb://localhost:27017/some-database";
    mongoose.connect(conn, function(err){
      if (err) { throw err; }
      cb();
    });
  }
};
```

Having written this complete script, you can now run the mongrate
command line to run your migrations.

### Run Migrations

See the [mongrate docmentation](/derickbailey/mongrate) for information on how
to write a mongrate migration script. 

Once you have completed your migraiton script, you can run them with the command
line.

```
mongrate
```

Specifying no parameters will tell mongrate to run all of the migration files
found in the `mongrations` folder.

### Legal Junk

Mongrate-CLI is &copy;Copyright 2015, Muted Solutions LLC.

Mongrate and Mongrate-CLI are distributable under the [MIT License](http://mutedsolutions.mit-license.org)
