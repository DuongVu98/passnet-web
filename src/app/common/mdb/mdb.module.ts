import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonsModule, DropdownModule, IconsModule, NavbarModule } from "angular-bootstrap-md";
// For MDB Angular Free
import { WavesModule } from "angular-bootstrap-md";

@NgModule({
	declarations: [],
	imports: [CommonModule, DropdownModule.forRoot()],
	exports: [IconsModule, NavbarModule, ButtonsModule, DropdownModule, WavesModule],
})
export class MdbModule {}
