import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";

@NgModule({
	declarations: [],
	imports: [CommonModule],
	exports: [
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,
		MatGridListModule,
		MatCardModule,
		MatRippleModule,
	],
})
export class MaterialModule {}
