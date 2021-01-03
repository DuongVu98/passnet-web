import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { EditorModule } from "primeng/editor";
import { InputTextModule } from "primeng/inputtext";

const primengComponents = [CardModule, ButtonModule, DialogModule, EditorModule, InputTextModule];

@NgModule({
	declarations: [],
	imports: [CommonModule, primengComponents],
	exports: [primengComponents],
})
export class PrimengModule {}
