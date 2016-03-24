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
       homepage: "Project homepage",
       desc: "Project description",
       npmWho: "NPM user to use for publishing",
       gitUrl: "Git URL",
       bugs: {
         title: "Configure bugs?",
         type: "Boolean"
       },
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
  prompt(answers) {
    this.input("desc");
    this.input("homepage");

    if (this.input("author")) {
      this.input("authorEmail");
      this.input("authorUrl");
    }

    this.list("type");
    this.input("gitUrl");

    if (this.confirm("bugs")) {
      this.input("bugsUrl");
      this.input("bugsEmail");
    }

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
