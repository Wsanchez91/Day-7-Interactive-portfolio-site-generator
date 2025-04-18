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

updateInfoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //this is adding the uploaded image to the portfolio preview.
  const fileInput = document.querySelector("#profile-img");
  const newProfileImg = document.querySelector("#new-profile-pic");
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProfileImg.src = e.target.result;
      newProfileImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  }

  //This is adding the name input into the preview.
  const nameSpan = document.createElement("span");
  portfolioName.textContent = "Name: ";
  nameSpan.textContent = nameInput.value;
  portfolioName.appendChild(nameSpan);

  //This is adding the position input into the preview.
  const positionSpan = document.createElement("span");
  portfolioPosition.textContent = "Position: ";
  positionSpan.textContent = positionInput.value;
  portfolioPosition.appendChild(positionSpan);

  //This is adding the bio input in to the preview.
  const bioSpan = document.createElement("span");
  portfolioBio.textContent = "Bio: ";
  bioSpan.textContent = bioInput.value;
  portfolioBio.appendChild(bioSpan);
});

