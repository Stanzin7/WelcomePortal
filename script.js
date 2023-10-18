document
  .getElementById("cardForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from actually submitting and refreshing the page

    let cardNumber = document.getElementById("cardInput").value;
    let office = "ARC";

    try {
      let response = await fetch("data.json");
      if (response.ok) {
        let raw = await response.text();

        let datasets;
        try {
          datasets = JSON.parse(raw);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return;
        }

        if (datasets && datasets.CardNum == cardNumber) {
          displayUserServices(datasets);
        } else {
          alert("Card not found.");
        }
      } else {
        console.error("Failed to fetch data. HTTP Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

function displayUserServices(data) {
  document.querySelector(".card-swipe").style.display = "none";
  document.getElementById("userName").innerText = data.name;
  let workerContainer = document.getElementById("workers");
  let noWorkersContainer = document.getElementById("noWorkers");

  // Clear previous buttons
  workerContainer.innerHTML = "";
  noWorkersContainer.style.display = "none";

  if (data.workers) {
    for (let worker in data.workers) {
      let workerBtn = document.createElement("button");
      workerBtn.innerHTML = worker;
      workerBtn.addEventListener("click", function () {
        handleServiceSelection(worker, data.workers[worker].services);
      });

      if (data.workers[worker].image) {
        let workerImg = document.createElement("img");
        workerImg.src = data.workers[worker].image;
        workerImg.alt = worker + "'s image";
        workerImg.width = 50;
        workerImg.height = 50;
        workerContainer.appendChild(workerImg);
      }

      workerContainer.appendChild(workerBtn);
    }
  } else if (data.NoWorkers) {
    noWorkersContainer.style.display = "block";
    let servicesContainer = document.getElementById("availableServices");
    servicesContainer.innerHTML = "";

    data.NoWorkers.forEach((service) => {
      let serviceBtn = document.createElement("button");
      serviceBtn.classList.add("service-btn");
      serviceBtn.innerHTML = service;
      serviceBtn.addEventListener("click", function () {
        alert("Selected Service: " + service);
        // Handle service selection here
      });
      servicesContainer.appendChild(serviceBtn);
    });
  }

  document.getElementById("cardScanContainer").style.display = "none";
  document.getElementById("serviceContainer").style.display = "block";
}

function handleServiceSelection(worker, services) {
  // Notify user of their worker selection
  alert(
    `You've selected ${worker}. They provide the following services: ${services.join(
      ", "
    )}`
  );

  // Create a popup or modal (simple div for this example) to display services
  let serviceModal = document.createElement("div");
  serviceModal.id = "serviceModal";
  serviceModal.style.position = "fixed";
  serviceModal.style.top = "0";
  serviceModal.style.left = "0";
  serviceModal.style.width = "100%";
  serviceModal.style.height = "100%";
  serviceModal.style.backgroundColor = "rgba(0,0,0,0.7)";
  serviceModal.style.display = "flex";
  serviceModal.style.justifyContent = "center";
  serviceModal.style.alignItems = "center";
  serviceModal.style.zIndex = "1000";

  let serviceList = document.createElement("div");
  serviceList.style.backgroundColor = "#fff";
  serviceList.style.padding = "20px";
  serviceList.style.borderRadius = "8px";

  services.forEach((service) => {
    let serviceBtn = document.createElement("button");
    serviceBtn.classList.add("service-btn");
    serviceBtn.innerHTML = service;
    serviceBtn.style.margin = "5px";
    serviceBtn.addEventListener("click", function () {
      alert(`You've selected the service: ${service}`);
      // Send this information to the server or process further
      // For now, we just close the modal
      document.body.removeChild(serviceModal);
    });
    serviceList.appendChild(serviceBtn);
  });

  let closeBtn = document.createElement("button");
  closeBtn.innerHTML = "Close";
  closeBtn.style.marginTop = "10px";
  closeBtn.addEventListener("click", function () {
    document.body.removeChild(serviceModal);
  });

  serviceList.appendChild(closeBtn);
  serviceModal.appendChild(serviceList);
  document.body.appendChild(serviceModal);
}
