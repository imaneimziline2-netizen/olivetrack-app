import { calculerRendement } from "../../src/utils/rendementCalculator.js";

describe("calculerRendement", () => {
    test("calcule correctement un rendement de 20%", () => {
        const rendement = calculerRendement(20, 100); // 20kg huile / 100kg olives
        expect(rendement).toBe(20);
    });

    test("calcule correctement un rendement avec décimale", () => {
        const rendement = calculerRendement(15, 70); // 15/70*100 = 21.428
        expect(rendement).toBe(21.4); 
    });

    test("calcule un rendement faible correctement", () => {
        const rendement = calculerRendement(5, 100);
        expect(rendement).toBe(5);
    });

    test("calcule un rendement élevé correctement", () => {
        const rendement = calculerRendement(30, 100);
        expect(rendement).toBe(30);
    });

    test("lève une erreur si la quantité d'olives est zéro (division par zéro)", () => {
        expect(() => calculerRendement(10, 0)).toThrow("La quantité d'olives doit être positive");
    });

    test("lève une erreur si la quantité d'olives est négative", () => {
        expect(() => calculerRendement(10, -50)).toThrow();
    });
});