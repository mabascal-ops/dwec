const manejador1 = function(e) {
    if (e.type == "mouseover") {
        document.getElementById("eventos").style.color = "red";
    } else {
        document.getElementById("eventos").style.color = "blue";
    }
    /**
    if (e.target.id == "parrafo1") {
        alert("Has clickado en el Parrafo 1");
    }
    if (e.target.id == "parrafo2") {
        alert("Has clickado en el Parrafo 2");
    }
    */
};
const manejador2 = function(e) {
    alert("Has clickado en el " + e.target.id);
}

document.getElementById("eventos").addEventListener("mouseover", manejador1);
document.getElementById("eventos").addEventListener("mouseout", manejador1);
/**
document.getElementById("parrafo1").addEventListener("click", manejador1);
document.getElementById("parrafo2").addEventListener("click", manejador1);
*/
let arrayP = document.getElementsByTagName("p");
for (let i = 0; i < arrayP.length; i++) {
    arrayP[i].addEventListener("click", manejador2);
};