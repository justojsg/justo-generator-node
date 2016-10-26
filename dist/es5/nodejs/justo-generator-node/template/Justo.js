//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const copy = require("justo-plugin-fs").copy;
const clean = require("justo-plugin-fs").clean;
{{#if (eq scope.linter "ESLint")}}
const jslint = require("justo-plugin-eslint");
{{else if (eq scope.linter "JSHint")}}
const jslint = require("justo-plugin-jshint");
{{/if}}
const npm = require("justo-plugin-npm");

//catalog
catalog.workflow({name: "build", desc: "Build the package"}, function() {
  clean("Remove build directory", {
    dirs: ["build/es5"]
  });

  jslint("Best practices and grammar", {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      {{#if (eq scope.type "app")}}
      "bin/",
      {{/if}}
      "lib/",
      "test/unit/index.js",
      "test/unit/lib/"
    ]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "{{lowercase scope.jsSpec}}",
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
      dst: "dist/es5/nodejs/{{dir.name}}/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/{{dir.name}}/lib",
      force: true
    },
    {{#if (eq scope.type "app")}}
    {
      src: "bin/",
      dst: "dist/es5/nodejs/{{dir.name}}/bin"
    },
    {{/if}}
    {
      src: ["package.json", "README.md"],
      dst: "dist/es5/nodejs/{{dir.name}}/"
    }
  );
});

catalog.macro({name: "test", desc: "Unit testing"}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  npm.publish("Publish in NPM", {
    {{#if scope.npmWho}}
    who: "{{scope.npmWho}}",
    {{/if}}
    src: "dist/es5/nodejs/{{dir.name}}/"
  });
});

catalog.workflow({name: "install", desc: "Install globally."}, function() {
  npm.install("Install globally", {
    pkg: "dist/es5/nodejs/{{dir.name}}/",
    global: true
  });
});

catalog.macro({name: "default", desc: "Default task."}, ["build", "test"]);
