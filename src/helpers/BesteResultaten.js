export function getBesteResultaten(rows) {
    Array.prototype.groupBy = function(key) {
        return this.reduce(function (r, a, i) {
            if (!i || r[r.length - 1][0][key] !== a[key]) {
                return r.concat([[a]]);
            }
            r[r.length - 1].push(a);
            return r;
        }, []);
    };

    let besteResultaten = [];

    rows.sort((a,b) => (a.categorie > b.categorie) ? 1 : ((b.categorie > a.categorie) ? -1 : 0));
    let gesorteerdCategorie = rows.groupBy("categorie");

    for (const element of gesorteerdCategorie) {
        element.sort((a,b) => (a.onderdeel > b.onderdeel) ? 1 : ((b.onderdeel > a.onderdeel) ? -1 : 0));
        let gesorteerdOnderdeel = element.groupBy("onderdeel");
        for (const element of gesorteerdOnderdeel) {
            besteResultaten.push(element[0]);
        }
    }

    return besteResultaten
}