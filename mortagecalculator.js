const form = document.querySelector("form");
const button = document.querySelector("button");
const emptyPrincipal = document.querySelector(".error-principle");
const errorMessage = document.querySelector(".error");
const emptyTerm = document.querySelector(".error-term"); 
const emptyRates = document.querySelector(".error-rate"); 
const emptyModes = document.querySelector(".error-modes");
const spanterm = document.querySelector(".right-span-term");
const spanrate = document.querySelector(".right-span-rate");
const clearAll = document.querySelector(".clearall"); 

clearAll.addEventListener("click", () => { 
  document.querySelector("#mortageAmount").value = '';
  document.querySelector("#Term").value = '';
  document.querySelector("#rate").value = '';
  document.querySelector("#repayment").checked = false;
  document.querySelector("#interest").checked = false;

  emptyPrincipal.textContent = '';
  emptyTerm.textContent = '';
  emptyRates.textContent = '';
  emptyModes.textContent = '';

 
  document.querySelector(".emptyimage").style.display = "block";
  document.querySelector(".result-head").style.display = "none";
  document.querySelector(".description").style.display = "none";
  document.querySelector(".results").style.display = "none";

  document.querySelector(".result-shower").textContent = '';
  document.querySelector(".result-holder").textContent = '';
});

form.addEventListener("submit", (event) => {
  event.preventDefault();  

  
  const principal = document.querySelector("#mortageAmount").value;
  const term = document.querySelector("#Term").value;
  const rates = document.querySelector("#rate").value; 
  const repaymentMode = document.querySelector("#repayment").checked; 
  const interestMode = document.querySelector("#interest").checked; 

  const totalResults = document.querySelector(".result-holder");
  const emptyimage = document.querySelector(".emptyimage");
  const resultDescription = document.querySelector(".description");
  const resultsDescription = document.querySelector(".description-results");
  const totalResultDescription = document.querySelector(".description-total-results");
  const results = document.querySelector(".results");
  const monthlyResult = document.querySelector(".results-shower");
  const resultHead = document.querySelector(".result-head");  

  
 
 
  if (principal === '') { 
    emptyPrincipal.style.color = "red";
    emptyPrincipal.textContent = "*This field is required";
    return;
  }

  if (term === '') { 
    emptyTerm.style.color = "red";
    emptyTerm.textContent = "*This field is required"; 
    spanterm.style.backgroundColor = "red";
    return; 
  }

  if (rates === '') { 
    spanterm.style.color = "white"; 
    spanrate.style.backgroundColor = "red";
    emptyRates.textContent = "*This field is required"; 
    return;
  } 

  if (principal !== '') {
    emptyPrincipal.textContent = '';
}
if (term !== '') {
    emptyTerm.textContent = '';
    spanterm.style.backgroundColor = " hsl(202, 86%, 94%)"; 
    spanterm.style.color = "black";
}
if (rates !== '') {
    emptyRates.textContent = '';
    spanrate.style.backgroundColor = " hsl(202, 86%, 94%)"; 
}


  if (!repaymentMode && !interestMode) { 
    emptyModes.style.color = "red";
    emptyModes.textContent = "*This field is required"; 
    return;
  } 


  const p = parseFloat(principal);
  const r = parseFloat(rates) / 100 / 12;
  const t = parseInt(term);
  
  if (isNaN(p) || isNaN(r) || isNaN(t)) {
      console.error("Invalid input detected");
      return;
  }
  
  if (p <= 0 || r <= 0 || t <= 0) {
    emptyPrincipal.textContent = "Invalid input: Values must be positive";
    return;
}


  if (repaymentMode) { 
    emptyimage.style.display = "none";
    resultHead.style.display = "block";
    resultDescription.style.display = "block"; 
    resultsDescription.style.display = "block";
    totalResultDescription.style.display = "block";
    results.style.display = "block";
    const monthlyPayment = p * (r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    const paymentHolder = monthlyPayment.toFixed(2)
    monthlyResult.textContent = `€  ${paymentHolder}`;
    totalResults.textContent = (monthlyPayment * t).toFixed(2);
   
  } 

  if (interestMode) { 
    emptyimage.style.display = "none";
    resultHead.style.display = "block";
    resultDescription.style.display = "block"; 
    resultsDescription.style.display = "block";
    results.style.display = "block";
    const monthlyRate = p * r; 
    monthlyResult.textContent = monthlyRate.toFixed(2); 
    const totalResultHolder =  (monthlyRate * t).toFixed(2);
    totalResults.textContent = `€  ${totalResultHolder}`;
  }
});
