//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const Generator = require("../../dist/es5/nodejs/justo-generator-node");

//suite
suite("index", function() {
  test("Generator", function() {
    Generator.must.be.instanceOf(Function);
  });
})();
