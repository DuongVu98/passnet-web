import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { EditorModule } from "primeng/editor";
import { InputTextModule } from "primeng/inputtext";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { DropdownModule } from "primeng/dropdown";
import { MenuModule } from "primeng/menu";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TabViewModule } from "primeng/tabview";
import { AccordionModule } from "primeng/accordion";
import { ContextMenuModule } from "primeng/contextmenu";

const primengComponents = [
	CardModule,
	ButtonModule,
	DialogModule,
	EditorModule,
	InputTextModule,
	ScrollPanelModule,
	DropdownModule,
	MenuModule,
	InputTextareaModule,
	TabViewModule,
	AccordionModule,
	ContextMenuModule,
];

@NgModule({
	declarations: [],
	imports: [CommonModule, primengComponents],
	exports: [primengComponents],
})
export class PrimengModule {}
