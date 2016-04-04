//import
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator.
 */
export default class extends HandlebarsGenerator {
  /**
   * @override
   */
  get desc() {
    return "Generator for Node.js.";
  }

  /**
   * @override
   */
   get params() {
     return {
       type: {
         title: "Software type",
         choices: ["app", "lib"]
       },
       author: "Author name",
       authorEmail: "Author email",
       authorUrl: "Author homepage",
       contributor: "Contributor name",
       contributorEmail: "Contributor email",
       contributorUrl: "Contributor homepage",
       homepage: "Project homepage",
       desc: "Project description",
       npmWho: "NPM user to use for publishing",
       gitUrl: "Git URL",
       bugsUrl: "Bugs URL",
       bugsEmail: "Bugs email"
     };
   }

  /**
   * @override
   */
  init() {
    super.init();
  }

  /**
   * @override
   */
  fin() {
    super.fin();
  }

  /**
   * @override
   */
  preprompt() {
    var entries = this.getEntryNames(".").sort();

    if (!(entries.length === 0 ||
          (entries.length == 1 && entries[0] == ".git") ||
          (entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")
         )) {
      return "Destination dir is not empty.";
    }
  }

  /**
   * @override
   */
  prompt(answers) {
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

    this.list("type");
    this.input("gitUrl");
    if (this.input("bugsUrl")) this.input("bugsEmail");
    this.input("npmWho");
  }

  /**
   * @override
   */
  generate(answers) {
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
    this.mkdirIf(answers.type == "app", "bin");
  }
}
