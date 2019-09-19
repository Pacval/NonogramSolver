import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    ngOnInit() {

        console.log([1, 2, 3] == [1, 2, 3]);
        console.log(JSON.stringify([1, 2, 3]) == JSON.stringify([1, 2, 3]));
    }

}
