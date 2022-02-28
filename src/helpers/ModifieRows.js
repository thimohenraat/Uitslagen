export function getNewRows() {
    let newTabel = [];
    let table = document.getElementsByClassName("table")[0].tBodies[0].rows;
    let rowLength = table.length;

    for (let i = 0; i < rowLength; i++) {
        let cells = table.item(i).cells;
        let cellLength = cells.length;

        let newArray = [];
        for (let j = 0; j < cellLength; j++) {
            let cellVal = cells.item(j).innerHTML;
            newArray.push(cellVal);
            if (j === 4) {
            newTabel.push(newArray);
            newArray = [];
            }
        }
    }

    let newRows = [];
    newTabel.forEach((item, i) => {
        let atleet = item[0];
        let categorie = item[1];
        let onderdeel = item[2];
        let resultaat = item[3];
        let wedstrijd = item[4];
        wedstrijd = wedstrijd.replace('&nbsp;',' ');
        if (newRows[i] === undefined) {
            newRows[i] = {
            atleet: atleet,
            categorie: categorie,
            onderdeel: onderdeel,
            resultaat: resultaat,
            wedstrijd: wedstrijd,
            };
        }
    });

    return newRows;
}
