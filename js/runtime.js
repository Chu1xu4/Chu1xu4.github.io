var now = new Date();

function createtime() {
  now.setTime(now.getTime() + 1000);
  var start = new Date("10/01/2025 00:00:00"); // 旅行者1号开始时间
  var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17);
  var unit = (dis / 149600000).toFixed(6);
  var grt = new Date("10/1/2025 00:00:00"); // 网站诞生时间
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  if (String(hnum).length === 1) hnum = "0" + hnum;

  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  if (String(mnum).length === 1) mnum = "0" + mnum;

  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  if (String(snum).length === 1) snum = "0" + snum;

  // 使用更干净的 HTML 结构
  // let statusImg = (hnum >= 9 && hnum < 18)
  //   ? 'https://sourcebucket.s3.ladydaily.com/badge/F小屋-科研摸鱼中.svg'
  //   : 'https://sourcebucket.s3.ladydaily.com/badge/F小屋-下班休息啦.svg';

  // let titleText = (hnum >= 9 && hnum < 18)
  //   ? '什么时候能够实现财富自由呀~'
  //   : '下班了就该开开心心地玩耍~';

  let currentTimeHtml = `
    <img class='boardsign' src='${statusImg}' title='${titleText}' alt='status'>
    <div style="font-size:13px;font-weight:bold;line-height:1.5">
      本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 
      <i id="heartbeat" class='fas fa-heartbeat' style="color:#ff6b6b"></i>
      <br>
      旅行者 1 号当前距离地球 ${dis.toLocaleString()} 千米，约为 ${unit} 个天文单位 🚀
    </div>
  `;

  // 确保 DOM 存在
  const workboard = document.getElementById("workboard");
  if (workboard) {
    workboard.innerHTML = currentTimeHtml;
  }
}

// 每秒更新
setInterval(createtime, 1000);