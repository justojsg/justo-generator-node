//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const copy = require("justo-plugin-fs").copy;
const clean = require("justo-plugin-fs").clean;
const jslint = require("justo-plugin-eslint");
const jsonlint = require("justo-plugin-jsonlint");
const publish = require("justo-plugin-npm").publish;
const install = require("justo-plugin-npm").install;

//catalog
const lint = catalog.workflow({name: "lint", desc: "Parse code."}, function() {
  jsonlint("JSON: .json files", {
    output: true,
    src: ["package.json"]
  });

  jslint("JavaScript: Best practices and grammar", {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      "lib/",
      "test/unit/index.js",
      "test/unit/lib/"
    ]
  });
});

catalog.workflow({name: "build", desc: "Build the package"}, function() {
  lint("Best practices and grammar");

  clean("Remove build directory", {
    dirs: ["build/es5"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/lib"}
    ]
  });

  clean("Remove dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/justo-generator-node/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/justo-generator-node/lib"
    },
    {
      src: ["package.json", "README.md", "template/"],
      dst: "dist/es5/nodejs/justo-generator-node/"
    }
  );
});

catalog.macro({name: "test", desc: "Unit testing"}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  publish("Publish in NPM", {
    who: "justojs",
    src: "dist/es5/nodejs/justo-generator-node"
  });
});

catalog.workflow({name: "install", desc: "Install the generator to test."}, function() {
  install("Install", {
    pkg: "dist/es5/nodejs/justo-generator-node/",
    global: true
  });
});

catalog.macro({name: "default", desc: "Build and test."}, ["build", "test"]);
