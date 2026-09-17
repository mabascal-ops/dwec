window.addEventListener("load", inicio, true);

const MESES = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11
};

function inicio() {
  document.getElementById("calcular").addEventListener("click", calcularFechas);
  calcularFechas();
}

function obtenerFecha(prefijo) {
  const mesTexto = document.getElementById(prefijo + "Mes").value.trim().toUpperCase();
  const dia = Number(document.getElementById(prefijo + "Dia").value);
  const ano = Number(document.getElementById(prefijo + "Ano").value);
  const hora = Number(document.getElementById(prefijo + "Hora").value);
  const minuto = Number(document.getElementById(prefijo + "Minuto").value);
  const mes = MESES[mesTexto];

  if (mes === undefined || !Number.isInteger(dia) || !Number.isInteger(ano) ||
      !Number.isInteger(hora) || !Number.isInteger(minuto)) {
    throw new Error("Eremu guztiak bete behar dira eta hilabetea JAN-DEC artekoa izan behar da.");
  }

  // Date lokalean sortzen da; horrela adibideak Espainiako ordu-eremuan ematen duen emaitza mantentzen da.
  const data = new Date(ano, mes, dia, hora, minuto, 0, 0);

  if (data.getFullYear() !== ano || data.getMonth() !== mes || data.getDate() !== dia ||
      data.getHours() !== hora || data.getMinutes() !== minuto) {
    throw new Error("Sartutako data ez da baliozkoa.");
  }

  return data;
}

function unitatea(kopurua, singularra, plurala) {
  return kopurua + " " + (kopurua === 1 ? singularra : plurala);
}

function kalkulatuIraupena(milisegundoak) {
  const segundoakGuztira = Math.floor(milisegundoak / 1000);
  const segundoak = segundoakGuztira % 60;
  const minutuakGuztira = Math.floor(segundoakGuztira / 60);
  const minutuak = minutuakGuztira % 60;
  const orduakGuztira = Math.floor(minutuakGuztira / 60);
  const orduak = orduakGuztira % 24;
  const egunGuztiak = Math.floor(orduakGuztira / 24);
  const urteak = Math.floor(egunGuztiak / 365);
  const egunak = egunGuztiak % 365;

  return { urteak, egunak, orduak, minutuak, segundoak };
}

function calcularFechas() {
  const mensaje = document.getElementById("mensaje");

  try {
    const presente = obtenerFecha("presente");
    const destino = obtenerFecha("destino");
    const diferencia = destino.getTime() - presente.getTime();

    if (diferencia === 0) {
      mensaje.textContent = "Ez zara denboran mugituko: uneko eta helmugako datak berdinak dira.";
      return;
    }

    const noranzkoa = diferencia > 0 ? "etorkizunera" : "iraganera";
    const iraupena = kalkulatuIraupena(Math.abs(diferencia));
    const zatia = [
      unitatea(iraupena.urteak, "urte", "urte"),
      unitatea(iraupena.egunak, "egun", "egun"),
      unitatea(iraupena.orduak, "ordu", "ordu"),
      unitatea(iraupena.minutuak, "minutu", "minutu"),
      unitatea(iraupena.segundoak, "segundo", "segundo")
    ];

    mensaje.textContent = noranzkoa + " " + zatia.join(", ") + " bidaiatuko dituzu.";
  } catch (error) {
    mensaje.textContent = error.message;
  }
}
