import "./style.css";

let markdown: string = `ABC가나다
된건가?
# h1
## h2
### h3
#### h4
##### h5
###### h6
+ ulList
`;

function parserMD(text: string): string {
    // FIXME: ^, + 기호가 오면 캡쳐링 그룹이 실행이 안된다.
    // Ul tag
    text = text.replace(/^\- (.+)|^\* (.+)|^\+ (.+)/gm, "<ul><li>$1</li></ul>");

    // Header tag
    text = text.replace(/^# (.+)/gm, "<h1>$1</h1>");
    text = text.replace(/^#{2} (.+)/gm, "<h2>$1</h2>");
    text = text.replace(/^#{3} (.+)/gm, "<h3>$1</h3>");
    text = text.replace(/^#{4} (.+)/gm, "<h4>$1</h4>");
    text = text.replace(/^#{5} (.+)/gm, "<h5>$1</h5>");
    text = text.replace(/^#{6} (.+)/gm, "<h6>$1</h6>");

    // P tag
    text = text.replace(/^\s*(\n)?(.+)/gm, function (word) {
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(word) ? word : "<p>" + word + "</p>";
    });

    return text;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    ${parserMD(markdown)}
  </div>
`;
