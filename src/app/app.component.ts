import { Component, OnInit } from '@angular/core';

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

    ngOnInit() {
        this.nbrHorizontalCases = 1;
        this.nbrVerticalCases = 1;
        this.maxClues = 1;
    }

    createGrid() {
        this.horizontalLength = this.nbrHorizontalCases + this.maxClues;
        this.verticalLength = this.nbrVerticalCases + this.maxClues;
        this.nbClues = this.maxClues;

        this.displayGrid = true;
    }

    /**
     * Fonction permettant la génération d'une liste de nombres à partir du maximum de cette liste
     */
    createRangeFrom0(number) {
        var items: number[] = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }

    /**
     * Lance la résolution du picross
     */
    launch() {

    }

}
