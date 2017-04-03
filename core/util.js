const Util = {
    //some functional stuff
    fmap: (fn, functor) => functor.map(fn),
    compose: (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))),
    curry: (fn) => (...args) => fn.bind(null, ...args),

    //other helpers
    keys: (obj) => Object.keys(obj),
    mapObject: (fn, obj) => {
        Object.keys(obj).reduce((mapped, key) => {
            mapped[key] = fn(obj[key]);
            return mapped;
        }, {})
    },
    spread: (...args) => Object.assign({}, ...args),
    load: (src) => {
        return new Promise((resolve, reject) => {
            let el = document.createElement('script');
            el.src = src;
            el.dataset.src = src;
            el.onload = () => resolve();
            el.onerror = () => reject();
            let h = document.getElementsByTagName('head')[0];
            h.insertBefore(el,h.firstChild);
        });
    },
    loadFromStorage: (key, defaults) => {
        let json = window.localStorage[key];
        if (json) {
            try {
                return JSON.parse(json);
            } catch(e) {
                console.error('error parsing stored config, reverting to default');
                return defaults;
            }
        }
        return defaults;
    }
}