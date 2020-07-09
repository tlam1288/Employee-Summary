const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getRole() {
    if (this.name && this.id && this.email && this.officeNumber) {
      return "Manager";
    }
  }
  getOfficeNumber() {
    if (this.officeNumber) {
      return this.officeNumber;
    }
  }
}

module.exports = Manager;
