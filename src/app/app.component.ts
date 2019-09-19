import { Component, OnInit } from '@angular/core';
import { LineSolutions } from 'src/models/line-solutions.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    ngOnInit() {

        let lineSolution = new LineSolutions(10, []);

        console.log(lineSolution.solutions);
    }

}
