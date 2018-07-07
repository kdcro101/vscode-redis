import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
    MatAutocompleteModule, MatButtonModule,
    MatIconModule, MatInputModule, MatRippleModule, MatToolbarModule, MatTooltipModule
} from "@angular/material";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
    ],
    declarations: [
        AppComponent,
        CommandReferenceComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
