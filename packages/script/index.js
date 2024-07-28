instance = null;
class Flux {
  constructor(projectId = null) {
    this.projectId = projectId;
  }

  setKey(projectId) {
    if (instance) throw new Error("Not Authorized");
    if (!projectId) throw new Error("ProjectId is invalid");
    this.projectId = projectId;
  }

  get() {
    if (this.projectId === null) throw new Error("ProjectId required");

    if (this.projectId && instance) {
      return this;
    }

    const newInstance = new Flux(this.projectId);
    instance = newInstance;
    return newInstance;
  }

  async render() {
    const templateData = await fetchTemplateData(this.projectId);
    console.log(templateData);

    for (let index = 0; index < templateData.meta.length; index++) {
      componentRender(templateData.meta[index]);
    }

    // document.querySelectorAll(".submit-button").forEach((button) => {
    //   button.addEventListener("click", (e) => {
    //     const inputId = button.dataset.inputId;
    //     const componentId = button.dataset.componentId;
    //     const component = document.querySelector(`#${inputId} input`);
    //     console.log(component.value, "inputField.value");
    //   });
    // });
  }
}

const fetchTemplateData = async (projectId) => {
  try {
    const response = await fetch(
      `http://localhost:3170/v1/script-handler/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include this if your server requires credentials
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Parse the JSON response
    return response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

const componentRender = (templateData) => {
  const { componentId, data } = templateData;
  const fluxContainer = document.getElementById("fluxContainer");

  const generateRandomId = () => {
    return "id-" + Math.random().toString(36).substr(2, 9);
  };

  switch (componentId.toUpperCase()) {
    case "INPUT":
      const inputId = generateRandomId();
      fluxContainer.innerHTML += `<div class=${data.position} id="${inputId}">
            <div class="input-box">
              <h6 class="label">${data.label}</h6>
             <input type="text" class="input-field" placeholder="${data.placeholder}" />
              <button 
              data-component-id="${componentId}"
              data-input-id="${inputId}"
              class="submit-button">Submit</button>
            </div>
          </div>`;

      const inputContainer = document.getElementById(inputId);
      const button = inputContainer.querySelector(".submit-button");

      button.addEventListener("click", () => {
        const inputField = inputContainer.querySelector(".input-field");
        const value = inputField.value;
        console.log(`Button inside ${inputId} clicked`, value);
        // Handle button click event here
      });
      break;

    case "SLIDER":
      const sliderId = generateRandomId();
      fluxContainer.innerHTML += `<div class="${
        data.position
      }" id="${sliderId}">
            <div class="slider-container">
              <input 
                type="range" 
                min="${data.minValue}" 
                max="${data.maxValue}" 
                value="${(data.minValue + data.maxValue) / 2}" 
                class="slider" 
              />
              <div class="slider-info">
                <small>${data.minValue}</small>
                <small>${(data.minValue + data.maxValue) / 2}</small>
                <small>${data.maxValue}</small>
              </div>
            </div>
          </div>`;

      // Add event listener to the newly created slider
      document
        .getElementById(sliderId)
        .querySelector(".slider")
        .addEventListener("input", (event) => {
          console.log(
            `Slider inside ${sliderId} changed to ${event.target.value}`
          );
          // Handle slider input event here
        });
      break;

    default:
      break;
  }
};
