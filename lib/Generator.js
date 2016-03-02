//import
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator.
 */
export default class extends HandlebarsGenerator {
  /**
   * Constructor.
   */
  constructor(opts, responses) {
    super(opts, responses);
  }

  /**
   * @override
   */
   get help() {
     return {
       desc: "Generator for Node.js.",
       params: {
         type: "Software type: 'app' or 'lib'.",
         author: "The author name.",
         authorEmail: "The author email.",
         authorUrl: "The author URL.",
         homepage: "The project homepage.",
         npmWho: "The NPM user to use for publishing.",
         desc: "The software description."
       },
       commands: {

       }
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

  }

  /**
   * @override
   */
  generate(answers) {
    this.copy("_editorconfig", ".editorconfig");
    this.copy("_gitignore", ".gitignore");
    this.copy("_jshintrc", ".jshintrc");
    this.template("_package.json", "package.json", {
      author: answers.author,
      authorEmail: answers.authorEmail,
      authorUrl: answers.authorUrl,
      desc: answers.desc,
      homepage: answers.homepage
    });
    this.copy("_travis.yml", ".travis.yml");
    this.copy("index.js");
    this.template("Justo.js", {
      npmWho: answers.npmWho
    });
    this.copy("Justo.json");
    this.template("README.md", {
      desc: answers.desc
    });
    this.mkdir("lib");
    this.mkdir("test/unit/data");
    this.mkdir("test/unit/lib");
    this.copy("test/unit/index.js");

    if (answers.type == "app") {
      this.mkdir("bin");
    }
  }
}
