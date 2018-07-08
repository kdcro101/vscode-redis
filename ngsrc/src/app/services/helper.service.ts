import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { LogItem } from "../../../../src/types/index";

@Injectable({
    providedIn: "root"
})
export class HelperService {

    public stateCommandReference = new BehaviorSubject<boolean>(false);
    public stateCommandLog = new BehaviorSubject<boolean>(false);
    public stateInput = new BehaviorSubject<string>("");
    public eventLogExecute = new Subject<LogItem>();

    constructor() { }

}
