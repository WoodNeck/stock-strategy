module.exports = class StockAverage {    
    constructor(datas, days) {
        this.days = days;
        this.infoMap = new Map();

        let prevResult = null;
        for (let i = 0; i < datas.length - days + 1; i++) {
            const average = datas.slice(i, i + days).reduce((sum, data) => sum + data.price, 0) / days;
            const data = datas[i + days - 1];

            const avgInfo = {
                price: data.price,
                avg: average,
                increasing: Boolean(prevResult && average > prevResult.avg),
            };
            prevResult = avgInfo;

            this.infoMap.set(data.date, avgInfo);
        }
    }

    get(key) {
        return this.infoMap.get(key);
    }

    has(key) {
        return this.infoMap.has(key);
    }
}