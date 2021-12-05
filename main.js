// SUPERKVÍZ - cílem je naprogramovat klasický kvíz.
// Tj. uživatelce se postupně ukazují otázky a u každé má na výběr
// z několika možných odpovědí. Když na jednu odpověď klikne, posune
// se na další otázku. Když odpoví na všechny otázky, ukáže se jí
// hodnocení úspěšnosti v procentech a pod tím seznam s výsledkem.
// V seznamu bude vždy otázka, její odpověď a správná odpověď.

// Při vytváření HTML pro odpovědi dodrž následující strukturu:

// <ul id="odpovedi">
//     <li data-odpoved="0">Ledová královna</li>
//     <li data-odpoved="1">Sněhurka</li>
//     <li data-odpoved="2">Já, já jsem nejkrásnější!</li>
// </ul>

// Takto připravené HTML pak pokaždé vlož na stránce do <div id="moznosti">
// Musíš nejprve smazat ten starý seznam, který už tam je.



// Data pro kvíz jsou uložena v poli otazky. Každa otázka je objekt,
// který obsahuje otázku, obrázek k otázce, pole možných odpovědí
// a index správné odpovědi.
/*

Ve funkci priKliknutiNaOdpoved() máme připravenou podmínku, která
buď skočí na další kvízovou otázku, nebo ... a to musíš dodělat ...
by se do větvě else mělo přidat colání funkce, která se postará
o vyhodnocení kvízu.

Takže:
- Napiš funkci pro vyhodnocení kvízu
- Volej ji z funkce priKliknutiNaOdpoved po zodpovězení poslední otázky


PRO VŠECHNY:
------------

 1) Skryj kvíz, zobraz výsledek

    V HTML jsou dva <div>y, jeden má na sobě třídu "kviz", druhý má třídu
    "vysledek". Při dokončení kvízu skryj kvíz a zobraz výsledek. Použij
    nastavení CSS vlastnosti display na hodnotu none/block, jak jsme to
    pro skrývání/zobrazování dělali už dřív.


 2) Vypiš výsledek testu

    Uvnitř <div>u pro výsledek je další <div>, který má id="hodnoceni".
    Dovnitř tohoto textu vypiš vyhodnocení.

    Jako "povinná část" tohoto nepovinného úkolu je vyhodnotit úspěšnost
    v kvízu. Tj. napsat, že uživatel správně odpověděl na 2 otázky a ze 3,
    tudíž jeho úspěšnost je 67%.

    Poznámka:
    Kvíz se kompletně generuje z dat v poli, aby byl univerzální a snadno se
    dal upravit nebo aktualizovat jen změnou dat. Takže nepočítej s tím, že má
    vždy jen 3 otázky, ale zjisti si délku pole s otázkami.


BONUSY:
-------

 3) Proveď kompletní vyhodnocení testu, jak je ukázané na přiloženém obrázku
    superkviz-vyhodnoceni.png. Tj. zobraz vždy otázku a napiš pod ní odpověď
    uživatele a zda to bylo správně nebo špatně. Pokud to bylo špatně, zobraz
    i správnou odpověď.

    Chceš-li, aby výsledek vypadal jako můj vzor na obrázku, generuj výpis
    pomocí těchto značek:

		Pro každou otázku ve vyhodnocení:

		<h3>1. Text otázky?</h3>
		<p>Tvoje odpověď: Kočičák</p>
		<p>Správná odpověď: Mončičák</p>
			... nebo ...
		<p>To je správně</p>

		A na konci potom vyhodnocení:

		<h2>Správně 2 ze 3 otázek. Úspěšnost 67 %.</h2>


 4) Přidej pod vyhodnocení tlačítko pro spuštění testu znovu.
    Nezapomeň, že před testem budeš muset vymazat pole s uloženými
    odpověďmi a možná i nějaké další "čištění".


 5) Napiš variantu kvízu, kde je v základním souboru připraveno více
    otázek (musíš si je vymyslet). Při spuštění vyber z celé sady otázek
    3 náhodné a ty pak zobrazuj v kvízu.

    Dej pozor, otázky se samozřejmě nesmí v rámci jednoho kvízu opakovat.
    Inspiruj se příkladem pro losování sportky, který jsme dělali v jedné
    lekci.
*/

// otazky[0].odpovedi[1] → pro zobrazení mončičáka

const otazky = [{
		otazka: 'Co je ikonická hračka z 80. let?',
		obrazek: 'moncicak.jpg',
		odpovedi: [
			'Kočičák',
			'Mončičák',
			'Opičák'
		],
		spravna: 1
	},
	{
		otazka: 'Jaké je Luďkovo nejoblíbenější ovoce?',
		obrazek: 'ovoce.jpg',
		odpovedi: [
			'Kokos',
			'Melounek',
			'Jahoda',
			'Ani jedna z možností'
		],
		spravna: 3
	},
	{
		otazka: 'Pro úspěšné absolvování kurzu je potřeba...',
		obrazek: 'pivo.jpg',
		odpovedi: [
			'Umět JavaScript',
			'Chodit po kurzu do hospody',
		],
		spravna: 0
	}
];

const poradi = document.querySelector("#poradi")
const otazka = document.querySelector("#otazka")
const obrazek = document.querySelector("#obrazek")
const moznosti = document.querySelector("#moznosti")

const vysledek = document.querySelector(".vysledek")
const kviz = document. querySelector(".kviz")
const hodnoceni = document.querySelector("#hodnoceni")

let aktualniOtazka = 0
let mojeOdpovedi = []

moznosti.addEventListener("click", priKliknutiNaOdpoved)

function zobrazOtazku() {
    poradi.textContent = "Otazka " + (aktualniOtazka + 1) + " / " + (otazky.length + 1)
    otazka.textContent = otazky[aktualniOtazka].otazka
    obrazek.src = "obrazky/" + otazky[aktualniOtazka].obrazek
    let odpovedi = otazky[aktualniOtazka].odpovedi
    let seznam = document.createElement('ul')
    seznam.id = "odpovedi"
    for(let i = 0; i < odpovedi.length; i++) {
        let novaPolozka = document.createElement('li')
        novaPolozka.textContent = odpovedi[i]
        novaPolozka.dataset.odpoved = i
        seznam.appendChild(novaPolozka)
    }
	
    document.querySelector("#odpovedi").remove()
    moznosti.appendChild(seznam)
}

function priKliknutiNaOdpoved(udalost) {
	zobrazOtazku()
    console.log(udalost.target)
	mojeOdpovedi.push(udalost.target.textContent)
    //zaznamenani odpovedi (push)
	console.log(mojeOdpovedi)
    aktualniOtazka++ // 0 -> 1
  
	if (aktualniOtazka > otazky.length) {
		zobrazVyhodnoceni();
	}
}

function zobrazVyhodnoceni() {
	kviz.classList.add("display:block;")
	vysledek.classList.remove("display")

	let odpovediSeznam = document.createElement('li');

	for (let i = 0; i < mojeOdpovedi.length; i++){
		odpovediSeznam.appendChild(i);
	}
}