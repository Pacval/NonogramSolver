import { SquareValue } from './square.model';

export class LineSolutions {

    length: number;
    nbSegments: number;
    nbSpaceMinBetweenSegments: number; // espaces obligatoires entre les sergements -> ex 2 segments 1 espace min
    nbFreeSpaces: number;

    clues: number[];

    solutions: SquareValue[][];

    constructor(length: number, clues: number[]) {
        this.length = length;
        this.nbSegments = clues.length;
        this.nbSpaceMinBetweenSegments = this.nbSegments === 0 ? 0 : this.nbSegments - 1;
        
        // nombre d'espaces "libres" = longueur de la ligne - (somme des segments + nombre mini d'espaces)
        this.nbFreeSpaces = clues.length > 0 ? length - (clues.reduce(function (a, b) { return a + b; }) + this.nbSpaceMinBetweenSegments) : length;
        
        this.clues = clues;
        this.solutions = [];

        this.generateAllSolutions();
    }

    /**
     * Génère toutes les solutions de ligne possibles en fonction des indices et de la longueur
     */
    private generateAllSolutions() {

        // 2 cas particuliers : ligne toute remplie ou toute vide
        if (this.nbFreeSpaces === 0) {
            this.solutions.push(Array(this.length).fill(SquareValue.FILLED));
            return;
        }

        if (this.nbFreeSpaces === this.length) {
            this.solutions.push(Array(this.length).fill(SquareValue.EMPTY));
            return;
        }

        // On a éliminé les 2 cas spéciaux on passe aux cas classiques

        // Pour générer tous les cas possibles, on va se servir de la récursivité et des espaces libres
        this.recursivMethod([], this.nbFreeSpaces, this.clues);

    }

    private recursivMethod(line: SquareValue[], freeSpaces: number, segmentsLeft: number[]) {
        if (segmentsLeft.length === 0) {
            // on finit d'ajouter les espaces restants
            for (let i = 0; i < freeSpaces; i++) {
                line.push(SquareValue.EMPTY);
            }

            this.solutions.push(line);

        } else {
            for (let i = 0; i <= freeSpaces; i++) {
                let tmpLine = line.slice()
                console.log('i : ' + i);
                // on ajoute un nombre i d'espaces libres à la ligne
                for (let j = 0; j < i; j++) {
                    tmpLine.push(SquareValue.EMPTY);
                }

                // on ajoute ensuite un segment (le 1er qui arrive)
                for (let j = 0; j < segmentsLeft[0]; j++) {
                    tmpLine.push(SquareValue.FILLED);
                }

                // on ajoute un espace obligatoire si ce n'est pas le dernier segment
                if(segmentsLeft.length > 1) {
                    tmpLine.push(SquareValue.EMPTY);
                }

                // on utilise la récursivité
                this.recursivMethod(tmpLine, freeSpaces - i, segmentsLeft.slice(1));
            }
        }
    }
}