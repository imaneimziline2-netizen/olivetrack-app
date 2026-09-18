import { detecterAnomalie } from "../../src/utils/anomalyDetector.js";

test("détecte une baisse significative", () => {
    const result = detecterAnomalie(12, [20, 19, 21]); 
    console.log(result);
    expect(result.alerte).toBe(true);
});