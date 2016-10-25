//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const pkg = require("../../dist/es5/nodejs/{{dir.name}}");

//suite
suite("API", function() {
  test("ObjectName", function() {
    // pkg.must.have("objectName");
  });
})();
