import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { fromEvent, merge, Observable, of, Subject } from "rxjs";
import { delay, filter, map, mergeMap, takeUntil, tap } from "rxjs/operators";
import { commandReference, CommandReferenceItem } from "../../reference";
import { HelperService } from "../../services/helper.service";

declare var window: Window;

@Component({
    selector: "command-reference",
    templateUrl: "./command-reference.component.html",
    styleUrls: ["./command-reference.component.scss"]
})
export class CommandReferenceComponent implements OnInit, OnDestroy {
    @ViewChild("filter") public filter: ElementRef<HTMLInputElement>;

    public isDark = false;
    public commands: CommandReferenceItem[] = commandReference;
    private eventDestroyed = new Subject<void>();
    public itemsFilteredObservable: Observable<CommandReferenceItem[]>;

    constructor(
        public host: ElementRef<HTMLDivElement>,
        public change: ChangeDetectorRef,
        public helper: HelperService,
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

        // destroy on escape=27
        fromEvent<KeyboardEvent>(window, "keydown", { capture: true }).pipe(
            takeUntil(this.eventDestroyed),
            filter((e) => e.keyCode === 27),
        ).subscribe(() => this.helper.stateCommandReference.next(false));

        this.itemsFilteredObservable = of(true).pipe(
            mergeMap<boolean, string>(() => merge(
                fromEvent(this.filter.nativeElement, "keyup"),
                of(true).pipe(tap(() => console.log("doing of"))),
            ).pipe(
                map(() => this.filter.nativeElement.value),
                map((v) => v == null ? "" : v)
            )),
            map((input) => this.commands.filter((item) => item.name.toLowerCase().includes(input))),
        );

        this.itemsFilteredObservable.pipe(
            takeUntil(this.eventDestroyed),
            // delay(50),
        ).subscribe(() => this.change.detectChanges());
    }
    public linkOpen = (url: string) => {
        window.open(url, "_blank");
    }
    ngOnDestroy() {
        this.eventDestroyed.next();
    }
}
