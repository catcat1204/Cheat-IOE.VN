// ==UserScript==
// @name         CheatIOE.VN
// @namespace    http://tampermonkey.net/
// @version      2.0.7
// @description  cheat ioe 2023
// @author       @cecon123
// @match        https://game.ioe.vn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ioe.vn
// @downloadURL  https://github.com/catcat1204/Cheat-IOE.VN/raw/master/cheatioe.user.js
// @updateURL    https://github.com/catcat1204/Cheat-IOE.VN/raw/master/cheatioe.user.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  window.addEventListener("load", () => {
    (function () {
      document.body.style.overflow = "scroll";

      document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div id="patched" style="display: block; width: 100%; height: 100%; position: relative; top: 100%; padding: 2px; background-size: 100%; background-color: white;">
            <span style="color: #1f73c2; font-size: 50px; font-weight: bold; top: 20px; position: relative; margin-top: 100px; margin-bottom: 100px">CheatIOE.VN</span>
            <div id="list-answer" style="display: flex; align-items: center;flex-direction: column; position: relative; margin-top: 30px">
            </div>
            <div id = "footer" style="display: flex;justify-content: center;align-items: center;font-size:15px">
            <p>Made with 💗 by @cecon123</p>
            </div>
        </div>
      `
      );
      document.body.style.cursor = "default";
      document.body.style.color = "#888";
      document.body.style.backgroundColor = "#333";
      document.body.width = "100%";
      document.body.height = "100%";
      document.body.style.textAlign = "center";
      document.body.style.fontFamily = "Helvetica, Verdana, Arial, sans-serif";
      const originSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
      let GETINFO;
      let isStart = false;
      XMLHttpRequest.prototype.setRequestHeader = function () {
        const xhr = this;
        xhr.onload = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseURL);
            if (xhr.responseURL.includes("getinfo")) {
              GETINFO = JSON.parse(xhr.response);
            }
            if (xhr.responseURL.includes("startgame") && !isStart) {
              isStart = true;
              setTimeout(() => {
                console.clear();
                console.log(
                  "%c ============== ĐÁP ÁN ==============",
                  "background: #b0feff; color: #47a6ff"
                );
                const GAME_TYPE = prompt(
                  "Nhập loại game\n" +
                    [
                      "1. Bài con chó (ghép hình)",
                      "2. Bài phù thủy (chọn từ)",
                      "3. Bài true false (chọn đúng sai)",
                      "4. Bài trắc nghiệm (Như ném bóng, tàu vũ trụ,..)",
                      "5. Bài sắp xếp (Sắp xếp các từ thành một câu)",
                    ].join("\n")
                );
                switch (GAME_TYPE) {
                  case "1":
                    for (var i of GETINFO.data.game.question) {
                      console.log(`${i.ans[0].content} = ${i.content.content}`);
                      addAnswer(
                        `${i.ans[0].content} = ${i.content.content}`,
                        GAME_TYPE
                      );
                    }
                    break;
                  case "2":
                    for (var j of GETINFO.data.game.question[0].ans) {
                      console.log(`${j.content} (${j.orderTrue})`);
                      addAnswer(`${j.content} (${j.orderTrue})`, GAME_TYPE);
                    }
                    break;
                  case "3":
                    for (var k of GETINFO.data.game.question) {
                      getAnswerTrueFalse(
                        GETINFO.data.game.question.indexOf(k) + 1,
                        k.content.content,
                        k.id,
                        GETINFO.data.token,
                        GETINFO.data.game.gameId,
                        GETINFO.data.game.examKey,
                        "False"
                      );
                      getAnswerTrueFalse(
                        GETINFO.data.game.question.indexOf(k) + 1,
                        k.content.content,
                        k.id,
                        GETINFO.data.token,
                        GETINFO.data.game.gameId,
                        GETINFO.data.game.examKey,
                        "True"
                      );
                    }
                    break;
                  case "4":
                    for (var l of GETINFO.data.game.question) {
                      getAnswerTracNghiem(
                        GETINFO.data.game.question.indexOf(l) + 1,
                        l.id,
                        l.ans,
                        GETINFO.data.token,
                        GETINFO.data.game.gameId,
                        GETINFO.data.game.examKey
                      );
                    }
                    var answerDiv = document.getElementsByClassName("answer");
                    for (var n of answerDiv) {
                      n.addEventListener("click", function () {
                        this.parentNode.appendChild(this);
                      });
                    }
                    break;
                  case "5":
                    for (var m of GETINFO.data.game.question) {
                      getAnswerSapXep(
                        GETINFO.data.game.question.indexOf(m) + 1,
                        m.id,
                        m.ans,
                        GETINFO.data.token,
                        GETINFO.data.game.gameId,
                        GETINFO.data.game.examKey
                      );
                    }
                    var answerDiv = document.getElementsByClassName("answer");
                    for (var n of answerDiv) {
                      n.addEventListener("click", function () {
                        this.parentNode.appendChild(this);
                      });
                    }
                    break;
                  default:
                    alert(
                      "Bạn đã nhập sai loại game vui lòng restart trang để thử lại!"
                    );
                    break;
                }
              }, 1000);
            }
          }
        };
        originSetRequestHeader.apply(this, arguments);
      };
    })();
  });
})();

function addAnswer(content, gameType) {
  const listAnswer = document.getElementById("list-answer");
  if (gameType === "1") {
    let image = "";
    if (content.includes("http")) {
      const regex = /http.*\.(jpg|png|gif|jpeg)/g;
      const found = content.match(regex);
      if (found) {
        image = `<img src="${found[0]}" style="width: 50%; height: 50%; object-fit: cover; border-radius: 10px;"/> <p>`;
        content = content.replace(found[0], image);
      }
    }
    listAnswer.insertAdjacentHTML(
      "beforeend",
      `<div class="answer" style="border-radius: 10px; width: 50%; height: 85px; background-color: #b0feff; color: #47a6ff; margin-bottom: 5px; padding: 3px; font-size: 20px; font-weight: bold;display: flex;
          justify-content: center;
          align-items: center;">${content}</p></div>`
    );
  } else if (gameType === "5") {
    listAnswer.insertAdjacentHTML(
      "beforeend",
      `<div class="answer" style="border-radius: 10px; width: 50%; height: 70px; background-color: #b0feff; color: #47a6ff; margin-bottom: 5px; padding: 3px; font-size: 20px; font-weight: bold;display: flex;
          justify-content: center;
          align-items: center;"><p>${content}</p></div>`
    );
  } else {
    listAnswer.insertAdjacentHTML(
      "beforeend",
      `<div class="answer" style="border-radius: 10px; width: 50%; height: 50px; background-color: #b0feff; color: #47a6ff; margin-bottom: 5px; padding: 3px; font-size: 20px; font-weight: bold;display: flex;
          justify-content: center;
          align-items: center;"><p>${content}</p></div>`
    );
  }
}
function getAnswerTrueFalse(
  index,
  content,
  questId,
  token,
  gameId,
  examKey,
  type
) {
  fetch("https://api-edu.go.vn/ioe-service/v2/game/AnswerCheck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: "gameclient",
      token: token,
      gameId: gameId,
      examKey: examKey,
      ans: {
        questId: questId,
        ans: type,
        point: 10,
      },
      sign: "400ea6752b028d96886673ca5f09c61a",
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.data.point && res.data.point > 0) {
        console.log(`${index}. ${content} ${type}`);
        addAnswer(`${index}. ${type}`, 3);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
function getAnswerTracNghiem(index, questId, ans, token, gameId, examKey) {
  for (var a of ans) {
    fetch("https://api-edu.go.vn/ioe-service/v2/game/AnswerCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: "gameclient",
        token: token,
        gameId: gameId,
        examKey: examKey,
        ans: {
          questId: questId,
          ans: a.content,
          point: 10,
        },
        sign: "400ea6752b028d96886673ca5f09c61a",
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.data.point && res.data.point > 0) {
          console.log(`${index}. ${res.data.ans}`);
          addAnswer(`${index}. ${res.data.ans}`, 4);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
function getAnswerSapXep(index, questId, ans, token, gameId, examKey) {
  let result_ans = ans.sort(function (a, b) {
    return a.orderTrue - b.orderTrue;
  });
  result_ans = result_ans.map((e) => `${e.content}`);
  console.log(`${index}. ${result_ans.join(" | ")}`);
  addAnswer(`${index}. ${result_ans.join(" | ")}`, 5);
}
