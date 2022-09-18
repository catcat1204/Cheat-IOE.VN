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
        for (i of getinfo.data.game.question) {
          console.log(`${i.ans[0].content} = ${i.content.content}`)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  })
})();
