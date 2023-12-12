let screenCount = 1;
function fetchJsonForDepartment(department) {
  return new Promise((resolve) => {
    resolve({
      screens: {
        screen1: {
          header: "Sample Header 1",
          question: "Sample Question 1",
          answers: {
            Yes: "screen2",
          },
        },
      },
    });
  });
}

function addNewOffice() {
  var officeName = prompt("Please enter the new office name:");
  if (officeName) {
    var menu = document.querySelector(".menu ul");
    var newOfficeLi = document.createElement("li");
    newOfficeLi.innerHTML = `<a href="#" onclick="showForm('${officeName}')">${officeName}</a>`;
    menu.appendChild(newOfficeLi);
  }
}

function showForm(department) {
  fetchJsonForDepartment(department).then((jsonData) => {
    var contentDiv = document.getElementById("content");
    var formHtml = `<div id="form-container">
      <h1>${department} Department</h1>
      <form id="jsonForm-${department}">`;

    // Dynamically generate form fields based on jsonData
    Object.keys(jsonData.screens).forEach((screenId) => {
      let screen = jsonData.screens[screenId];
      formHtml += `<h2>Edit Screen: ${screenId}</h2>
        <div>
          <label for="header-${screenId}">Header:</label>
          <input type="text" id="header-${screenId}" name="header" value="${
        screen.header || ""
      }" />
        </div>
        <div>
          <label for="question-${screenId}">Question:</label>
          <input type="text" id="question-${screenId}" name="question" value="${
        screen.question || ""
      }" />
        </div>
        <div id="answersContainer-${screenId}">`;

      // Generate answer fields dynamically
      if (screen.answers) {
        Object.keys(screen.answers).forEach((answerKey, index) => {
          formHtml += `<div class="answer-group">
            <label for="answerKey${index}-${screenId}">Answer Text ${
            index + 1
          }:</label>
            <input type="text" id="answerKey${index}-${screenId}" name="answerKey${index}" value="${answerKey}" />
            <label for="answerValue${index}-${screenId}">Next Screen ID ${
            index + 1
          }:</label>
            <input type="text" id="answerValue${index}-${screenId}" name="answerValue${index}" value="${
            screen.answers[answerKey]
          }" />
          </div>`;
        });
      }

      // Close the answersContainer here and then add the "Add Answer" button
      formHtml += `</div><button type="button" class="btn add-answer-btn" onclick="addAnswerField('${screenId}')">Add Answer</button>`;
    });

    // Add submit and "Add New Screen" buttons after the answersContainer
    formHtml += `<div class="button-row">
        <button type="submit" class="btn submit-btn">Submit</button>
        <button type="button" class="btn add-new-screen-btn" onclick="addNewScreen('${department}')">Add New Screen</button>
      </div>
    </form>
  </div>`;

    contentDiv.innerHTML = formHtml;
  });
}

// Function to add a new answer field
function addAnswerField(screenId) {
  console.log("Adding new answer field for screen:", screenId);
  let answersContainer = document.getElementById(
    `answersContainer-${screenId}`
  );
  let newAnswerIndex =
    answersContainer.querySelectorAll(".answer-group").length; // get the number of existing answer groups

  let newAnswerHtml = `<div class="answer-group">
    <label for="answerKey${newAnswerIndex}-${screenId}">Answer Text ${
    newAnswerIndex + 1
  }:</label>
    <input type="text" id="answerKey${newAnswerIndex}-${screenId}" name="answerKey${newAnswerIndex}" />
    <label for="answerValue${newAnswerIndex}-${screenId}">Next Screen ID ${
    newAnswerIndex + 1
  }:</label>
    <input type="text" id="answerValue${newAnswerIndex}-${screenId}" name="answerValue${newAnswerIndex}" />
  </div>`;

  answersContainer.insertAdjacentHTML("beforeend", newAnswerHtml);
}

// Function to add a new screen
function addNewScreen(department) {
  console.log("Adding new screen for department:", department);

  screenCount++; // Increment the screen count
  const newScreenId = `screen${screenCount}`; // Create a new screen ID

  const formContainer = document.getElementById(`jsonForm-${department}`);
  if (!formContainer) {
    console.error("Form container not found for department:", department);
    return; // Exit the function if form container is not found
  }

  // Create the HTML for the new screen
  let newScreenHtml = `
    <h2>Edit Screen: ${newScreenId}</h2>
    <div>
      <label for="header-${newScreenId}">Header:</label>
      <input type="text" id="header-${newScreenId}" name="header-${newScreenId}" />
    </div>
    <div>
      <label for="question-${newScreenId}">Question:</label>
      <input type="text" id="question-${newScreenId}" name="question-${newScreenId}" />
    </div>
    <div id="answersContainer-${newScreenId}">
      <!-- Answers will be added here -->
    </div>
    <button type="button" class="btn add-answer-btn" onclick="addAnswerField('${newScreenId}')">Add Answer</button>
    <hr>`; // Added a horizontal line to visually separate screens

  // Insert the new screen at the end of the form, before the submit button
  const submitButton = formContainer.querySelector(".button-row");
  submitButton.insertAdjacentHTML("beforebegin", newScreenHtml);
}

// Function to save the changes made in the form
function saveChanges(department) {
  let form = document.getElementById(`jsonForm-${department}`);
  let formData = new FormData(form);
  let updatedConfig = {}; // You'll convert formData to a structured JSON object

  // Logic to iterate over formData and build the updatedConfig object

  // Logic to send updatedConfig to the server to save changes
}
