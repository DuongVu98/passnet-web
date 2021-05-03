import { Component, OnInit } from "@angular/core";

@Component({
	selector: "classroom-classroom-space",
	templateUrl: "./classroom-space.component.html",
	styleUrls: ["./classroom-space.component.scss"],
})
export class ClassroomSpaceComponent implements OnInit {

    navigations;

	constructor() {
        this.navigations = [
            {
                name: "Discussion",
                link: "/",
                icon: "groups"
            },
            {
                name: "Assignments",
                link: "/",
                icon: "assignment_turned_in"
            },
            {
                name: "Files",
                link: "/",
                icon: "description"
            }
        ]
    }

    ngOnInit() {
    }
}
