var minimist = require("minimist");
var fs = require("fs");
var _ = require("underscore");

// Main Processing
// ---------------

var args = minimist(process.argv.slice(2));

if (args._.length > 0) {
  var timestamp = Date.now();
  var slug = getSlug(args._.join(" "));
  var descriptor = timestamp.toString() + "-" + slug;
  var filename = descriptor + ".js";

  var exists = fs.existsSync("./migrations");
  if (!exists) {
    fs.mkdirSync("./migrations");
  }
  
  var fileContent = "var Mongrate = require('mongrate');\r\nvar migration = new Mongrate.Migration('" + descriptor + "');\r\n";

  fs.writeFile("./migrations/" + filename, fileContent, function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("The file was saved!");
      }
  }); 
}

function getSlug(str){
  return str.replace(/[^0-9a-zA-Z\.\-]+/g, "-");
}
