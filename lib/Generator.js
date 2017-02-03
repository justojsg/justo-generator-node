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
      author: "Author name",
      authorEmail: "Author email",
      authorUrl: "Author homepage",
      bin: {
        title: "App command name",
        default: path.basename(process.cwd())
      },
      bugsUrl: "Bugs URL",
      bugsEmail: "Bugs email",
      ci: {
        title: "Continuous integration",
        options: ["<none>", "Bitbucket Pipelines", "Travis CI"]
      },
      contributor: "Contributor name",
      contributorEmail: "Contributor email",
      contributorUrl: "Contributor homepage",
      davidDm: "David DM",
      desc: "Project description",
      homepage: "Project homepage",
      gitUrl: "Git URL",
      jsSpec: {
        title: "JavaScript spec to use",
        options: ["ES2015", "ES2016", "ES2017"],
        default: "ES2015"
      },
      linter: {
        title: "Linter",
        options: ["<none>", "ESLint", "JSHint"],
        default: "ESLint"
      },
      name: {
        title: "Name",
        default: path.basename(process.cwd())
      },
      npmWho: "NPM user to use for publishing",
      type: {
        title: "Package type",
        options: ["app", "lib"]
      }
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
      if (!this.responses.overwrite) return "Destination dir is not empty.";
    }
  }

  /**
   * @override
   */
  prompt(answers) {
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
        case "Bitbucket Pipelines": {
          break;
        }

        case "Travis CI": {
          let re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;

          if (re.test("gitUrl")) {
            this.input({name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1]});
            this.input({name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1]});
          }
          break;
        }

        //no default
      }
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
    if (answers.ci == "Travis CI") this.copy("_travis.yml", ".travis.yml");
    else if (answers.ci == "Bitbucket Pipelines") this.copy("bitbucket-pipelines.yml");
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
