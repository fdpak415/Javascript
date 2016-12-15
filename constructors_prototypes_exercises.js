var Cat = function(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function() {
  console.log(this.owner + ' loves ' + this.name);
}

Cat.prototype.cuteStatement = function() {
  console.log("everyone loves" + this.name);
}

Cat.prototype.meow = function() {
  console.log(this.name + " meows");
}

let Frank = new Cat("Frank", "Angela");
let Ellie = new Cat("Ellie", "Frank");

Frank.cuteStatement();

Ellie.cuteStatement();

Frank.meow();

Frank.meow = function() {
  console.log("Frank directly meows");
}

Frank.meow();
Ellie.meow();

// --------------------------------------------
// Students and Courses

function Student(fname, lname) {
  this.fname = fname;
  this.lname = lname;
  this.courses = [];
}

Student.prototype.name = function() {
  console.log(this.fname + ' ' + this.lname);
}

Student.prototype.courses = function() {
  console.log(this.courses);
}

Student.prototype.enroll = function(course) {
  if(this.courses.includes(course) === false) {
    this.courses.push(course);
    course.addStudent(this);
}

// should return a hash of departments to # of credits the student is taking in that department.
Student.prototype.courseLoad = function() {
  const courseLoad = {};
  this.courses.forEach(course => {
    let dpt = course.department;
    courseLoad[dpt] = courseLoad[dpt] || 0;
    courseLoad[dpt] += course.credits;
  });
  return courseLoad;
}

function Course(coursename, department, credits, days, timeblock) {
  this.coursename = coursename;
  this.department = department;
  this.credits = credits;
  this.days = days;
  this.timeblock = timeblock;
  this.students = [];
}

Course.prototype.students = function() {
  console.log(this.students);
}

Course.prototype.addStudent = function(student) {
  if (this.students.includes(student) === false) {
    this.students.push(student);
    student.prototype.enroll(this);
  }
}

Course.prototype.conflictsWith = function(course2) {
  if (this.block !== other.block) { return false; }
  return this.days.some(day => other.days.indexOf(day) !== -1 );
}
