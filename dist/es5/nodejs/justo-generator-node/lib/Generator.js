"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _get = function get(object, property, receiver) {if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {return get(parent, property, receiver);}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}};
var _justoGenerator = require("justo-generator");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));}_createClass(_class, [{ key: "init", value: function init() 








































    {
      _get(Object.getPrototypeOf(_class.prototype), "init", this).call(this);} }, { key: "fin", value: function fin() 





    {
      _get(Object.getPrototypeOf(_class.prototype), "fin", this).call(this);} }, { key: "prompt", value: function prompt(





    answers) {
      this.input("desc");
      this.input("homepage");

      if (this.input("author")) {
        this.input("authorEmail");
        this.input("authorUrl");}


      this.list("type");
      this.input("gitUrl");

      if (this.confirm("bugs")) {
        this.input("bugsUrl");
        this.input("bugsEmail");}


      this.input("npmWho");} }, { key: "generate", value: function generate(





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
      this.mkdirIf(answers.type == "app", "bin");} }, { key: "desc", get: function get() {return "Generator for Node.js.";} }, { key: "params", get: function get() {return { type: { title: "Software type", choices: ["app", "lib"] }, author: "Author name", authorEmail: "Author email", authorUrl: "Author homepage", homepage: "Project homepage", desc: "Project description", npmWho: "NPM user to use for publishing", gitUrl: "Git URL", bugs: { title: "Configure bugs?", type: "Boolean" }, bugsUrl: "Bugs URL", bugsEmail: "Bugs email" };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;