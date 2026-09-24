/**
function gehiketa (a, b) {
    return a + b;
}
console.log(gehiketa(13, 17));

function gehiketa (a, b) {
    return a - b;
}
console.log(gehiketa(13, 17));
*/

/**
const gehiketa = function (a, b) {
    return a + b;
}
console.log(gehiketa(13, 17));
*/

/**
const gehiketa = (a, b) => a + b;
console.log(gehiketa(13, 17));

const bez = (a) => a * 1.21;
console.log(bez(100));

const agurra = () => console.log("Kaixo!");
agurra();
*/

//CLOSURES
/**
const sortuKontadorea = () => {
    let kontadorea = 0;

    return () => {
        kontadorea++;
        return kontadorea;
    }
    //return () => ++kontadorea;
}
const handitu = sortuKontadorea();
console.log(handitu());
console.log(handitu());
console.log(handitu());
*/

const sortuKontua = function (saldoInicial) {
    let saldo = saldoInicial;

    return {
        sartuDirua(kantitatea) {
            saldo += kantitatea;
            return "Dirua satu da. Saldoa " + saldo;
        },
        ikusiSaldo() {
            return "Zure saldoa " + saldo + "€";
        }
    }
}
const markelenKontua = sortuKontua(1000);
console.log(markelenKontua.ikusiSaldo());
console.log(markelenKontua.sartuDirua(1000));
console.log(markelenKontua.ikusiSaldo());