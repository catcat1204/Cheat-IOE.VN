let url = window.location.href;
(async () => {
  console.clear()
  let getinfo;
  let payload_d;
  fetch('https://api.bunteam.xyz/ioe' + "?token=" + url.split("?token=")[1]).then(res => res.json()).then(payload_data => {
    fetch('https://edu.go.vn/ioe-service/v2/game/getinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload_data)
    })
      .then(response => response.json())
      .then(async data => {
        let res = []
        getinfo = data;
        payload_d = payload_data;
        startGame(payload_d.token, getinfo.data.game.gameId, getinfo.data.game.examKey, getinfo.data.game.question)
      })
      .catch((error) => {
        console.error(error);
      });
  })
})();
function startGame(token, gameId, examKey, questions) {
  fetch('https://edu.go.vn/ioe-service/v2/game/startgame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "api_key": "gameclient",
      "token": token,
      "gameId": gameId,
      "examKey": examKey,
    })
  })
    .then(response => response.json())
    .then(res => {
      console.log("Đang Bắt Đầu...")
      for (i of questions) {
        getAnswer(questions.indexOf(i) + 1, i.id, i.ans, token, gameId, examKey)
      }
    })
    .catch((error) => {
      console.error(error);
    })
}
function getAnswer(index, questId, ans, token, gameId, examKey) {
  let result_ans = ans.sort(function(a, b) {
    return a.orderTrue - b.orderTrue;
  });
  result_ans = result_ans.map((e) => `${e.content}`)
  console.log(`${index}. ${result_ans.join(" | ")}`)
};
