import { ChangeDetectionStrategy } from "@angular/compiler/src/core";
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { fromEvent, ReplaySubject, Subject } from "rxjs";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { HelperService } from "../../services/helper.service";

declare var document: Document;
declare var window: Window;

@Component({
    selector: "log-selector",
    templateUrl: "./log-selector.component.html",
    styleUrls: ["./log-selector.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogSelectorComponent implements OnInit, OnDestroy {
    @ViewChildren("items") public itemsRefs: QueryList<ElementRef<HTMLDivElement>>;
    @ViewChild("root") public root: ElementRef<HTMLDivElement>;

    public itemsCurrent: string[] = [];
    public stateItems = new ReplaySubject<string[]>(1);
    public eventDestroyed = new Subject<void>();
    public selected: number = 0;

    constructor(
        public host: ElementRef<HTMLDivElement>,
        public change: ChangeDetectorRef,
        private helper: HelperService,
    ) {

    }

    @Input() public set items(val: string[]) {
        this.itemsCurrent = val;
        this.stateItems.next(this.itemsCurrent);

    }
    public get items(): string[] {
        return this.itemsCurrent;
    }
    ngOnInit() {

        this.stateItems.pipe(
            takeUntil(this.eventDestroyed)
        ).subscribe(() => {
            this.change.detectChanges();
        });

        fromEvent<KeyboardEvent>(window, "keydown", { capture: true }).pipe(
            takeUntil(this.eventDestroyed),
            tap((e) => console.log(`keydown ${e.keyCode}`)),
            filter((e) => e.keyCode === 13 || e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 27),
        ).subscribe((e) => {
            if (e.keyCode === 13) {
            }
            if (e.keyCode === 27) {
                this.helper.stateCommandLog.next(false);
            }
            if (e.keyCode === 38) {
                this.moveUp();
            }
            if (e.keyCode === 40) {
                this.moveDown();
            }
            console.log(`after = ${this.selected}`);
        });
    }
    ngOnDestroy() {
        this.eventDestroyed.next();
    }
    private moveUp() {
        const m = 0;
        const n = this.selected - 1;

        this.selected = n;

        if (n < m) {
            this.selected = m;
        }

        this.change.detectChanges();
        this.scrollToElement(this.selected);
    }
    private moveDown() {
        const m = this.items.length - 1;
        const n = this.selected + 1;

        this.selected = n;

        if (n > m) {
            this.selected = m;
        }

        this.change.detectChanges();
        this.scrollToElement(this.selected);

    }
    private scrollToElement(index: number) {
        const elements = this.itemsRefs.toArray();
        const e = elements[index];
        const ot = e.nativeElement.offsetTop;
        const eh = e.nativeElement.offsetHeight;
        const rh = this.root.nativeElement.offsetHeight;
        const cst = ot - rh + eh + 16;
        const st = cst < 0 ? 0 : cst;

        this.root.nativeElement.scrollTop = st;
        console.log(`st: ${st}`);
    }

}
