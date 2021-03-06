"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _justoGenerator = require("justo-generator");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));}_createClass(_class, [{ key: "preprompt", value: function preprompt()






























































    {
      var entries = this.getEntryNames(".").sort();

      if (!(entries.length === 0 ||
      entries.length == 1 && entries[0] == ".git" ||
      entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md"))
      {
        if (!this.responses.overwrite) return "Destination dir is not empty.";
      }
    } }, { key: "prompt", value: function prompt(




    answers) {
      this.input("name");
      this.input("desc");
      this.input("homepage");

      if (this.input("author")) {
        this.input("authorEmail");
        this.input("authorUrl");
      }

      if (this.input("contributor")) {
        this.input("contributorEmail");
        this.input("contributorUrl");
      }

      if (this.select("type") == "app") this.input("bin");

      this.select("jsSpec");
      this.select("linter");

      if (this.input("gitUrl")) {
        switch (this.select("ci")) {
          case "Bitbucket Pipelines":{
              break;
            }

          case "Travis CI":{
              var re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;

              if (re.test("gitUrl")) {
                this.input({ name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1] });
                this.input({ name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1] });
              }
              break;
            }}



      }

      if (this.input("bugsUrl")) this.input("bugsEmail");
      this.input("npmWho");
    } }, { key: "generate", value: function generate(




    answers) {
      this.copy("_editorconfig", ".editorconfig");
      this.copy("_gitignore", ".gitignore");
      if (answers.linter == "JSHint") {
        this.copy("_jshintrc", ".jshintrc");
      } else if (answers.linter == "ESLint") {
        this.copy("_eslintrc", ".eslintrc");
        this.copy("_eslintignore", ".eslintignore");
      }
      this.template("_package.json", "package.json", answers);
      if (answers.ci == "Travis CI") this.copy("_travis.yml", ".travis.yml");else
      if (answers.ci == "Bitbucket Pipelines") this.copy("bitbucket-pipelines.yml");
      this.copy("index.js");
      this.template("Justo.js", answers);
      this.template("README.md", answers);
      if (answers.type == "app") {
        this.mkdir("bin");
        this.copy("bin/script.js", answers.bin + ".js");
      }
      this.mkdir("lib");
      this.mkdir("test/unit/data");
      this.mkdir("test/unit/lib");
      this.template("test/unit/index.js");
      this.mkdirIf(answers.type == "app", "bin");
    } }, { key: "desc", get: function get() {return "Generator for Node.js.";} }, { key: "params", get: function get() {return { author: "Author name", authorEmail: "Author email", authorUrl: "Author homepage", bin: { title: "App command name", default: _path2.default.basename(process.cwd()) }, bugsUrl: "Bugs URL", bugsEmail: "Bugs email", ci: { title: "Continuous integration", options: ["<none>", "Bitbucket Pipelines", "Travis CI"] }, contributor: "Contributor name", contributorEmail: "Contributor email", contributorUrl: "Contributor homepage", davidDm: "David DM", desc: "Project description", homepage: "Project homepage", gitUrl: "Git URL", jsSpec: { title: "JavaScript spec to use", options: ["ES2015", "ES2016", "ES2017"], default: "ES2015" }, linter: { title: "Linter", options: ["<none>", "ESLint", "JSHint"], default: "ESLint" }, name: { title: "Name", default: _path2.default.basename(process.cwd()) }, npmWho: "NPM user to use for publishing", type: { title: "Package type", options: ["app", "lib"] } };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;