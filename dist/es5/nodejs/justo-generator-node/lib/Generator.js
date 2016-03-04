"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _get = function get(object, property, receiver) {if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {return get(parent, property, receiver);}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}};var _justoGenerator = require("justo-generator");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);









  function _class(opts, responses) {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, 
    opts, responses));}_createClass(_class, [{ key: "init", value: function init() 






























    {
      _get(Object.getPrototypeOf(_class.prototype), "init", this).call(this);} }, { key: "fin", value: function fin() 





    {
      _get(Object.getPrototypeOf(_class.prototype), "fin", this).call(this);} }, { key: "prompt", value: function prompt(





    answers) {
      this.input({ name: "desc", title: "Project description" });
      this.input({ name: "homepage", title: "Project homepage" });

      if (this.input({ name: "author", title: "Author name" })) {
        this.input({ name: "authorEmail", title: "Author email" });
        this.input({ name: "authorUrl", title: "Author homepage" });}


      this.list({ name: "type", choices: ["app", "lib"] });
      this.input({ name: "gitUrl", title: "Git URL" });

      if (this.confirm({ name: "bugs", title: "Would you like to configure bugs info?" })) {
        this.input({ name: "bugsUrl", title: "  Bugs URL" });
        this.input({ name: "bugsEmail", title: "  Bugs email" });}


      this.input({ name: "npmWho", title: "NPM username for publishing" });} }, { key: "generate", value: function generate(





    answers) {
      this.copy("_editorconfig", ".editorconfig");
      this.copy("_gitignore", ".gitignore");
      this.copy("_jshintrc", ".jshintrc");
      this.template("_package.json", "package.json", answers);
      this.copy("_travis.yml", ".travis.yml");
      this.copy("index.js");
      this.template("Justo.js", answers);
      this.copy("Justo.json");
      this.template("README.md", answers);
      this.mkdir("lib");
      this.mkdir("test/unit/data");
      this.mkdir("test/unit/lib");
      this.template("test/unit/index.js");
      this.mkdirIf(answers.type == "app", "bin");} }, { key: "help", get: function get() {return { desc: "Generator for Node.js.", params: { type: "Software type: 'app' or 'lib'.", author: "The author name.", authorEmail: "The author email.", authorUrl: "The author URL.", homepage: "The project homepage.", npmWho: "The NPM user to use for publishing.", desc: "The software description.", gitUrl: "The Git repository URL.", bugs: "Configure bugs: 'true' or 'false'.", bugsUrl: "The bugs URL.", bugsEmail: "The bugs email." }, commands: {} };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;