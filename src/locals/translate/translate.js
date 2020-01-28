export function translate(str,language) {
    if (!str) return
    if (language === 'en') return  str[0].toUpperCase() + str.slice(1);
    let res = '';
    const string = str.toLowerCase();
    for (const char of string){
        if (letters[char]){
            res += letters[char];
        }else {
            res +=char;
        }
    }
    return res;
}
const letters = {
    "a": "א",
    "b": "ב",
    "c": "ס",
    "d": "ד",
    "e": "י",
    "f": "פ",
    "g": "ג",
    "h": "ה",
    "i": "י",
    "j": "ג",
    "k": "ק",
    "l": "ל",
    "m": "מ",
    "n": "נ",
    "o": "ו",
    "p": "פ",
    "q": "ק",
    "r": "ר",
    "s": "ס",
    "t": "ט",
    "u": "א",
    "v": "ב",
    "w": "וו",
    "x": "אקס",
    "y": "יי",
    "z": "ז"
};



