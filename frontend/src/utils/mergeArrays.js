export function mergeArrays(arrays) {
    let tempArr = [];
    arrays.forEach((arr) => tempArr.push(arr));
    return tempArr.flat()
}

// const result = mergeArrays([carBrands, otherCarBrands]);