import { Component, ElementRef, OnInit } from "@angular/core";
import { commandReference, CommandReferenceItem } from "../../reference";
import { HelperService } from "../../services/helper.service";

declare var window: Window;

@Component({
    selector: "command-reference",
    templateUrl: "./command-reference.component.html",
    styleUrls: ["./command-reference.component.scss"]
})
export class CommandReferenceComponent implements OnInit {
    public isDark = false;
    public commands: CommandReferenceItem[] = commandReference;
    constructor(
        public host: ElementRef<HTMLDivElement>,
        public helper: HelperService
    ) {
        this.isDark =
            document.body.classList.contains("vscode-dark") || document.body.classList.contains("vscode-high-contrast") ? true : false;

        if (this.isDark) {
            this.host.nativeElement.classList.add("dark-theme");
        }
    }
    public trackById(index: number, item: CommandReferenceItem): string {
        return item.name;
    }
    ngOnInit() {
    }
    public linkOpen = (url: string) => {
        window.open(url, "_blank");
    }

}
