# Mongrate-CLI

Command line tooling for the [mongrate migration framework](https://github.com/derickbailey/mongrate).

## Get Started

You will need both [mongrate](https://github.com/derickbailey/mongrate) and
the mongrate-cli tool. Mongrate should be installed in the
project, while the cli tool should be installed globally.

```
npm install mongrate
npm install -g mongrate-cli
```

Now you can use the cli tool to generate a migration and
run migrations.

### Generate A Migration

Use the command line to generate a migration file.

```
mongrate "some example migration"
```

This will produce a `mongrations/##########-some-example-migration.js` file
where "#########" is a timestamp.

See the [mongrate docmentation](https://github.com/derickbailey/mongrate) for information on how
to write a mongrate migration script. 

### Connect Mongrate To Your MongoDB Database

Before you can run you migrations, you need to provide a
connection to your MongoDB database. This only has to be done
once per project, but it must be done before the migrations 
can run.

Create a `mongrate.js` file in your project folder, and
have it export a `connect` function. This function receives
one callback argument that you must call once your database
connection has been established.

```js
// my-project/mongrate.js

var mongoose = require("mongoose");

module.exports = {

  // provide a connection to my mongodb instance
  connect: function(cb){

    var conn = "mongodb://localhost:27017/some-database";
    mongoose.connect(conn, function(err){
      if (err) { throw err; }

      // now that i'm connected, i can tell mongrate to run
      cb();
    });

  }
};
```

Having written this connector, you can now use the mongrate
command line to run your migrations.

### Run Migrations

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
