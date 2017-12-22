/* for audio necessary have mp3 in url */
export default class Resources {
  constructor() {
    this.resourceCache = {};
    this.loading = [];
    this.readyCallbacks = [];
  }

  /* Load an image/audio url or an array of urls */
  load(urlOrArr) {
    if (urlOrArr instanceof Array) {
      urlOrArr.forEach((url) => {
        this.resourceCache[url] = false;
      });
      urlOrArr.forEach(url => this.loadUrl(url));
    } else {
      this.loadUrl(urlOrArr);
    }
  }

  loadUrl(url) {
    if (!this.resourceCache[url]) {
      /*
          return this.resourceCache[url];
      } else {
        */

      if (url.indexOf('mp3') >= 0) { // mp3 file=audio
        const aud = new Audio();
        aud.addEventListener('loadedmetadata', () => {
          this.resourceCache[url] = aud;
          if (this.isReady()) {
          // this.readyCallbacks.forEach( (foo) => foo() );
            while (this.readyCallbacks.length) {
              (this.readyCallbacks.pop()());
            }
          }
        });
        aud.src = url;
      } else { // image
        const img = new Image();
        img.onload = () => {
          this.resourceCache[url] = img;
          if (this.isReady()) {
            this.readyCallbacks.forEach(foo => foo());
          }
        };
        img.src = url;
      }
    }
  }

  get(url) {
    return this.resourceCache[url];
  }

  isReady() {
    let ready = true;

    Object.keys(this.resourceCache).forEach((k) => {
      ready = !!this.resourceCache[k];
    });

    /*
    for (let k in this.resourceCache) {
      if(this.resourceCache.hasOwnProperty(k) &&
         !this.resourceCache[k]) {
             ready = false;
      }
    }
    */

    return ready;
  }

  onReady(func) {
    this.readyCallbacks.push(func);
  }
}
