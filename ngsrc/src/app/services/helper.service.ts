import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HelperService {

public stateCommandReference = new BehaviorSubject<boolean>(false);
public stateCommandLog = new BehaviorSubject<boolean>(false);

constructor() { }

}
