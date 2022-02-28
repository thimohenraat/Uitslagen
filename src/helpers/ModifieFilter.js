export function filterArray(val, filter) {
    let data = val.reduce((acc, it) => {
        acc[it[filter]] = (acc[it[filter]] || 0) + 1;
        return acc;
    }, {});
    
    let sortable = [];
    for (let filter in data) {
        sortable.push([filter, data[filter]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    let options = {};
    sortable.forEach(item => {
        let option = item[0];
        
        if (options[option] === undefined){
            options[option] = {
                name: item[0]+" | "+item[1],
                value: item[0].trim()
            };
        }
    });

    return  Object.values(options)
}
