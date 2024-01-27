function escapeBr(text) {
    return text.replaceAll("\n", "<br>");
}

function renderMessageTo(message, template) {
    const el = template.content.cloneNode(true);
    el.querySelector(".message-text").textContent = message.text;
    return el;
}

function renderMessageFrom(message, template) {
    const el = template.content.cloneNode(true);
    const html = escapeBr(message.text);
    // console.log(html);
    el.querySelector(".message-text").innerHTML = html;
    return el;
}

function fixScroll(document) {
    const objDiv = document.querySelector("main");
    objDiv.scrollTop = objDiv.scrollHeight;
}

export default function renderMessage(message, document, el) {
    if (message.direction === "to") {
        const render = renderMessageTo(message, document.querySelector("#message-to-tmpl"));
        el.appendChild(render.firstElementChild);
    } else if (message.direction === "from") {
        const render = renderMessageFrom(message, document.querySelector("#message-from-tmpl"));
        el.appendChild(render.firstElementChild);
    } else {
        console.error(message);
    }
    fixScroll(document);
}
