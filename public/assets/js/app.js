function somar() {
  let num1 = document.getElementById("num1").value;
  let num2 = document.getElementById("num2").value;

  let sum = Number(num1) + Number(num2);

  document.getElementById("soma").textContent = sum;
}

// ligação do botão à função
document.getElementById("somarBtn").addEventListener("click", somar);