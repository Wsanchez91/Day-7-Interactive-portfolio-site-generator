const nameInput = document.querySelector("#name-input"); // Selects the input field for the name
const positionInput = document.querySelector("#position-input"); // Selects the input field for the position
const imgInput = document.querySelector("#preview-img"); // Selects the input field for the image preview
const bioInput = document.querySelector("#bio-input"); // Selects the input field for the bio
const projectList = document.querySelector("#project-list"); // Selects the list where projects will be displayed
const projectTitle = document.querySelector("#project-title-input"); // Selects the input field for project title
const projectDes = document.querySelector("#project-des"); // Selects the input field for project description
const projectTech = document.querySelector("#tech-input"); // Selects the input field for project technologies
const githubLink = document.querySelector("#github-link"); // Selects the input field for GitHub link
const deployLink = document.querySelector("#deployed-link"); // Selects the input field for deployed link
const portfolioImg = document.querySelector("#portfolio-img"); // Selects the image element for the portfolio
const portfolioName = document.querySelector("#portfolio-review-name"); // Selects the element for displaying the name in the portfolio
const portfolioPosition = document.querySelector("#portfolio-review-position"); // Selects the element for displaying the position in the portfolio
const portfolioBio = document.querySelector("#portfolio-review-bio"); // Selects the element for displaying the bio in the portfolio
const portfolioProjects = document.querySelector("#portfolio-review-projects"); // Selects the element for displaying the projects in the portfolio
const portfolioPreview = document.querySelector("#portfolio-review-page"); // Selects the preview section of the portfolio
const exportHtml = document.querySelector("#export-html"); // Selects the button for exporting HTML
const exportJson = document.querySelector("#export-json"); // Selects the button for exporting JSON
const updateInfoBtn = document.querySelector(".update-btn"); // Selects the button for updating portfolio information
const addBtn = document.querySelector("#add-btn"); // Selects the button for adding a new project

// Object to hold the portfolio data
const portfolioData = {
  name: "",
  position: "",
  bio: "",
  image: "",
  projects: [],
};

// Retrieve saved portfolio data from localStorage
const savedData = JSON.parse(localStorage.getItem("portfolioData"));

// Event listener for updating portfolio information
updateInfoBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevents the default form submission behavior
  // Selects the file input for the profile image and the corresponding image preview
  const fileInput = document.querySelector("#profile-img");
  const newProfileImg = document.querySelector("#new-profile-pic");

  // Update portfolioData with values from input fields
  portfolioData.name = nameInput.value;
  portfolioData.position = positionInput.value;
  portfolioData.bio = bioInput.value;

  const file = fileInput.files[0]; // Get the selected file from the file input

  // If a file is selected, read it and set it as the profile image
  if (file) {
    const reader = new FileReader(); // Create a new FileReader object
    reader.onload = (e) => {
      newProfileImg.src = e.target.result; // Set the image source to the loaded file
      newProfileImg.style.display = "block"; // Make the image visible
      portfolioData.image = e.target.result; // Store the image data in portfolioData
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }

  // Clear previous preview text before appending new data
  portfolioName.textContent = "Name: ";
  portfolioName.appendChild(document.createTextNode(nameInput.value)); // Append the name to the portfolio preview

  portfolioPosition.textContent = "Position: ";
  portfolioPosition.appendChild(document.createTextNode(positionInput.value)); // Append the position to the portfolio preview

  portfolioBio.textContent = "Bio: ";
  portfolioBio.appendChild(document.createTextNode(bioInput.value)); // Append the bio to the portfolio preview

  // Save the updated portfolio data to localStorage
  localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
});

