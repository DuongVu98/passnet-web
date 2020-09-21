import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonsModule, DropdownModule, IconsModule, NavbarModule } from "angular-bootstrap-md";

@NgModule({
	declarations: [],
	imports: [CommonModule, DropdownModule.forRoot()],
	exports: [IconsModule, NavbarModule, ButtonsModule, DropdownModule],
})
export class MdbModule {}
