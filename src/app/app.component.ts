import { Component, OnInit } from '@angular/core';
import { Nonogram } from 'src/models/nonogram.model';
import { Square } from 'src/models/square.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    nbrHorizontalCases: number;
    nbrVerticalCases: number;
    maxClues: number;

    displayGrid = false;
    horizontalLength: number;
    verticalLength: number;
    nbClues: number;

    horizontalClues: number[][];
    verticalClues: number[][];

    finalGrid: Square[][];

    ngOnInit() {
        this.nbrHorizontalCases = 1;
        this.nbrVerticalCases = 1;
        this.maxClues = 1;
    }

    createGrid() {
        this.horizontalLength = this.nbrHorizontalCases + this.maxClues;
        this.verticalLength = this.nbrVerticalCases + this.maxClues;
        this.nbClues = this.maxClues;

        this.horizontalClues = [];
        for (let i = 0; i < this.nbrHorizontalCases; i++) {
            this.horizontalClues[i] = [];
        }

        this.verticalClues = [];
        for (let i = 0; i < this.nbrVerticalCases; i++) {
            this.verticalClues[i] = [];
        }

        this.finalGrid = [];
        for (let i = 0; i < this.nbrVerticalCases; i++) {
            this.finalGrid[i] = [];
            for (let j = 0; j < this.nbrHorizontalCases; j++) {
                this.finalGrid[i][j] = Square.NOTFOUND;
            }
        }



        this.displayGrid = true;
    }

    /**
     * Fonction permettant la génération d'une liste de nombres à partir du maximum de cette liste
     */
    createRangeFrom1(number) {
        var items: number[] = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }

    /**
     * Retourne la classe de la case du plateau, en fonction de son état
     */
    getGridCaseStyle(verticalPosition: number, horizontalPosition: number) {
        switch (this.finalGrid[verticalPosition - this.nbClues - 1][horizontalPosition - this.nbClues - 1]) {
            case Square.NOTFOUND:
                return 'case-grid-not-found';
            case Square.EMPTY:
                return 'case-grid-empty';
            case Square.FILLED:
                return 'case-grid-filled';
            default:
                return 'case-grid-not-found';
        }
    }

    /**
     * Lance la résolution du picross
     */
    launch() {
        // permet de supprimer tous les éléments nuls des tableaux d'indices (cases laissées à vide)
        const filteredHorizontalClues = [];
        for (let i = 0; i < this.horizontalClues.length; i++) {
            filteredHorizontalClues[i] = this.horizontalClues[i].filter(element => element);
        }
        const filteredVerticalClues = [];
        for (let i = 0; i < this.verticalClues.length; i++) {
            filteredVerticalClues[i] = this.verticalClues[i].filter(element => element);
        }

        // on crée notre objet nonogram
        let nonogram = new Nonogram(this.nbrHorizontalCases, this.nbrVerticalCases, filteredHorizontalClues, filteredVerticalClues);

        // on récupère le résultat
        this.finalGrid = nonogram.solveNonogram();
        console.log(this.finalGrid);
    }
}
