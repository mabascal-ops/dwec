window.addEventListener("load", hasiera, true);

let abisoPasahitza;

function hasiera() {
  document.getElementById("erabiltzailea").addEventListener("blur", balidatuErabiltzailea);
  document.getElementById("pasahitza").addEventListener("focus", ezabatuPasahitza);
  document.getElementById("pasahitza").addEventListener("blur", baieztatuPasahitza);
  document.getElementById("sartuPasahitza").addEventListener("click", abisuaEzeztatu);

  abisoPasahitza = setTimeout(function () {
    alert("¡Azkar, sartu pasahitza!");
  }, 10000);
}

function balidatuErabiltzailea(e) {
  const luzera = e.target.value.length;

  if (luzera < 7 || luzera > 15) {
    alert("Erabiltzaileak 7 eta 15 karaktere izan behar ditu.");
  }
}

function ezabatuPasahitza(e) {
  e.target.value = "";
}

function baieztatuPasahitza(e) {
  const pasahitza = e.target.value;
  const daukaLetra = /[a-zA-Z]/.test(pasahitza);
  const daukaZenbakia = /[0-9]/.test(pasahitza);

  if (!daukaLetra || !daukaZenbakia) {
    alert("Pasahitza letrak eta zenbakiak izan behar ditu.");
  }
}

function abisuaEzeztatu() {
  clearTimeout(abisoPasahitza);
}
