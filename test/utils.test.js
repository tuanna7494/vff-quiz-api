const Utils = require('../utils/index');

describe('Testing remove single object', function () {
    test ("Testing must remove", function() {
        const obj = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };
        const result = Utils.removeListFieldObj(obj, ['a', 'b']);
    
        expect(result).toMatchObject({
            c: 3,
            d: 4
        })
    })

    test("testing not remove cause key not exist", function () {
        const obj = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };
        const result = Utils.removeListFieldObj(obj, ['e']);
    
        expect(result).toMatchObject({
            a: 1,
            b: 2,
            c: 3,
            d: 4
        })
    })

})