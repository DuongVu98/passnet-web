import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaBrowserComponent } from "./ta-browser/ta-browser.component";

@NgModule({
	declarations: [TaBrowserComponent],
	imports: [CommonModule],
	exports: [TaBrowserComponent],
})
export class FreelanceModule {}
