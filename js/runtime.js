function updateRuntime() {
  // 建站时间
  let create_time = Math.round(new Date('2024/11/29 17:38:00').getTime() / 1000);
  let timestamp = Math.round((new Date().getTime()) / 1000);
  let second = timestamp - create_time;
  let time = [0, 0, 0, 0, 0]; // 年、天、小时、分钟、秒

  const nol = function(h) {
    return h > 9 ? h : '0' + h;
  };

  if (second >= 365 * 24 * 3600) {
    time[0] = parseInt(second / (365 * 24 * 3600));
    second %= 365 * 24 * 3600;
  }
  if (second >= 24 * 3600) {
    time[1] = parseInt(second / (24 * 3600));
    second %= 24 * 3600;
  }
  if (second >= 3600) {
    time[2] = nol(parseInt(second / 3600));
    second %= 3600;
  }
  if (second >= 60) {
    time[3] = nol(parseInt(second / 60));
    second %= 60;
  }
  if (second > 0) {
    time[4] = nol(second);
  }

  // 当前时间计算
  let now = new Date();
  let e = new Date('2024/11/29 17:38:00');
  let t = Math.trunc(234e8 + (now - e) / 1e3 * 17);
  let a = (t / 1496e5).toFixed(6);
  let o = new Date('2024/11/29 17:38:00');
  let n = (now - o) / 1e3 / 60 / 60 / 24;
  let r = Math.floor(n);
  let i = (now - o) / 1e3 / 60 / 60 - 24 * r;
  let s = Math.floor(i);
  if (String(s).length === 1) s = "0" + s;
  let d = (now - o) / 1e3 / 60 - 1440 * r - 60 * s;
  let l = Math.floor(d);
  if (String(l).length === 1) l = "0" + l;
  let g = (now - o) / 1e3 - 86400 * r - 3600 * s - 60 * l;
  let b = Math.round(g);
  if (String(b).length === 1) b = "0" + b;

  // 判断营业状态
  const hour = now.getHours();
  const isWorking = hour >= 7 && hour < 22;

  const statusImg = isWorking
    ? 'https://img.shields.io/badge/蟹堡王餐厅-营业中-6adea8?style=social&logo=cakephp'
    : 'https://img.shields.io/badge/蟹堡王餐厅-打烊了-6adea8?style=social&logo=coffeescript';
  const statusTitle = isWorking ? '距离百年老店也就差不到一百年~' : '这个点了应该去睡觉啦，熬夜对身体不好哦';

  const currentTimeHtml = `
    <img class="boardsign" src="${statusImg}" title="${statusTitle}" alt="status">
    <div id="runtime">${time[0]} YEAR ${time[1]} DAYS ${time[2]} : ${time[3]} : ${time[4]}</div>
    <div style="font-size:12px;color:#ccc;text-align:center;margin-top:6px;">
      本站居然运行了 ${r} 天 ${s} 小时 ${l} 分 ${b} 秒 
      <i id="heartbeat" class="fas fa-heartbeat"></i>
      <br>
      旅行者 1 号当前距离地球 ${t.toLocaleString()} 千米，约为 ${a} 个天文单位 🚀
    </div>
  `;

  // 获取 footer 容器
  const footer = document.getElementById('footer');
  if (!footer) return;

  // 创建或获取 workboard 容器
  let workboard = document.getElementById('workboard');
  if (!workboard) {
    workboard = document.createElement('div');
    workboard.id = 'workboard';
    workboard.style.width = '100%';
    workboard.style.textAlign = 'center';
    workboard.style.marginTop = '10px';
  }

  workboard.innerHTML = currentTimeHtml;

  // 插入到 footer 最前面（确保在顶部）
  if (footer.firstChild && footer.firstChild !== workboard) {
    footer.insertBefore(workboard, footer.firstChild);
  } else {
    footer.appendChild(workboard);
  }

  // 徽标容器
  let badgeContainer = document.getElementById('ghbdages');
  if (!badgeContainer) {
    badgeContainer = document.createElement('div');
    badgeContainer.id = 'ghbdages';
    badgeContainer.style.textAlign = 'center';
    badgeContainer.style.marginTop = '12px';
  }

  if (!footer.contains(badgeContainer)) {
    footer.appendChild(badgeContainer);
  }
}

// 初始化
updateRuntime();

// 每秒更新
setInterval(updateRuntime, 1000);

// 防抖函数（备用）
let TT = null;
function debounce(fn, time) {
  if (TT !== null) clearTimeout(TT);
  TT = setTimeout(fn, time);
}