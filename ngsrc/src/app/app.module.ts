import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatIconModule, MatRippleModule } from "@angular/material";

import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatRippleModule,
    MatButtonModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
