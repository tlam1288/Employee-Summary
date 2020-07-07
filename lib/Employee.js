// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getName() {
    if (this.name) {
      return this.name;
    }
  }
}

module.exports = Employee;
