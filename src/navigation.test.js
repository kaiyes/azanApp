const navigation = require("./navigation")
// @ponicode
describe("navigation.default", () => {
    test("0", () => {
        let callFunction = () => {
            navigation.default({ navigation: "http://www.example.com/route/123?foo=bar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            navigation.default({ navigation: "ponicode.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            navigation.default({ navigation: "https://api.telegram.org/" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            navigation.default({ navigation: "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            navigation.default({ navigation: "www.google.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            navigation.default({ navigation: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})
