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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from "@angular/material/expansion";

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
		MatProgressSpinnerModule,
		MatTabsModule,
		MatDividerModule,
		MatSidenavModule,
		MatListModule,
		MatMenuModule,
		MatExpansionModule,
	],
})
export class MaterialModule {}
