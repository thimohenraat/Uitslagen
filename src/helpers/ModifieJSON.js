export function isUnique(val) {
    return val.filter((thing, index, self) =>
        index === self.findIndex((t) =>
            t.atleet === thing.atleet &&
            t.resultaat === thing.resultaat &&
            t.wedstrijd === thing.wedstrijd 
        )
    );
}


export function deleteNaN(val) {
    const validNummer = (item) => {
        let nummer = parseFloat(item.resultaat.replace(":", "").replace(",", ""));
        if (isNaN(nummer)) {
          return false
        }
        return true;
    }
      
    return val.filter(validNummer);
}