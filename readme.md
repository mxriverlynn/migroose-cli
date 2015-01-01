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