// Event listener for adding a new project
addBtn.addEventListener("click", () => {
  // Create an object to hold the project details
  const projectObj = {
    title: projectTitle.value,
    description: projectDes.value,
    tech: projectTech.value,
    github: githubLink.value,
    deployed: deployLink.value,
  };

  const projectListSection = document.querySelector("#project-list-section"); // Selects the section to display the project list
  const projectLi = document.createElement("li"); // Create a new list item for the project
  projectLi.classList.add("project-preview"); // Add a class for styling

  // Populate the list item with project details
  projectLi.innerHTML = `
    <h3>${projectObj.title}</h3>
    <p>${projectObj.description}</p>
    <p><strong>Tech: </strong>${projectObj.tech}</p>
    <a href="${projectObj.github}" target="_blank">GitHub</a> | 
    <a href="${projectObj.deployed}" target="_block">Live</a>`;

  portfolioData.projects.push(projectObj); // Add the new project to the portfolio data

  const deleteBtn = document.createElement("button"); // Create a delete button for the project
  deleteBtn.textContent = "Delete"; // Set the button text
  deleteBtn.type = "button"; // Set the button type
  deleteBtn.classList.add("delete-btn"); // Add a class for styling
  // Event listener for the delete button
  deleteBtn.addEventListener("click", () => {
    projectLi.remove(); // Remove the project list item from the DOM
  });

  projectLi.appendChild(deleteBtn); // Append the delete button to the project list item
  projectListSection.appendChild(projectLi); // Append the project list item to the project list section

  // Save the updated portfolio data to localStorage
  localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
});

// Function to load portfolio data from localStorage and display it
const loadPortfolioData = () => {
  const savedData = JSON.parse(localStorage.getItem("portfolioData")); // Retrieve saved data from localStorage

  if (!savedData) return; // If no data found, exit the function

  // Populate portfolioData with saved data or default values
  portfolioData.name = savedData.name || "";
  portfolioData.position = savedData.position || "";
  portfolioData.bio = savedData.bio || "";
  portfolioData.image = savedData.image || "";
  portfolioData.projects = savedData.projects || [];

  // Set input fields with loaded data
  nameInput.value = portfolioData.name;
  positionInput.value = portfolioData.position;
  bioInput.value = portfolioData.bio;

  const img = document.querySelector("#new-profile-pic"); // Select the image element for the profile picture
  if (portfolioData.image) {
    img.src = portfolioData.image; // Set the image source to the loaded image
    img.style.display = "block"; // Make the image visible
  }

  // Populate the portfolio preview with loaded data
  portfolioName.textContent = "Name: ";
  portfolioName.appendChild(document.createTextNode(portfolioData.name)); // Append the name to the portfolio preview

  portfolioPosition.textContent = "Position: ";
  portfolioPosition.appendChild(
    document.createTextNode(portfolioData.position)
  ); // Append the position to the portfolio preview

  portfolioBio.textContent = "Bio: ";
  portfolioBio.appendChild(document.createTextNode(portfolioData.bio)); // Append the bio to the portfolio preview

  const projectListSection = document.querySelector("#project-list-section"); // Select the section to display the project list
  // Loop through each project and create a list item
  portfolioData.projects.forEach((project) => {
    const projectLi = document.createElement("li"); // Create a new list item for the project
    projectLi.classList.add("project-preview"); // Add a class for styling
    // Populate the list item with project details
    projectLi.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p><strong>Tech: </strong>${project.tech}</p>
      <a href="${project.github}" target="_blank">GitHub</a> | 
      <a href="${project.deployed}" target="_blank">Live</a>
    `;
    const deleteBtn = document.createElement("button"); // Create a delete button for the project
    deleteBtn.textContent = "Delete"; // Set the button text
    deleteBtn.type = "button"; // Set the button type
    deleteBtn.classList.add("delete-btn"); // Add a class for styling
    // Event listener for the delete button
    deleteBtn.addEventListener("click", () => {
      projectLi.remove(); // Remove the project list item from the DOM
    });

    projectLi.appendChild(deleteBtn); // Append the delete button to the project list item
    projectListSection.appendChild(projectLi); // Append the project list item to the project list section
  });
};

// Load portfolio data when the DOM content is fully loaded
window.addEventListener("DOMContentLoaded", loadPortfolioData);
