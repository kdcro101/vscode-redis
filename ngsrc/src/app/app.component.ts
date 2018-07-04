import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import renderjson from "renderjson";

export interface RedisClientConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

declare var codeFontFamily: string;
declare var redisConfig: RedisClientConfig;
declare var document: Document;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild("client") public client: ElementRef<HTMLDivElement>;
  @ViewChild("command") public command: ElementRef<HTMLInputElement>;

  public redisConfig: RedisClientConfig = redisConfig;
  public isDark: boolean = false;
  constructor(private host: ElementRef<HTMLDivElement>) {

    this.isDark =
      document.body.classList.contains("vscode-dark") || document.body.classList.contains("vscode-high-contrast") ? true : false;

    if (this.isDark) {
      this.host.nativeElement.classList.add("dark-theme");
    }

    renderjson.set_icons("+", "−");
    renderjson.set_show_to_level(1);

  }
  ngOnInit() {

    this.command.nativeElement.style.fontFamily = codeFontFamily;

    const element: HTMLDivElement = renderjson(
      {
        "glossary": {
          "title": "example glossary",
          "comprehensive": true,
          "link": undefined,
          "count": 1,
          "GlossDiv": {
            "title": "S",
            "GlossList": {
              "GlossEntry": {
                "ID": "SGML",
                "SortAs": "SGML",
                "GlossTerm": "Standard Generalized Markup Language",
                "Acronym": "SGML",
                "Abbrev": "ISO 8879:1986",
                "GlossDef": {
                  "para": "A meta-markup language, used to create markup languages such as DocBook.",
                  "GlossSeeAlso": ["GML", "XML"]
                },
                "GlossSee": "markup"
              }
            }
          }
        }
      }
    );

    element.style.fontFamily = codeFontFamily;
    this.client.nativeElement.appendChild(element);
  }

}
