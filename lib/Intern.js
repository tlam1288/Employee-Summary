const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  getRole() {
    if (this.name && this.id && this.email && this.school) {
      return "Intern";
    }
  }
  getSchool() {
    if (this.school) {
      return this.school;
    }
  }
}

module.exports = Intern;
