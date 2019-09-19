export class Square {

    x: number; // ligne
    y: number; // colonne

    value: SquareValue;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.value = SquareValue.NOTFOUND;
    }
}

export enum SquareValue {
    NOTFOUND, // --> case pas encore trouvée
    FILLED,
    EMPTY, // --> case forcément vide
}