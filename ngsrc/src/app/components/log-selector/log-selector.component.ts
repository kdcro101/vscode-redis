import { ChangeDetectionStrategy } from "@angular/compiler/src/core";
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";

import { uniqBy } from "lodash-es";
import { fromEvent, Observable, of, ReplaySubject, Subject } from "rxjs";
import { filter, map, mergeMap, take, takeUntil, tap } from "rxjs/operators";
import { LogItem } from "../../../../../src/types/index";
import { HelperService } from "../../services/helper.service";

declare var window: Window;
declare var document: Document;
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
        fromEvent(document.body, "mousedown", { capture: false }).pipe(
            takeUntil(this.eventDestroyed),
            take(1),
        ).subscribe(() => this.helper.stateCommandLog.next(false));

        this.itemsFilteredObservable = of(true).pipe(
            mergeMap(() => this.helper.stateInput.pipe(
                map((v) => v == null ? "" : v)
            )),
            map((input) => this.filterLog(input)),
            tap(output => this.itemsFiltered = output),
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
            filter((e) => e.keyCode === 13 || e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 27 || e.keyCode === 9),
            tap((e) => {
                if (e.keyCode === 9 || e.keyCode === 13) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                }
            })
        ).subscribe((e) => {
            if (e.keyCode === 9) {
                this.injectItem();
            }
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
        this.selectItem(this.selected - 1);
    }
    private moveDown() {
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
        const e = this.itemsRefs.toArray()[index];
        if (e == null) {
            return;
        }
        const item = e.nativeElement;

        const iTop = item.offsetTop;
        const iHeight = item.offsetHeight;
        const iBottom = iTop + iHeight;
        const scrollClientHeight = this.root.nativeElement.offsetHeight;
        const scrollTop = this.root.nativeElement.scrollTop;
        const scrollBottom = scrollTop + scrollClientHeight;

        if (iTop < scrollTop) {
            this.root.nativeElement.scrollTop = iTop - 16;
        }
        if (iBottom > scrollBottom) {
            this.root.nativeElement.scrollTop = iTop - scrollClientHeight + iHeight + 16;
        }

    }

    private filterLog(value: string): LogItem[] {
        const mInput = value.toLowerCase().replace(/^\s*/, "").replace(/\s*$/, "");

        try {
            const filtered = this.items.filter(item => {
                const logLine = `${item.command.toLowerCase()} ${item.arguments.toLowerCase()}`;
                return logLine.includes(mInput);
            });

            // const uniq = uniqBy(filtered, (item) => {
            //     return `${item.command} ${item.arguments}`;
            // });
            return filtered;

        } catch (e) {
            return [];
        }
    }
    private injectItem() {
        const o = this.itemsFiltered.length > 0 ? this.itemsFiltered[this.selected] : null;

        if (o) {
            this.helper.eventLogExecute.next(o);
        }

        this.helper.stateCommandLog.next(false);
    }
    private executeItem() {
        const o = this.itemsFiltered.length > 0 ? this.itemsFiltered[this.selected] : null;

        if (o) {
            this.helper.eventLogExecute.next(o);
            this.helper.eventCommandExecute.next();
        }
        this.helper.stateCommandLog.next(false);
    }
    public onItemClick = (e: MouseEvent, index: number) => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();

        this.selectItem(index);
        setTimeout(() => {
            this.executeItem();
        }, 100);
    }
}
