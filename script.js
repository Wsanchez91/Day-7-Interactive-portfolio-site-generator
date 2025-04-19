const nameInput = document.querySelector("#name-input");
const positionInput = document.querySelector("#position-input");
const imgInput = document.querySelector("#preview-img");
const bioInput = document.querySelector("#bio-input");
const projectList = document.querySelector("#project-list");
const projectTitle = document.querySelector("#project-title-input");
const projectDes = document.querySelector("#project-des");
const projectTech = document.querySelector("#tech-input");
const githubLink = document.querySelector("#github-link");
const deployLink = document.querySelector("#deployed-link");
const portfolioImg = document.querySelector("#portfolio-img");
const portfolioName = document.querySelector("#portfolio-review-name");
const portfolioPosition = document.querySelector("#portfolio-review-position");
const portfolioBio = document.querySelector("#portfolio-review-bio");
const portfolioProjects = document.querySelector("#portfolio-review-projects");
const portfolioPreview = document.querySelector("#portfolio-review-page");
const exportHtml = document.querySelector("#export-html");
const exportJson = document.querySelector("#export-json");
const updateInfoBtn = document.querySelector(".update-btn");
const addBtn = document.querySelector("#add-btn");

const portfolioData = {
  name: "",
  position: "",
  bio: "",
  image: "",
  projects: [],
};

const savedData = JSON.parse(localStorage.getItem("portfolioData"));

updateInfoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //this is adding the uploaded image to the portfolio preview.
  const fileInput = document.querySelector("#profile-img");
  const newProfileImg = document.querySelector("#new-profile-pic");

  portfolioData.name = nameInput.value;
  portfolioData.position = positionInput.value;
  portfolioData.bio = bioInput.value;

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProfileImg.src = e.target.result;
      newProfileImg.style.display = "block";
      portfolioData.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  //Clear previous preview text before appending
  portfolioName.textContent = "Name: ";
  portfolioName.appendChild(document.createTextNode(nameInput.value));

  portfolioPosition.textContent = "Position: ";
  portfolioPosition.appendChild(document.createTextNode(positionInput.value));

  portfolioBio.textContent = "Bio: ";
  portfolioBio.appendChild(document.createTextNode(bioInput.value));

  localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
});

addBtn.addEventListener("click", () => {
  const projectObj = {
    title: projectTitle.value,
    description: projectDes.value,
    tech: projectTech.value,
    github: githubLink.value,
    deployed: deployLink.value,
  };

  const projectListSection = document.querySelector("#project-list-section");
  const projectLi = document.createElement("li");
  projectLi.classList.add("project-preview");

  projectLi.innerHTML = `
    <h3>${projectObj.title}</h3>
    <p>${projectObj.description}</p>
    <p><strong>Tech: </strong>${projectObj.tech}</p>
    <a href="${projectObj.github}" target="_blank">GitHub</a> | 
    <a href="${projectObj.deployed}" target="_block">Live</a>`;

  portfolioData.projects.push(projectObj);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    projectLi.remove();
  });

  projectLi.appendChild(deleteBtn);
  projectListSection.appendChild(projectLi);

  localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
});

const loadPortfolioData = () => {
  const savedData = JSON.parse(localStorage.getItem("portfolioData"));

  if (!savedData) return;

  portfolioData.name = savedData.name || "";
  portfolioData.position = savedData.position || "";
  portfolioData.bio = savedData.bio || "";
  portfolioData.image = savedData.image || "";
  portfolioData.projects = savedData.projects || [];

  nameInput.value = portfolioData.name;
  positionInput.value = portfolioData.position;
  bioInput.value = portfolioData.bio;

  const img = document.querySelector("#new-profile-pic");
  if (portfolioData.image) {
    img.src = portfolioData.image;
    img.style.display = "block";
  }

  portfolioName.textContent = "Name: ";
  portfolioName.appendChild(document.createTextNode(portfolioData.name));

  portfolioPosition.textContent = "Position: ";
  portfolioPosition.appendChild(
    document.createTextNode(portfolioData.position)
  );

  portfolioBio.textContent = "Bio: ";
  portfolioBio.appendChild(document.createTextNode(portfolioData.bio));

  const projectListSection = document.querySelector("#project-list-section");
  portfolioData.projects.forEach((project) => {
    const projectLi = document.createElement("li");
    projectLi.classList.add("project-preview");
    projectLi.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p><strong>Tech: </strong>${project.tech}</p>
      <a href="${project.github}" target="_blank">GitHub</a> | 
      <a href="${project.deployed}" target="_blank">Live</a>
    `;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      projectLi.remove();
    });

    projectLi.appendChild(deleteBtn);
    projectListSection.appendChild(projectLi);
  });
};

window.addEventListener("DOMContentLoaded", loadPortfolioData);
