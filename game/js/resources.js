export default class Resources {//for audio necessary have mp3 in url
    constructor() {
        this.resourceCache = {};
        this.loading = [];
        this.readyCallbacks = [];
    };

    // Load an image/audio url or an array of urls
    load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach( (url) => this._load(url) );
        } else {
            this._load(urlOrArr);
        };
    };

    _load(url) {
        if(this.resourceCache[url]) {
            return this.resourceCache[url];
        } else {
            if (url.indexOf('mp3') >= 0) { //mp3 file = audio
                let aud = new Audio();
                aud.addEventListener('loadeddata', () => {
                            this.resourceCache[url] = aud;
                            if (this.isReady()) {
                                this.readyCallbacks.forEach( (foo) => foo() );
                            };
                     }, false);
                this.resourceCache[url] = false;
                aud.src = url;
            } else { // image
                let img = new Image();
                img.onload = () => {
                    this.resourceCache[url] = img;
                    if(this.isReady()) {
                        this.readyCallbacks.forEach( (foo) => foo() );
                    };
                };
                this.resourceCache[url] = false;
                img.src = url;
            }
        };
    };

    get(url) {
        return this.resourceCache[url];
    };

    isReady() {
        let ready = true;

        for(let k in this.resourceCache) {
            if(this.resourceCache.hasOwnProperty(k) &&
               !this.resourceCache[k]) {
                   ready = false;
            };
        };

        return ready;
    };

    onReady(func) {
        this.readyCallbacks.push(func);
    };

};
