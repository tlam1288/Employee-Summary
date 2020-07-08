const fs = require("fs");
const util = require("util");
const path = require("path");
const inquirer = require("inquirer");
const render = require("./htmlRenderer");
const Employee = require("./Employee");
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
    //this.menu();
  }

  createManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the manager's name?",
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the manager's ID?",
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the manager's Email?",
        },
        {
          type: "input",
          name: "managerNum",
          message: "What is the manager's office number?",
        },
      ])
      .then((answers) => {
        const newManager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerNum
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
          message: "Do you want to add more team members?",
          choices: ["Yes", "No", "Quit"],
          default: "Yes",
        },
      ])
      .then((answers) => {
        switch (answers.choice) {
          case "Yes":
            return this.createMember();
          case "No":
            return this.generateHtml();
          default:
            console.log("good bye!");
            process.exit(0);
        }
      });
  }

  createMember() {
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
