// sessionStorage
export const sessionStorageSet = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};
export const sessionStorageGet = key =>
  JSON.parse(window.sessionStorage.getItem(key));

// localStorage
export const localStorageSet = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const localStorageGet = key =>
  JSON.parse(window.localStorage.getItem(key));

// 全屏操作
export const bindScreenChange = callback => {
  document.addEventListener('fullscreenchange', callback);
  document.addEventListener('mozfullscreenchange', callback);
  document.addEventListener('webkitfullscreenchange', callback);
  document.addEventListener('msfullscreenchange', callback);
};

export const fullScreen = flag => {
  let main = document.body;
  if (!flag) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    if (main.requestFullscreen) {
      main.requestFullscreen();
    } else if (main.mozRequestFullScreen) {
      main.mozRequestFullScreen();
    } else if (main.webkitRequestFullScreen) {
      main.webkitRequestFullScreen();
    } else if (main.msRequestFullscreen) {
      main.msRequestFullscreen();
    }
  }
};
