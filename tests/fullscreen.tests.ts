import { closeFullscreen, openFullscreen } from "../src";

describe("Tests checking method [openFullscreen/closeFullscreen]", function () {
    it("Opens and closes with no error", function () {
        let err = false;
        let newEL = document.createElement("div");
        document.body.appendChild(newEL);
        try {
            openFullscreen(newEL);
            closeFullscreen();
        } catch (e) {
            err = true;
        }
        newEL.remove();
        expect(err).toBeFalse();
    })

    it("Not added element", function () {
        let err = false;
        let newEL = document.createElement("div");
        try {
            openFullscreen(newEL);
            closeFullscreen();
        } catch (e) {
            err = true;
        }
        newEL.remove();
        expect(err).toBeFalse();
    })

    it("Throws an error when incorrect element is passed", function () {
        let err = false;
        try {
            openFullscreen(null);
            closeFullscreen();
        } catch (e) {
            err = true;
        }
        expect(err).toBeTrue();
    })
})