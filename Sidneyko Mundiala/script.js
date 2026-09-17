const esaldia =
  "La selección femenina de España se ha proclamado campeona del Mundial después de derrotar a Inglaterra en la gran final de Sidney";

console.log("Esaldia:", esaldia);

// 1. Esaldiak dituen karaktere kopurua.
console.log("1. Karaktere kopurua:", esaldia.length);

// 2. 25. posizioa (JavaScript-en posizioak 0tik hasten dira).
console.log("2. 25. posizioko karakterea:", esaldia.charAt(25));

// 3. Lehenengo d-a, azken d-a eta bigarren d-a.
const lehenD = esaldia.indexOf("d");
const azkenD = esaldia.lastIndexOf("d");
const bigarrenD = esaldia.indexOf("d", lehenD + 1);
console.log("3. Lehenengo d-aren posizioa:", lehenD);
console.log("   Azken d-aren posizioa:", azkenD);
console.log("   Bigarren d-aren posizioa:", bigarrenD);

// 4. "Mundial" hitzaren hasierako posizioa.
console.log('4. "Mundial" hitzaren posizioa:', esaldia.indexOf("Mundial"));

// 5. "Portugal" hitza esaldian dagoen egiaztatu.
console.log('5. "Portugal" existitzen da?', esaldia.includes("Portugal"));

// 6. Esaldia "Sidney"-rekin hasi edo amaitzen den egiaztatu.
console.log('6. "Sidney"-rekin hasten da?', esaldia.startsWith("Sidney"));
console.log('   "Sidney"-rekin amaitzen da?', esaldia.endsWith("Sidney"));

// 7. Data gehitu eta emaitza aldagai batean gorde.
const esaldiaDatarekin = esaldia.concat(" 2023ko abustuaren 20an");
console.log("7. Data duen esaldia:", esaldiaDatarekin);

// 8. 26. eta 35. posizioen arteko karaktereak (biak barne).
const karaktereak26_35 = esaldiaDatarekin.substring(26, 36);
console.log("8. 26-35 posizioen arteko karaktereak:", karaktereak26_35);

// 9. 40. posiziotik aurrerako karaktereak.
const karaktereak40tikAurrera = esaldiaDatarekin.substring(40);
console.log("9. 40. posiziotik aurrera:", karaktereak40tikAurrera);

// 10. Bost zuriune aurrean eta hamar atzean gehitu, eta gero ezabatu.
const zuriunedunEsaldia = esaldia.padStart(esaldia.length + 5, " ").padEnd(esaldia.length + 15, " ");
console.log("10. Zuriunedun esaldia:", JSON.stringify(zuriunedunEsaldia));
console.log("    Zuriuneak ezabatu ondoren:", zuriunedunEsaldia.trim());

// 11. Letra xehez eta letra larriz.
console.log("11. Letra xehez:", esaldia.toLowerCase());
console.log("    Letra larriz:", esaldia.toUpperCase());

// 12. Esaldia hitzen array bihurtu.
const hitzak = esaldia.split(" ");
console.log("12. Hitzak array batean:", hitzak);

// 13. Aurreko arrayko 0, 6 eta 11 posizioak atera.
console.log("13. 0, 6 eta 11 posizioak:", [hitzak[0], hitzak[6], hitzak[11]]);

// Erabilitako propietate eta metodoen zerrenda.
console.log("--- String propietate eta metodoen laburpena ---");
console.log("length (propietatea): kate baten karaktere kopurua erakusten du.");
console.log("charAt(): adierazitako posizioko karakterea itzultzen du.");
console.log("indexOf(): testu baten lehen agerpenaren posizioa itzultzen du.");
console.log("lastIndexOf(): testu baten azken agerpenaren posizioa itzultzen du.");
console.log("includes(): kateak testu bat duen ala ez adierazten du.");
console.log("startsWith(): katea testu jakin batekin hasten den egiaztatzen du.");
console.log("endsWith(): katea testu jakin batekin amaitzen den egiaztatzen du.");
console.log("concat(): kate bat edo gehiago elkartzen ditu.");
console.log("substring(): hasiera eta amaiera posizioen arteko zatia itzultzen du, lehenengoa barne eta azkena ez.");
console.log("padStart(): hasieran karaktereak gehitzen ditu luzera jakin batera iritsi arte.");
console.log("padEnd(): amaieran karaktereak gehitzen ditu luzera jakin batera iritsi arte.");
console.log("trim(): hasierako eta amaierako zuriuneak ezabatzen ditu.");
console.log("toLowerCase(): katea letra xehez bihurtzen du.");
console.log("toUpperCase(): katea letra larriz bihurtzen du.");
console.log("split(): katea array batean zatitzen du, bereizle bat erabiliz.");