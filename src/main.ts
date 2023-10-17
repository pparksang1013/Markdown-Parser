import "./style.css";

let markdown: string = `*****
+ ul
* ul
- ul
_em tag_
**Strong**
__strong__
asdsaf https://www.google.com/ asdasds
`;

function parserUl(match: string, capture: string): string {
    return `<ul>
              <li>${capture}</li>
            </ul>`;
}

function parserMD(text: string): string {
    // Hr tag
    text = text.replace(/^\*{5}|^\*{3}/gm, "<hr/>");

    // Strong tag
    text = text.replace(/^\*{2}\s*(.+)\s*\*{2}$/gm, "<strong>$1</strong>");
    text = text.replace(/^_{2}\s*(.+)_{2}\s*$/gm, "<strong>$1</strong>");

    // Ul tag
    text = text.replace(/[\+|\*|\-] (.+)/gm, parserUl);

    // Em tag
    text = text.replace(/^_{1}\s?(.+)\s?_{1}$/gm, "<em>$1</em>");

    // FIXME: 문자열 사이에 링크가 있으면 변환되지 않는다.
    // Link
    text = text.replace(/\s*(https?.+)\.com$/gm, "<a href=$1>$1</a>");

    // Header tag
    text = text.replace(/^# (.+)/gm, "<h1>$1</h1>");
    text = text.replace(/^#{2} (.+)/gm, "<h2>$1</h2>");
    text = text.replace(/^#{3} (.+)/gm, "<h3>$1</h3>");
    text = text.replace(/^#{4} (.+)/gm, "<h4>$1</h4>");
    text = text.replace(/^#{5} (.+)/gm, "<h5>$1</h5>");
    text = text.replace(/^#{6} (.+)/gm, "<h6>$1</h6>");

    // P tag
    text = text.replace(/^\s*(.+)/gm, function (word) {
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img|hr|a|strong)/.test(word) ? word : "<p>" + word + "</p>";
    });

    return text;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    ${parserMD(markdown)}
  </div>
`;
