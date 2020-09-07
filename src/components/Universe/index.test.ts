import { Cell, countAliveNeighbors, applyRule } from "./Universe";

describe("Count alive neighbors", () => {
    it("On corner", () => {
        const cells = [
            [0, 0, 1, 1],
            [1, 1, 0, 0],
            [0, 0, 1, 1],
            [1, 0, 0, 1],
        ];
        expect(countAliveNeighbors(cells, 0, 0, 4, 4)).toEqual(5);
    });

    it("On leftmost edge", () => {
        const cells = [
            [0, 0, 1, 0],
            [1, 1, 0, 1],
            [0, 1, 0, 0],
            [0, 1, 0, 1],
        ];
        expect(countAliveNeighbors(cells, 1, 0, 4, 4)).toEqual(3);
    });

    it("No overwrap", () => {
        const cells = [
            [0, 0, 1, 0],
            [1, 1, 0, 1],
            [0, 1, 1, 0],
            [0, 1, 0, 1],
        ];
        expect(countAliveNeighbors(cells, 1, 1, 4, 4)).toEqual(4);
    });
});

describe("Determine a cell at next step", () => {
    it("Keeps alive with 2 neighbors", () => {
        expect(applyRule(Cell.Alive, 2)).toEqual(Cell.Alive);
    });

    it("Keeps alive with 3 neighbors", () => {
        expect(applyRule(Cell.Alive, 3)).toEqual(Cell.Alive);
    });

    it("Keeps alive with less than 2 neighbors", () => {
        const neighbors = satisfyingRandInt(0, 9, (num: number) => {
            return num < 2;
        });
        expect(applyRule(Cell.Alive, neighbors)).toEqual(Cell.Dead);
    });

    it("Keeps alive with more than 3 neighbors", () => {
        const neighbors = satisfyingRandInt(0, 9, (num: number) => {
            return num > 3;
        });
        expect(applyRule(Cell.Alive, neighbors)).toEqual(Cell.Dead);
    });

    it("Revives with 3 neighbors", () => {
        expect(applyRule(Cell.Dead, 3)).toEqual(Cell.Alive);
    });

    it("Keeps dead", () => {
        const neighbors = satisfyingRandInt(0, 9, (num: number) => {
            return num !== 3;
        });
        expect(applyRule(Cell.Dead, neighbors)).toEqual(Cell.Dead);
    });

});

const satisfyingRandInt = (min: number, max: number, predicate: (num: number) => boolean): number => {
    const randInt = () => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    let rand = randInt();
    while (!predicate(rand)) {
        rand = randInt();
    }
    return rand;
};