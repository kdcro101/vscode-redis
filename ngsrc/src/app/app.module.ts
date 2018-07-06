import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatIconModule, MatRippleModule, MatToolbarModule, MatTooltipModule } from "@angular/material";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CommandReferenceComponent } from "./components/command-reference/command-reference.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatRippleModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  declarations: [
    AppComponent,
    CommandReferenceComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
