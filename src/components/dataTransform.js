import names from '../task/names.json';

function transform(data) {
    const groupBy = data.reduce((acc, value, key) => {
        if (key === 1) {
            return { [acc.G]: [ acc ]};
        }

        if (!acc[value.G]) {
          acc[value.G] = [];
        }

        acc[value.G].push(value);
      
        return acc;
    });

    let result = [];
    for (let [key, values] of Object.entries(groupBy)) {
        result.push(
            {
                group: { id: key, name: names[key].G },
                values: values.map(el => {
                    return { name: names[key].B[el.T].N, ...el }
                })
            }
        );
    }
     
    return result;
}

export default transform