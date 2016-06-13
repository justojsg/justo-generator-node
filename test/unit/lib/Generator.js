//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const Generator = require("../../../dist/es5/nodejs/justo-generator-node");
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;

//suite
suite("Generator", function() {
  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({});
      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST_DIR, DST;

    init("*", function() {
      DST_DIR = Dir.createTmpDir();
      DST = DST_DIR.path;
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-node/template", dst: DST}, {});
    });

    fin("*", function() {
      DST_DIR.remove();
    });

    test("generate(answers) - lib", function() {
      gen.generate({type: "lib"});

      file(DST, ".editorconfig").must.exist();
      file(DST, ".gitignore").must.exist();
      file(DST, ".jshintrc").must.exist();
      file(DST, ".travis.yml").must.exist();
      file(DST, "index.js").must.exist();
      file(DST, "Justo.js").must.exist();
      file(DST, "Justo.json").must.exist();
      file(DST, "package.json").must.exist();
      file(DST, "README.md").must.exist();
      dir(DST, "test/unit/data").must.exist();
      dir(DST, "test/unit/lib").must.exist();
      file(DST, "test/unit/index.js").must.exist();
      dir(DST, "bin").must.not.exist();
    });

    test("generate(answers) - app", function() {
      gen.generate({type: "app", bin: "test.js"});

      file(DST, ".editorconfig").must.exist();
      file(DST, ".gitignore").must.exist();
      file(DST, ".jshintrc").must.exist();
      file(DST, ".travis.yml").must.exist();
      file(DST, "index.js").must.exist();
      file(DST, "Justo.js").must.exist();
      file(DST, "Justo.json").must.exist();
      file(DST, "package.json").must.exist();
      file(DST, "README.md").must.exist();
      dir(DST, "bin").must.exist();
      file(DST, "bin/test.js").must.exist();
      dir(DST, "test/unit/data").must.exist();
      dir(DST, "test/unit/lib").must.exist();
      file(DST, "test/unit/index.js").must.exist();
      dir(DST, "bin").must.exist();
    });
  });
})();
