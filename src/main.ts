import "./style.css";

let markdown: string = `
ABC가나다
# h1
## h2
### h3
#### h4
##### h5
###### h6
+ ulList
`;

function parserMD(text: string): string {
    // FIXME: 처음오는 개행문자만 p태그로 변환
    // P tag
    text = text.replace(/\n (.+)/, "<p>$1</p>");

    // FIXME: ^, + 기호가 오면 캡쳐링 그룹이 실행이 안된다.
    // Ul tag
    text = text.replace(/^\- (.+)|^\* (.+)|^\+ (.+)/gm, "<ul><li>$1</li></ul>");

    // Header tag
    text = text.replace(/^# (.+)/gm, "<h1>$1</h1>");
    text = text.replace(/^## (.+)/gm, "<h2>$1</h2>");
    text = text.replace(/^### (.+)/gm, "<h3>$1</h3>");
    text = text.replace(/^#### (.+)/gm, "<h4>$1</h4>");
    text = text.replace(/^##### (.+)/gm, "<h5>$1</h5>");
    text = text.replace(/^###### (.+)/gm, "<h6>$1</h6>");

    text = text.replace(/(.+)/gm, "<p>$1</p>");

    return text;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    ${parserMD(markdown)}
  </div>
`;
