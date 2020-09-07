import React, { useState } from "react";

type Props = {
    width: number;
    height: number;
    cells: Cell[][];
};

export enum Cell {
    Alive,
    Dead,
}

export const Universe = ({ width, height, cells }: Props) => {
    // 2-dimentional array to represent universe.
    const [universe, setUniverse] = useState(cells);

    const tick = () => {
        let next = Array<Cell[]>(height).fill(Array(width).fill(Cell.Dead));
        for (const row of Array(height).keys()) {
            for (const col of Array(width).keys()) {
                const aliveNeighbors = countAliveNeighbors(
                    universe,
                    row,
                    col,
                    width,
                    height
                );
                const nextCell = applyRule(universe[row][col], aliveNeighbors);
                next[row][col] = nextCell;
            }
        }
        setUniverse(next);
    };
};

export const countAliveNeighbors = (
    cells: Cell[][],
    row: number,
    col: number,
    width: number,
    height: number
): number => {
    let count = 0;
    for (const delta_row of [height - 1, 0, 1]) {
        for (const delta_col of [width - 1, 0, 1]) {
            if (delta_row === 0 && delta_col === 0) {
                continue;
            }
            const neighbor_row = (row + delta_row) % height;
            const neighbor_col = (col + delta_col) % width;
            count += cells[neighbor_row][neighbor_col];
        }
    }
    return count;
};

export const applyRule = (cell: Cell, aliveNeighbors: number): Cell => {
    if (cell === Cell.Alive) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            return Cell.Dead;
        } else if (aliveNeighbors === 2 || aliveNeighbors === 3) {
            return Cell.Alive;
        }
    } else {
        if (aliveNeighbors === 3) {
            return Cell.Alive;
        }
    }
    return cell;
};
