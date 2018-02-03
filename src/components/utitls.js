const continty = function(arr) {
    arr = arr.sort()
    const diff = 86400000
    let result = true
    for(let index = 1; index < arr.length; index +=2) {
        const curr = arr[index]
        const prev = arr[--index]
        const d = curr - prev
        // console.log('diff', d)
        if(d !== diff) {
            result = false
            break
        }
    }
    return result

}

export default continty

if(require.main === module) {
    const arr1 = [
        1510848000000,
        1511020800000,
        1510934400000,
        1511366400000,
        1511539200000
    ]
    //
    // const arr2 = [0, 1, 4, 6, 8]
    // console.log('test 2', continty(arr2))``
}

