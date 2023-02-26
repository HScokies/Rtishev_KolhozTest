"use strict";
const API_URL = "https://api.codex.jaagrav.in/";
let Saved = [null, null, null, null, null, null, null, null, null, null];
let Ans = [false, false, false, false, false, false, false, false, false, false];
let currentIndex = 1;
const PrevBtn = document.querySelector(".body__wrapper__controlsContainer-prev");
const NextBtn = document.querySelector(".body__wrapper__controlsContainer-next");
const Start = (e) => {
    currentIndex = 1;
    const res = document.querySelector(".body__resultscr");
    res != null ? res.remove() : null;
    const wrapper = document.querySelector(".body__wrapper");
    wrapper.style.transform = "translateY(0)";
    e != null ? e.remove() : null;
    CreateLayout();
};
const CreateLayout = () => {
    toggleCtrl();
    const ShownIndex = document.querySelector(".body__wrapper__indexContainer");
    ShownIndex.innerText = `Вопрос ${currentIndex} / 10`;
    switch (currentIndex) {
        case 1:
            ShowQuestion1();
            break;
        case 2:
            ShowQuestion2();
            break;
        case 3:
            ShowQuestion3();
            break;
        case 4:
            ShowQuestion4();
            break;
        case 5:
            ShowQuestion5();
            break;
        case 6:
            ShowQuestion6();
            break;
        case 7:
            ShowQuestion7();
            break;
        case 8:
            ShowQuestion8();
            break;
        case 9:
            ShowQuestion9();
            break;
        case 10:
            ShowQuestion10();
            break;
    }
};
const toggleCtrl = () => {
    if (currentIndex == 1 && !PrevBtn.classList.contains("inactive")) {
        PrevBtn.classList.add("inactive");
    }
    else if (PrevBtn.classList.contains("inactive")) {
        PrevBtn.classList.remove("inactive");
    }
};
const HandleControls = async (e, type) => {
    if (e.classList.contains("inactive"))
        return;
    if (type) {
        switch (currentIndex) {
            case 1:
                NextBtn.classList.add("inactive");
                await HandleQuestion1().catch(() => console.error("Time Out!"));
                NextBtn.classList.remove("inactive");
                break;
            case 2:
                HandleQuestion2();
                break;
            case 3:
                HandleQuestion3();
                break;
            case 4:
                NextBtn.classList.add("inactive");
                PrevBtn.classList.add("inactive");
                await HandleQuestion4();
                NextBtn.classList.remove("inactive");
                PrevBtn.classList.remove("inactive");
                break;
            case 5:
                HandleQuestion5();
                break;
            case 6:
                HandleQuestion6();
                break;
            case 7:
                HandleQuestion7();
                break;
            case 8:
                HandleQuestion8();
                break;
            case 9:
                NextBtn.classList.add("inactive");
                PrevBtn.classList.add("inactive");
                await HandleQuestion9();
                NextBtn.classList.remove("inactive");
                PrevBtn.classList.remove("inactive");
                break;
            case 10:
                HandleQuestion10();
                return;
        }
        currentIndex += 1;
    }
    else {
        currentIndex--;
    }
    console.log(Ans);
    CreateLayout();
};
const Q = document.querySelector(".body__wrapper__activeArea-question");
const A = document.querySelector(".body__wrapper__activeArea-answer");
const ShowQuestion1 = () => {
    Q.innerHTML = "Напишите программу для вычисления N-факториала";
    A.innerHTML = "<textarea class=\"input\"  spellcheck=\"false\" onkeydown=\"textareaHandler(event, this)\" ></textarea> ";
    const _input = document.querySelector(".input");
    if (Saved[0] != null) {
        _input.value = Saved[0];
    }
    else {
        PrecodeTextArea(_input);
    }
};
const HandleQuestion1 = async () => {
    const data = document.querySelector(".input");
    Saved[0] = data.value;
    const controller = new AbortController();
    const timeOut = setTimeout(() => { Ans[0] = false; controller.abort(); }, 7000);
    const PayLoad = {
        'code': data.value,
        'language': 'cs',
        'input': '10'
    };
    await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(PayLoad),
        signal: controller.signal
    }).then(res => res.json()).then(data => {
        Ans[0] = false;
        if (data["output"] != undefined && data["output"].replaceAll("\n", "") == '3628800') {
            Ans[0] = true;
        }
    });
    clearTimeout(timeOut);
};
const ShowQuestion2 = () => {
    Q.innerHTML = "Первым индексом в массиве является:";
    A.innerHTML = "<p class=\"input rb\" id=\"0\" onclick=\"rbHandler(this)\">0</p> <p class=\"input rb\" id=\"1\" onclick=\"rbHandler(this)\">1</p>";
    if (Saved[1] != null) {
        Saved[1] == '0' ? document.getElementById('0')?.classList.add("active") : document.getElementById('1')?.classList.add("active");
    }
};
const HandleQuestion2 = () => {
    const rb = document.querySelector(".input.active");
    if (rb != null) {
        Saved[1] = rb.id;
    }
    if (rb != null && rb.id == '0') {
        Ans[1] = true;
    }
    else {
        Ans[1] = false;
    }
};
const ShowQuestion3 = () => {
    Q.innerHTML = "Создайте переменную N и запишите в нее значение Hello World";
    A.innerHTML = "<input class=\"input\"  maxlength=\"25\" type=\"text\">";
    if (Saved[2] != null) {
        const input = document.querySelector(".input");
        input.value = Saved[2];
    }
};
const HandleQuestion3 = () => {
    const res = document.querySelector(".input");
    Saved[2] = res.value;
    if (res.value.replaceAll(" ", "") == "stringN=\"HelloWorld\";" || res.value.replaceAll(" ", "") == "StringN=\"HelloWorld\";") {
        Ans[2] = true;
    }
    else {
        Ans[2] = false;
    }
};
const ShowQuestion4 = () => {
    Q.innerHTML = "Дано число X. Требуется перевести это число в римскую систему счисления.";
    A.innerHTML = "<textarea class=\"input\"  spellcheck=\"false\" onkeydown=\"textareaHandler(event, this)\" ></textarea> ";
    const _input = document.querySelector(".input");
    if (Saved[3] != null) {
        _input.value = Saved[3];
    }
    else {
        PrecodeTextArea(_input);
    }
};
const HandleQuestion4 = async () => {
    const data = document.querySelector(".input");
    Saved[3] = data.value;
    const controller = new AbortController();
    const timeOut = setTimeout(() => { Ans[3] = false; controller.abort(); }, 7000);
    const PayLoad = {
        'code': data.value,
        'language': 'cs',
        'input': '84'
    };
    await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(PayLoad),
        signal: controller.signal
    }).then(res => res.json()).then(data => {
        Ans[3] = false;
        if (data["output"] != undefined && data["output"].toUpperCase().replaceAll("\n", "") == 'LXXXIV') {
            Ans[3] = true;
        }
    });
    clearTimeout(timeOut);
};
const ShowQuestion5 = () => {
    Q.innerHTML = "Выберете все существующие типы данных";
    A.innerHTML = "<p class=\"input cb\" id=\"0\" onclick=\"cbHandler(this)\">int</p><p class=\"input cb\" id=\"1\" onclick=\"cbHandler(this)\">bit</p><p class=\"input cb\" id=\"2\" onclick=\"cbHandler(this)\">decimal</p>";
    const _inputs = document.querySelectorAll(".input");
    if (Saved[4] != null) {
        _inputs.forEach(_input => {
            Saved[4]?.includes(_input.id) ? _input.classList.add("active") : null;
        });
    }
};
const HandleQuestion5 = () => {
    Saved[4] = '';
    const answers = document.querySelectorAll(".active");
    answers.forEach(anser => (Saved[4] += anser.id));
    if (Saved[4].includes('0') && !Saved[4].includes('1') && Saved[4].includes('2')) {
        Ans[4] = true;
    }
    else {
        Ans[4] = false;
    }
};
const ShowQuestion6 = () => {
    Q.innerHTML = "Каково имя 'специального класса', представляющего группу констант";
    A.innerHTML = "<p class=\"input rb\" id=\"0\" onclick=\"rbHandler(this)\">const</p><p class=\"input rb\" id=\"1\" onclick=\"rbHandler(this)\">special</p><p class=\"input rb\" id=\"2\" onclick=\"rbHandler(this)\">enum</p>";
    if (Saved[5] != null) {
        (document.getElementById(Saved[5])).classList.add("active");
    }
};
const HandleQuestion6 = () => {
    const answer = document.querySelector(".active");
    console.debug(answer);
    if (answer != null) {
        Saved[5] = answer.id;
    }
    Ans[5] = Saved[5] == '2' ? true : false;
};
const ShowQuestion7 = () => {
    Q.innerHTML = "Выберете существующие модификаторы доступа классов";
    A.innerHTML = "<p class=\"input cb\" id=\"0\" onclick=\"cbHandler(this)\">private</p><p class=\"input cb\" id=\"1\" onclick=\"cbHandler(this)\">internal</p><p class=\"input cb\" id=\"2\" onclick=\"cbHandler(this)\">global</p>";
    const _inputs = document.querySelectorAll(".input");
    if (Saved[6] != null) {
        _inputs.forEach(_input => {
            Saved[6]?.includes(_input.id) ? _input.classList.add("active") : null;
        });
    }
};
const HandleQuestion7 = () => {
    Saved[6] = '';
    const answers = document.querySelectorAll(".active");
    answers.forEach(anser => (Saved[6] += anser.id));
    if (Saved[6].includes('0') && !Saved[6].includes('2') && Saved[6].includes('1')) {
        Ans[6] = true;
    }
    else {
        Ans[6] = false;
    }
};
const ShowQuestion8 = () => {
    Q.innerHTML = "Какое ключевое слово используется для возврата значения внутри метода";
    A.innerHTML = "<input class=\"input\" type=\"text\">";
    if (Saved[7] != null) {
        const input = document.querySelector(".input");
        input.value = Saved[7];
    }
};
const HandleQuestion8 = () => {
    const res = document.querySelector(".input");
    Saved[7] = res.value;
    if (res.value.toLowerCase() == "return") {
        Ans[7] = true;
    }
    else {
        Ans[7] = false;
    }
};
const ShowQuestion9 = () => {
    Q.innerHTML = "Отсортируйте введенные через пробел элементы с четным значением";
    A.innerHTML = "<textarea class=\"input\"  spellcheck=\"false\" onkeydown=\"textareaHandler(event, this)\" ></textarea> ";
    const _input = document.querySelector(".input");
    if (Saved[8] != null) {
        _input.value = Saved[8];
    }
    else {
        PrecodeTextArea(_input);
    }
};
const HandleQuestion9 = async () => {
    const data = document.querySelector(".input");
    Saved[8] = data.value;
    const controller = new AbortController();
    const timeOut = setTimeout(() => { Ans[8] = false; controller.abort(); }, 7000);
    const PayLoad = {
        'code': data.value,
        'language': 'cs',
        'input': '5 3 2 4 1 6'
    };
    await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(PayLoad),
        signal: controller.signal
    }).then(res => res.json()).then(data => {
        Ans[8] = false;
        if (data["output"] != undefined && data["output"].replaceAll("\n", "").trim() == '1 3 2 4 5 6') {
            Ans[8] = true;
        }
    });
    clearTimeout(timeOut);
};
const ShowQuestion10 = () => {
    Q.innerHTML = "Какое значение по умолчанию хранит тип данных bool";
    A.innerHTML = "<p class=\"input rb\" id=\"0\" onclick=\"rbHandler(this)\">true</p><p class=\"input rb\" id=\"1\" onclick=\"rbHandler(this)\">null</p><p class=\"input rb\" id=\"2\" onclick=\"rbHandler(this)\">false</p>";
};
const HandleQuestion10 = () => {
    const answer = document.querySelector(".active");
    if (answer != null && answer.id == '2') {
        Ans[9] = true;
    }
    else {
        Ans[9] = false;
    }
    const wrapper = document.querySelector(".body__wrapper");
    wrapper.style.removeProperty('transform');
    setTimeout(() => {
        ShowResults();
    }, 500);
};
const ShowResults = () => {
    let score = 0;
    let topScore = +localStorage.getItem("score");
    for (let i = 0; i < 10; i++) {
        if (Ans[i]) {
            score++;
        }
        Saved[i] = null;
        Ans[i] = false;
    }
    if (topScore < score) {
        topScore = score;
        localStorage.setItem("score", topScore);
    }
    const body = document.querySelector(".body");
    let resScr = document.createElement("div");
    resScr.classList.add("body__resultscr");
    let h1 = document.createElement("h1");
    h1.textContent = "Результаты";
    let best = document.createElement("p");
    best.textContent = `Лучший ${topScore}/20`;
    let curr = document.createElement("p");
    curr.textContent = `Текущий ${score}/20`;
    let btn = document.createElement("p");
    btn.textContent = "Начать заново";
    btn.classList.add("body__resultscr-restart");
    btn.setAttribute("onclick", "Start()");
    resScr.appendChild(h1);
    resScr.appendChild(best);
    resScr.appendChild(curr);
    resScr.appendChild(btn);
    body.appendChild(resScr);
};
const textareaHandler = (e, elem) => {
    if (e.key == "Tab") {
        e.preventDefault();
        var start = elem.selectionStart;
        var end = elem.selectionEnd;
        elem.value = elem.value.substring(0, start) +
            "\t" + elem.value.substring(end);
        elem.selectionStart = elem.selectionEnd = start + 1;
    }
};
const PrecodeTextArea = (elem) => {
    elem.value = `using System;\npublic class Program\n{\n\tpublic static void Main()\n\t{\n\t\t\n\t}\n}`;
};
const rbHandler = (activeElem) => {
    const rbs = document.querySelectorAll(".input");
    rbs.forEach(rb => {
        if (rb.classList.contains("active")) {
            rb.classList.remove("active");
        }
    });
    activeElem.classList.add("active");
};
const cbHandler = (caller) => {
    if (caller.classList.contains("active")) {
        caller.classList.remove("active");
    }
    else {
        caller.classList.add("active");
    }
};
