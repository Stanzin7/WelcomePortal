document
  .getElementById("cardForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const cardNumber = document.getElementById("cardInput").value;

    try {
      const response = await fetch("data.json");

      if (response.ok) {
        const datasets = await response.json();

        if (datasets && datasets.CardNum === cardNumber) {
          displayUserServices(datasets);
        } else {
          alert("Card not found.");
        }
      } else {
        console.error(`Failed to fetch data. HTTP Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

function transitionToNext() {
  document.querySelector(".card-swipe").style.display = "none";
  document.getElementById("cardScanContainer").style.display = "none";
  document.getElementById("greetingContainer").style.display = "block";
}
document.getElementById("noBtn").addEventListener("click", function () {
  document.querySelector(".card-swipe").style.display = "none";
  document.getElementById("greetingContainer").style.display = "none";
  document.getElementById("noResponseContainer").style.display = "block";
});
document.getElementById("yesBtn").addEventListener("click", function () {
  console.log("Yes button clicked!");

  document.querySelector(".card-swipe").style.display = "none";
  document.getElementById("greetingContainer").style.display = "none";
  document.getElementById("serviceContainer").style.display = "block";

  // Populate the workers list
  const workers = [
    "Nicole Willis",
    "Molly Mundt",
    "Jan Simpson",
    "Jessica Herrmeyer",
    "ARC Peer",
    "Testing",
  ];

  const workerContainer = document.getElementById("workers");

  workers.forEach((worker) => {
    const workerBtn = document.createElement("button");
    workerBtn.classList.add("worker-btn");
    workerBtn.textContent = worker;
    workerBtn.addEventListener("click", () => {
      alert(`You've scheduled a meeting with: ${worker}`);
    });

    workerContainer.appendChild(workerBtn);
  });
});

function displayUserServices(data) {
  document.querySelector(".title-class-name").classList.add("hide-title");

  document.querySelector(".card-swipe").style.display = "none";

  const userName = document.getElementById("userName");
  userName.appendChild(createUserInfoBox(data));

  const workerContainer = document.getElementById("workers");
  workerContainer.appendChild(createServiceList(data));

  transitionToNext();

  document.getElementById("serviceContainer").style.display = "block";
}

function createUserInfoBox(data) {
  const userInfoBox = document.createElement("div");
  userInfoBox.classList.add("user-info-box");

  const userNameElem = document.createElement("h1");
  userNameElem.textContent = `Hello, ${data.name}`;
  userInfoBox.appendChild(userNameElem);

  if (data.image) {
    const userImage = document.createElement("img");
    userImage.src = data.image;
    userImage.alt = `${data.name}'s image`;
    userInfoBox.appendChild(userImage);
  }

  const userDescription = document.createElement("p");
  userDescription.textContent = data.description;
  userInfoBox.appendChild(userDescription);

  return userInfoBox;
}

function createServiceList(data) {
  const serviceList = document.createElement("div");

  if (data.workers) {
    for (let worker in data.workers) {
      const workerBtn = document.createElement("button");
      workerBtn.classList.add("worker-btn");
      workerBtn.textContent = worker;
      workerBtn.addEventListener("click", () => {
        handleServiceSelection(worker, data.workers[worker].services);
      });

      serviceList.appendChild(workerBtn);
    }
  } else if (data.NoWorkers) {
    data.NoWorkers.forEach((service) => {
      const serviceBtn = document.createElement("button");
      serviceBtn.classList.add("service-btn");
      serviceBtn.textContent = service;
      serviceBtn.addEventListener("click", () => {
        alert("Selected Service: " + service);
      });

      serviceList.appendChild(serviceBtn);
    });
  }

  return serviceList;
}

function handleServiceSelection(worker, services) {
  alert(
    `You've selected ${worker}. They provide the following services: ${services.join(
      ", "
    )}`
  );

  const serviceModal = document.createElement("div");
  serviceModal.id = "serviceModal";
  serviceModal.classList.add("service-modal");

  const serviceList = document.createElement("div");
  serviceList.classList.add("service-list");

  services.forEach((service) => {
    const serviceBtn = document.createElement("button");
    serviceBtn.classList.add("service-btn");
    serviceBtn.textContent = service;
    serviceBtn.addEventListener("click", () => {
      alert(`You've selected the service: ${service}`);
      document.body.removeChild(serviceModal);
    });

    serviceList.appendChild(serviceBtn);
  });

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(serviceModal);
  });

  serviceList.appendChild(closeBtn);
  serviceModal.appendChild(serviceList);
  document.body.appendChild(serviceModal);
}
