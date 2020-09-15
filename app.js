// Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", (e) => {
    // Show the spinning when click
    document.getElementById("loading").style.display = "block";
    setTimeout(calculateResults, 2000);

    e.preventDefault();
  });

// Calculate Results
function calculateResults(e) {
  // UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "block";

  } else {
    showError("Please check your numbers !!");
  }
}

// Show Error
function showError(error) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("results").style.display = "none";
  // Create Error Div
  const errorDiv = document.createElement("div");
  // Give class name alert
  errorDiv.className = "alert alert-danger";
  // Create text note inside it
  errorDiv.appendChild(document.createTextNode(error));

  // Put it beofre the title in the card
  const card = document.querySelector(".card");
  const heading = document.querySelector("h1");
  card.insertBefore(errorDiv, heading);

  // Error message disappears in after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() { 
  document.querySelector(".alert").remove();
}
