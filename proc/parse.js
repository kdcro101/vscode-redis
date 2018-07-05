const cheerio = require('cheerio');
const fs = require("fs-extra");
const _ = require("lodash");

const data = fs.readFileSync("data/commands.html").toString();
const doc = cheerio.load(data);

const container = doc("ul").last();

const li = container.find("li");

const lia = li.toArray();

const output = [];

lia.forEach((l, i) => {
    const html = cheerio.html(l);
    const p = cheerio.load(html);

    const command = p("span.command").first().text().split("\n")[1].replace(/^\s*/, "").replace(/\s*$/, "");
    const args = p("span.args").first().text().split("\n")[1].replace(/^\s*/, "").replace(/\s*$/, "");
    const summary = p("span.summary").first().text().replace(/^\s*/, "")
        .replace(/\s*$/, "")
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\t/g, " ")
        .replace(/\s+/g, " ");

    // const spanCommand = l.find("span.command").first();
    // find("span.command").first().toString();

    console.log("%s", command);
    console.log("%s", args);
    console.log("%s", summary);
    console.log("---------------------------");

    output.push({
        name: command,
        args: args,
        summary: summary,
        url: `https://redis.io/commands/${command.toLocaleLowerCase()}`,
    });

});

// 
// console.log(container);
console.log(li.length);

fs.writeJSONSync("commands.json", _.sortBy(output, "name"), {
    spaces: 4,
});