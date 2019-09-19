import { Square } from './square.model';

export class Nonogram {

    lengthHorizontal: number;
    lengthVertical: number;

    grid: Square[];

    cluesForHorizontals: number[][];
    cluesForVerticals: number[][];


    constructor(lengthHorizontal: number, lengthVertical: number, cluesForHorizontals: number[][], cluesForVerticals: number[][]) {
        this.lengthHorizontal = lengthHorizontal;
        this.lengthVertical = lengthVertical;

        this.cluesForHorizontals = cluesForHorizontals;
        this.cluesForVerticals = cluesForVerticals;
    }

}