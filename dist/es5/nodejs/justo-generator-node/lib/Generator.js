"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _justoGenerator = require("justo-generator");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));}_createClass(_class, [{ key: "preprompt", value: function preprompt()




















































    {
      var entries = this.getEntryNames(".").sort();

      if (!(entries.length === 0 ||
      entries.length == 1 && entries[0] == ".git" ||
      entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md"))
      {
        return "Destination dir is not empty.";
      }
    } }, { key: "prompt", value: function prompt(




    answers) {
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

      if (this.list("type") == "app") this.input("bin");
      this.list("jsSpec");
      this.list("linter");

      if (this.input("gitUrl")) {
        var re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;
        this.input({ name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1] });
        this.input({ name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1] });
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
      this.copy("_travis.yml", ".travis.yml");
      this.copy("index.js");
      this.template("Justo.js", answers);
      this.template("README.md", answers);
      if (answers.type == "app") {
        this.mkdir("bin");
        this.copy("bin/script.js", answers.bin);
      }
      this.mkdir("lib");
      this.mkdir("test/unit/data");
      this.mkdir("test/unit/lib");
      this.template("test/unit/index.js");
      this.mkdirIf(answers.type == "app", "bin");
    } }, { key: "desc", get: function get() {return "Generator for Node.js.";} }, { key: "params", get: function get() {return { type: { title: "Software type", choices: ["app", "lib"] }, bin: "App/bin script name", author: "Author name", authorEmail: "Author email", authorUrl: "Author homepage", contributor: "Contributor name", contributorEmail: "Contributor email", contributorUrl: "Contributor homepage", homepage: "Project homepage", desc: "Project description", jsSpec: { title: "JavaScript spec to use", choices: ["ES2015", "ES2016", "ES2017"], default: "ES2015" }, linter: { title: "Linter", choices: ["<none>", "ESLint", "JSHint"], default: "ESLint" }, npmWho: "NPM user to use for publishing", gitUrl: "Git URL", travisCi: "Travis CI", davidDm: "David DM", bugsUrl: "Bugs URL", bugsEmail: "Bugs email" };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;