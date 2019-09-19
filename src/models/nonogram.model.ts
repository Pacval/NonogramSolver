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
    solveNonogram() {
        let blocked = false;
        while(!this.isCompleted() && !blocked) {
            blocked = !this.solveHorizontals() && !this.solveVerticals();
        }
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
        let change: boolean;
        for (let i = 0; i < this.horizontalSolutions.length; i++) {
            
            const newLine = this.horizontalSolutions[i].solve(this.grid[i]);

            change = (JSON.stringify(this.grid[i]) !== JSON.stringify(newLine));

            // on met à jour le grid (pour les lignes c'est plutot simple, on remplace juste le tableau)
            this.grid[i] = newLine;
        };

        return change;
    }

    /**
     * Solutionne les lignes verticales
     * 
     * Retourne true si la ligne a changé, false sinon
     */
    private solveVerticals(): boolean {
        let change: boolean;
        for (let i = 0; i < this.verticalSolutions.length; i++) {

            // on récupère la ligne verticale (on passe par une copie de grid)
            let currentVerticalLine = [];
            for (let j = 0; j < this.lengthHorizontal; j++) {
                currentVerticalLine.push(this.grid[j][i]);
            }

            const newLine = this.verticalSolutions[i].solve(currentVerticalLine);

            change = (JSON.stringify(currentVerticalLine) !== JSON.stringify(newLine));

            // on met à jour le grid (on recopie case par case)
            for (let j = 0; j < this.lengthHorizontal; j++) {
                this.grid[j][i] = newLine[i];
            }
        }

        return change;
    }

}