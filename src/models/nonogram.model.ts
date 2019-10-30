import { LineSolutions } from './line-solutions.model';
import { Square } from './square.model';

export class Nonogram {

    lengthHorizontal: number;
    lengthVertical: number;

    grid: Square[][];

    horizontalSolutions: LineSolutions[];
    verticalSolutions: LineSolutions[];

    constructor(lengthHorizontal: number, lengthVertical: number, cluesForHorizontals: number[][], cluesForVerticals: number[][]) {
        this.lengthHorizontal = lengthHorizontal;
        this.lengthVertical = lengthVertical;

        this.horizontalSolutions = [];
        cluesForHorizontals.forEach(element => {
            this.horizontalSolutions.push(new LineSolutions(lengthHorizontal, element));
        });

        this.verticalSolutions = [];
        cluesForVerticals.forEach(element => {
            this.verticalSolutions.push(new LineSolutions(lengthVertical, element));
        });
    }

    /**
     * Résolution
     */
    solveNonogram(): Square[][] {

        // instantiation grid
        this.grid = [];
        for (let i = 0; i < this.lengthVertical; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.lengthHorizontal; j++) {
                this.grid[i][j] = Square.NOTFOUND;
            }
        }

        let forward = true;
        while (!this.isCompleted() && forward) {
            const changeHorizontals = this.solveHorizontals();
            const changeVerticals = this.solveVerticals();
            forward = changeHorizontals || changeVerticals;
        }

        return this.grid;
    }

    private isCompleted() {
        return this.grid.every(element => element.every(subElement => subElement != Square.NOTFOUND));
    }

    /**
     * Solutionne les lignes horizontales
     * 
     * Retourne true si la ligne a changé, false sinon
     */
    private solveHorizontals(): boolean {
        let change = false;
        for (let i = 0; i < this.horizontalSolutions.length; i++) {

            let currentHorizontalLine = this.grid[i];

            // on process que s'il reste des cases non trouvées
            if (currentHorizontalLine.some(element => element === Square.NOTFOUND)) {

                const newLine = this.horizontalSolutions[i].solve(currentHorizontalLine);

                change = change || (JSON.stringify(currentHorizontalLine) !== JSON.stringify(newLine));

                // on met à jour le grid (pour les lignes c'est plutot simple, on remplace juste le tableau)
                this.grid[i] = newLine;
            }
        };

        return change;
    }

    /**
     * Solutionne les lignes verticales
     * 
     * Retourne true si la ligne a changé, false sinon
     */
    private solveVerticals(): boolean {
        let change = false;
        for (let i = 0; i < this.verticalSolutions.length; i++) {

            // on récupère la ligne verticale (on passe par une copie de grid)
            let currentVerticalLine = [];
            for (let j = 0; j < this.lengthHorizontal; j++) {
                currentVerticalLine.push(this.grid[j][i]);
            }

            // on process que s'il reste des cases non trouvées
            if (currentVerticalLine.some(element => element === Square.NOTFOUND)) {

                const newLine = this.verticalSolutions[i].solve(currentVerticalLine);

                change = change || (JSON.stringify(currentVerticalLine) !== JSON.stringify(newLine));

                // on met à jour le grid (on recopie case par case)
                for (let j = 0; j < this.lengthHorizontal; j++) {
                    this.grid[j][i] = newLine[j];
                }
            }
        }

        return change;
    }

}