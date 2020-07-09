const fs = require("fs");
const util = require("util");
const path = require("path");
const inquirer = require("inquirer");
const render = require("./htmlRenderer");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

const writeFileAsync = util.promisify(fs.writeFile);

class CLI {
  constructor() {
    this.employee = [];
  }
  run() {
    console.log("Please add team members.");
    this.createManager();
  }

  createManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the manager's name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the manager's ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the manager's Email?",
        },
        {
          type: "input",
          name: "number",
          message: "What is the manager's office number?",
        },
      ])
      .then((answers) => {
        const newManager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.number
        );
        this.employee.push(newManager);
        this.menu();
      });
  }

  menu() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Which team member would you like to add?",
          choices: ["Intern", "Engineer", "None"],
          default: "Yes",
        },
      ])
      .then((answers) => {
        switch (answers.choice) {
          case "Intern":
            return this.createIntern();
          case "Engineer":
            return this.createEngineer();
          case "None":
            return this.generateHtml();
          default:
            console.log("good bye!");
            process.exit(0);
        }
      });
  }

  createIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is their name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is their id?",
        },
        {
          type: "input",
          name: "email",
          message: "What is their email?",
        },
        {
          type: "input",
          name: "school",
          message: "Which school did they attend?",
        },
      ])
      .then((answers) => {
        const newMember = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        this.employee.push(newMember);
        this.menu();
      });
  }

  createEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is their name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is their id?",
        },
        {
          type: "input",
          name: "email",
          message: "What is their email?",
        },
        {
          type: "input",
          name: "github",
          message: "What is their GitHub?",
        },
      ])
      .then((answers) => {
        const newEngineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        this.employee.push(newEngineer);
        this.menu();
      });
  }

  generateHtml() {
    const html = render(this.employee);
    const file = path.join(__dirname, "../output/team.html");
    writeFileAsync(file, html)
      .then(() => {
        console.log(`Created ${file}.`);
        process.exit(0);
      })
      .catch((error) => {
        console.log(error);
        console.log("Unable to create todos file. Try again.");
        process.exit(1);
      });
  }
}

module.exports = CLI;
