import "./style.css";

let markdown: string = `
# h1

## h2

### h3

#### h4

##### h5

###### h6
`;

function parserMD(text: string): string {
    text = text.replace(/\n$/gm, "<br/>");

    // Header tag
    text = text.replace(/^# (.+)/gm, "<h1>$1</h1>");
    text = text.replace(/^## (.+)/gm, "<h2>$1</h2>");
    text = text.replace(/^### (.+)/gm, "<h3>$1</h3>");
    text = text.replace(/^#### (.+)/gm, "<h4>$1</h4>");
    text = text.replace(/^##### (.+)/gm, "<h5>$1</h5>");
    text = text.replace(/^###### (.+)/gm, "<h6>$1</h6>");

    return text;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    ${parserMD(markdown)}
  </div>
`;
