module.exports = class Money {
    constructor(initial) {
        this.val = initial;
    }

    calcRatio(ratio) {
        this.val *= ratio;
    }
}