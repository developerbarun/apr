var students = [];

function saveEntry() {
  var name = document.getElementById("name").value;
  var course = document.getElementById("course").value;
  var branch = document.getElementById("branch").value;
  var marks = parseInt(document.getElementById("marks").value);

  if (name && course && branch && marks && !isNaN(marks) && marks >= 0 && marks <= 500) {
    var percentage = (marks / 500) * 100;
    var grade;

    if (percentage >= 90) {
      grade = "A+";
    } else if (percentage >= 80) {
      grade = "A";
    } else if (percentage >= 70) {
      grade = "B";
    } else if (percentage >= 60) {
      grade = "C";
    } else if (percentage >= 50) {
      grade = "D";
    } else {
      grade = "F";
    }

    var student = {
      name: name,
      course: course,
      branch: branch,
      marks: marks,
      percentage: percentage,
      grade: grade
    };

    students.push(student);

    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    students.sort(function(a, b) {
      return b.percentage - a.percentage;
    });
    students.forEach(function(student) {
      var entry = "<tr>" +
        "<td>" + student.name + "</td>" +
        "<td>" + student.course + "</td>" +
        "<td>" + student.branch + "</td>" +
        "<td>" + student.marks + "</td>" +
        "<td class='percentage'>" + student.percentage.toFixed(2) + "%</td>" +
        "<td class='grade'>" + student.grade + "</td>" +
        "<td class='delete'><button onclick='deleteEntry(this)'>Delete</button></td>" +
        "</tr>";
      tableBody.innerHTML += entry;
    });

    // Clear the form inputs
    document.getElementById("name").value = "";
    document.getElementById("course").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("marks").value = "";
  } else {
    alert("Please fill in all the fields and provide a valid total marks value (0-500).");
  }
}

function deleteEntry(button) {
  var row = button.parentNode.parentNode;
  var index = Array.prototype.indexOf.call(row.parentNode.children, row);
  students.splice(index, 1);
  row.parentNode.removeChild(row);
}

function showTopperDetails() {
  if (students.length > 0) {
    var topper = students[0];
    document.getElementById("topperName").textContent = "Name: " + topper.name;
    document.getElementById("topperCourse").textContent = "Course: " + topper.course;
    document.getElementById("topperBranch").textContent = "Branch: " + topper.branch;
    document.getElementById("topperMarks").textContent = "Total Marks: " + topper.marks;
    document.getElementById("topperPercentage").textContent = "Percentage: " + topper.percentage.toFixed(2) + "%";
    document.getElementById("topperGrade").textContent = "Grade: " + topper.grade;

    var topperDetails = document.getElementById("topperDetails");
    if (topperDetails.style.display === "none") {
      topperDetails.style.display = "block";
    } else {
      topperDetails.style.display = "none";
    }
  } else {
    alert("No student entries to display.");
  }
}
