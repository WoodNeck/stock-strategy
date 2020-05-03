module.exports = class Stock {
    constructor(ID) {
        this.id = ID;
        this.exist = false;
        this.buyPrice = 0;
    }

    buy(money, price, date) {
        if (this.exist) return;

        this.exist = true;
        this.buyPrice = price;
        console.log(`BUY(${this.id}):`, date, price);
    }

    sell(money, price, date) {
        if (!this.exist) return;

        const buyPrice = this.buyPrice;
        const ratio = (1 + (price - buyPrice) / buyPrice);
        this.exist = false;
        money.calcRatio(ratio);
        console.log(`ㄴSOLD(${this.id}):`, date, price, money.val);
    }
}
