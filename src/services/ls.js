const LocalStorage = function (storage) {

    this.get = function () {
        return JSON.parse(localStorage.getItem(storage));
    };

    this.set = function (key) {
        localStorage.setItem(storage, JSON.stringify(key));
    };

    this.clear = function () {
        localStorage.removeItem(storage);
    };

};

const prefix = "ls";

const ls = {
    locale: new LocalStorage(`${prefix}:locale`),
    summary: new LocalStorage('summary'),
};

export { ls };