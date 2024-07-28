instance = null;

const colors = {
  success: "green",
  error: "red"
}
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

  addStyle = () => {
    const style = document.createElement('style');
    style.innerHTML = `
    .toast-message{
    width: 100%;
    font-size: 15px;
    border: none;
    background: none;
    cursor: default;
    margin-bottom: 16px;
    }
      .center-display {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66.66%;
      }

      .input-box {
        color: black;
        padding: 16px;
        width: 100%;
        max-width: 400px;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }

      .input-field::placeholder {
        color: #ccc;
      }

      .label {
        color: rgb(38, 37, 37);
        font-size: 16px;
        margin-bottom: 8px;
        margin-top: 8px;
      }

      .input-field {
        width: 95%;
        padding: 8px;
        margin-bottom: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white;
      }

      .slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .slider-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 30px;
      }

      .slider {
        width: 100%;
      }

      .radio-group {
        display: flex;
        width: 80%;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .submit-button {
        float: right;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
      }

      .submit-button:hover {
        background-color: #0056b3;
      }

      .top-left {
        position: absolute;
        top: 50px;
        left: 50px;
      }

      .top-right {
        position: absolute;
        top: 50px;
        right: 50px;
      }

      .bottom-left {
        position: absolute;
        bottom: 50px;
        left: 50px;
      }

      .bottom-right {
        position: absolute;
        bottom: 50px;
        right: 50px;
      }
    `;
    document.head.appendChild(style);
  }

  async render() {
    this.addStyle()
    const templateData = await fetchTemplateData(this.projectId);

    for (let index = 0; index < templateData.meta.length; index++) {
      componentRender(templateData.meta[index], this.projectId);
    }
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

const generateRandomId = () => {
  return "id-" + Math.random().toString(36).substr(2, 9);
};

const sendData = async (data, projectId, componentId, value) => {
  data.data = { ...data.data, value, uid: generateRandomId() }
  try {
    const response = await fetch(
      `http://localhost:3170/v1/script-handler/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, componentId, ...data }),
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
}

const componentRender = (templateData, projectId) => {
  const { componentId, data } = templateData;
  const fluxContainer = document.getElementById("fluxContainer");

  switch (componentId.toUpperCase()) {
    case "INPUT":
      const inputId = generateRandomId();
      fluxContainer.innerHTML += `<div class=${data.position} id="${inputId}">
            <div class="input-box" style="padding-bottom:50px;">
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

      button.addEventListener("click", async () => {
        const inputField = inputContainer.querySelector(".input-field");
        const value = inputField.value;
        button.disabled = "true"
        button.style = "opacity:0.6"
        await sendData(templateData, projectId, componentId, value)
        setTimeout(() => {
          document.getElementById(inputId).style.display = "none"
        }, 2000)
      });
      break;

    case "RANGE":
      const sliderId = generateRandomId();
      fluxContainer.innerHTML += `<div class="${data.position
        }" id="${sliderId}">
                <div class="input-box">
            <div class="slider-container">
            <h6 class="label" style="width:100%">${data.label}</h6>
              <input 
                type="range" 
                min="${data.minValue || 0}" 
                max="${data.maxValue || 10}" 
                class="slider" 
              />
              <div class="slider-info">
                <small>${data.minValue || 0}</small>
                <small>${(data.minValue || 0 + data.maxValue || 10) / 2}</small>
                <small>${data.maxValue || 10}</small>
              </div>
            </div>
            </div>
          </div>`;


      // Add event listener to the newly created slider
      document
        .getElementById(sliderId)
        .querySelector(".slider")
        .addEventListener("mouseup", async (event) => {
          const value = event.target.value
          await sendData(templateData, projectId, componentId, value)
          document.getElementById(sliderId).querySelector(".slider").disabled = "true"
          setTimeout(() => {
            document.getElementById(sliderId).style.display = "none"
          }, 2000)
        });

      break;

    case "RATING":
      const toastId = generateRandomId();
      fluxContainer.innerHTML += `<div id="${toastId}" class="${data.position
        }" class="center-display">
            <div class="input-box" style="border-color:${colors[data.status]}">
              <h6 class="label">${data.label}</h6>
             <input type="text" class="toast-message" placeholder="${data.placeholder}" disabled />
            </div>
          </div>`;
      setTimeout(() => {
        document.getElementById(toastId).style.display = "none"
      }, 2000)




      break;

    default:
      break;
  }
};
