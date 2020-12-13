import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";

const primengComponents = [CardModule, ButtonModule];
@NgModule({
	declarations: [],
	imports: [CommonModule, primengComponents],
	exports: [primengComponents],
})
export class PrimengModule {}
