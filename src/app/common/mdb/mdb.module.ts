import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonsModule, DropdownModule, IconsModule, NavbarModule } from "angular-bootstrap-md";

@NgModule({
	declarations: [],
	imports: [CommonModule],
	exports: [IconsModule, NavbarModule, ButtonsModule, DropdownModule],
})
export class MdbModule {}
