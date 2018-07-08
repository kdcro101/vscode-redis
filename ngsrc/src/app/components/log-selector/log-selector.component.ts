import { ChangeDetectionStrategy } from "@angular/compiler/src/core";
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";

import { fromEvent, Observable, of, ReplaySubject, Subject } from "rxjs";
import { filter, map, mergeMap, takeUntil, tap } from "rxjs/operators";
import { LogItem } from "../../../../../src/types/index";
import { HelperService } from "../../services/helper.service";

declare var window: Window;
declare var codeFontFamily: string;

@Component({
    selector: "log-selector",
    templateUrl: "./log-selector.component.html",
    styleUrls: ["./log-selector.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogSelectorComponent implements OnInit, OnDestroy {
    @ViewChildren("items") public itemsRefs: QueryList<ElementRef<HTMLDivElement>>;
    @ViewChild("root") public root: ElementRef<HTMLDivElement>;

    public itemsCurrent: LogItem[] = [];
    public stateItems = new ReplaySubject<LogItem[]>(1);
    public eventDestroyed = new Subject<void>();
    public selected: number = -1;
    public itemsFilteredObservable: Observable<LogItem[]> = null;
    public itemsFiltered: LogItem[] = [];
    public itemFont = codeFontFamily;

    constructor(
        public host: ElementRef<HTMLDivElement>,
        public change: ChangeDetectorRef,
        private helper: HelperService,
    ) {

    }

    @Input() public set items(val: LogItem[]) {
        this.itemsCurrent = val;
        this.stateItems.next(this.itemsCurrent);

    }
    public get items(): LogItem[] {
        return this.itemsCurrent;
    }
    ngOnInit() {
        this.itemsFilteredObservable = of(true).pipe(
            mergeMap(() => this.helper.stateInput.pipe(
                map((v) => v == null ? "" : v)
            )),
            map((input) => this.filterLog(input)),
            tap(output => this.itemsFiltered = output),
            // tap(() => this.selectItem(this.selected))
        );
        this.itemsFilteredObservable.pipe(
            takeUntil(this.eventDestroyed),
            filter((items) => items.length > 0),
            tap(() => {
                if (this.selected === -1 && this.itemsFiltered.length > 0) {
                    this.selected = this.itemsFiltered.length - 1;
                }
            })
        ).subscribe(() => {
            this.change.detectChanges();
            this.selectItem(this.selected);
        });

        this.helper.stateInput.subscribe(() => this.change.detectChanges());

        this.stateItems.pipe(
            takeUntil(this.eventDestroyed)
        ).subscribe(() => {
            this.change.detectChanges();
        });

        fromEvent<KeyboardEvent>(window, "keydown", { capture: true }).pipe(
            takeUntil(this.eventDestroyed),
            filter((e) => e.keyCode === 13 || e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 27),
            tap((e) => {
                if (e.keyCode === 13) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                }
            })
        ).subscribe((e) => {
            if (e.keyCode === 13) {
                this.executeItem();
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

        });

    }
    ngOnDestroy() {
        this.eventDestroyed.next();
    }
    private moveUp() {
        // const m = 0;
        // const n = this.selected - 1;

        // this.selected = n;

        // if (n < m) {
        //     this.selected = m;
        // }

        // this.change.detectChanges();
        // this.scrollToElement(this.selected);
        this.selectItem(this.selected - 1);
    }
    private moveDown() {
        // const m = this.items.length - 1;
        // const n = this.selected + 1;

        // this.selected = n;

        // if (n > m) {
        //     this.selected = m;
        // }

        // this.change.detectChanges();
        // this.scrollToElement(this.selected);
        this.selectItem(this.selected + 1);

    }
    private selectItem(index: number) {
        const max = this.itemsFiltered.length - 1;
        if (max < 0) {
            this.selected = -1;
            return;
        }
        this.selected = index;
        if (index > max) {
            this.selected = max;
        }
        if (index < 0) {
            this.selected = 0;
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

    }
    private filterLog(value: string): LogItem[] {
        const mInput = value.toLowerCase().replace(/^\s*/, "").replace(/\s*$/, "");

        try {
            return this.items.filter(item => {
                const logLine = `${item.command.toLowerCase()} ${item.arguments.toLowerCase()}`;
                return logLine.includes(mInput);
            });

        } catch (e) {
            return [];
        }
    }
    private executeItem() {
        const o = this.itemsFiltered.length > 0 ? this.itemsFiltered[this.selected] : null;

        if (o) {
            this.helper.eventLogExecute.next(o);
        }

        this.helper.stateCommandLog.next(false);
    }
}
