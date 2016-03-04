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
         desc: "The software description.",
         gitUrl: "The Git repository URL.",
         bugs: "Configure bugs: 'true' or 'false'.",
         bugsUrl: "The bugs URL.",
         bugsEmail: "The bugs email."
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
    this.input({name: "desc", title: "Project description"});
    this.input({name: "homepage", title: "Project homepage"});

    if (this.input({name: "author", title: "Author name"})) {
      this.input({name: "authorEmail", title: "Author email"});
      this.input({name: "authorUrl", title: "Author homepage"});
    }

    this.list({name: "type", choices: ["app", "lib"]});
    this.input({name: "gitUrl", title: "Git URL"});

    if (this.confirm({name: "bugs", title: "Would you like to configure bugs info?"})) {
      this.input({name: "bugsUrl", title: "  Bugs URL"});
      this.input({name: "bugsEmail", title: "  Bugs email"});
    }

    this.input({name: "npmWho", title: "NPM username for publishing"});
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
