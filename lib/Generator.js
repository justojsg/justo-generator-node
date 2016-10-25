//import
import path from "path";
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
        title: "Package type",
        choices: ["app", "lib"]
      },
      bin: {
        title: "App command name",
        default: path.basename(process.cwd())
      },
      author: "Author name",
      authorEmail: "Author email",
      authorUrl: "Author homepage",
      contributor: "Contributor name",
      contributorEmail: "Contributor email",
      contributorUrl: "Contributor homepage",
      homepage: "Project homepage",
      desc: "Project description",
      jsSpec: {
        title: "JavaScript spec to use",
        choices: ["ES2015", "ES2016", "ES2017"],
        default: "ES2015"
      },
      linter: {
        title: "Linter",
        choices: ["<none>", "ESLint", "JSHint"],
        default: "ESLint"
      },
      npmWho: "NPM user to use for publishing",
      gitUrl: "Git URL",
      travisCi: "Travis CI",
      davidDm: "David DM",
      bugsUrl: "Bugs URL",
      bugsEmail: "Bugs email"
    };
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

    if (this.list("type") == "app") {
      this.input("bin");
    }

    this.list("jsSpec");
    this.list("linter");

    if (this.input("gitUrl")) {
      const re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;
      this.input({name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1]});
      this.input({name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1]});
    }

    if (this.input("bugsUrl")) this.input("bugsEmail");
    this.input("npmWho");
  }

  /**
   * @override
   */
  generate(answers) {
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
      this.copy("bin/script.js", answers.bin + ".js");
    }
    this.mkdir("lib");
    this.mkdir("test/unit/data");
    this.mkdir("test/unit/lib");
    this.template("test/unit/index.js");
    this.mkdirIf(answers.type == "app", "bin");
  }
}
