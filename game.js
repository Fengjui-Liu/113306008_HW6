let answer = generateAnswer();
let attempts = 0;

function generateAnswer() {
    const digits = Array.from({ length: 10 }, (_, i) => i.toString());
    const answerArray = [];
    while (answerArray.length < 4) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        answerArray.push(digits[randomIndex]);
        digits.splice(randomIndex, 1); // 移除已選數字
    }
    return answerArray.join('');
}

function checkGuess() {
    const userGuess = document.getElementById("userGuess").value;
    const message = document.getElementById("message");
    const guessList = document.getElementById("guessList");

    // 檢查輸入格式
    if (userGuess.length !== 4 || !/^\d{4}$/.test(userGuess) || hasDuplicates(userGuess)) {
        message.textContent = "請輸入 4 個不重複的數字！";
        return;
    }

    // 計算結果
    let A = 0, B = 0;
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === answer[i]) {
            A++;
        } else if (answer.includes(userGuess[i])) {
            B++;
        }
    }

    attempts++;
    document.getElementById("attempts").textContent = attempts;
    guessList.innerHTML += `<li>${userGuess}: ${A}A${B}B</li>`;
    message.textContent = "";

    if (A === 4) {
        alert(`恭喜！你猜對了！總共作答次數：${attempts}`);
        resetGame();
    }

    // 清空輸入框
    document.getElementById("userGuess").value = '';
}

function hasDuplicates(str) {
    return new Set(str).size !== str.length;
}

function resetGame() {
    answer = generateAnswer();
    attempts = 0;
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("guessList").innerHTML = '';
}