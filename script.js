document.addEventListener("DOMContentLoaded", function () {
  const scanInput = document.getElementById("scan-input");

  setTimeout(function () {
    scanInput.value = "Your Name Here";
  }, 10000);
});

document.addEventListener("DOMContentLoaded", function () {
  let scannedName = "{ ScannedName }";

  document.getElementById("scanned-name").textContent = scannedName;
});
