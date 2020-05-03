const neatCsv = require('neat-csv');
const fs = require('fs');
const Money = require('./Money');
const Stock = require('./Stock');
const StockParsing = require('./StockAverage');

const file = fs.readFileSync('./s10.csv');

neatCsv(file).then(rawDatas => {
    rawDatas = rawDatas.sort((a, b) => new Date(a['﻿"Date"']) - new Date(b['﻿"Date"']));
    rawDatas = rawDatas.map(data => {
        return {
            date: data['﻿"Date"'],
            price: parseFloat(data.Price.replace(",", "")),
        }
    });

    const avg5 = new StockParsing(rawDatas, 5);
    const avg20 = new StockParsing(rawDatas, 20);
    
    const money = new Money(100);
    const etf = new Stock("ETF");
    const inverse = new Stock("INVERSE");

    rawDatas.forEach(data => {
        const date = data.date;
        const price = data.price;
        if (!avg5.has(date) || !avg20.has(date)) return;

        const avg5Data = avg5.get(date);
        const avg20Data = avg20.get(date);

        const isBothIncreasing = avg5Data.increasing && avg20Data.increasing;
        const isSomeIncreasing = avg5Data.increasing || avg20Data.increasing;
        const isSomeDecreasing = !avg5Data.increasing || !avg20Data.increasing;
        const isBothDecreasing = !avg5Data.increasing && !avg20Data.increasing;
        // const isBothIncreasing = avg5Data.increasing;
        // const isSomeDecreasing = !avg5Data.increasing;

        if (isBothIncreasing) {
            if (inverse.exist) {
                inverse.sell(money, price, date);
            }
            etf.buy(money, price, date);
        }
        if (isBothDecreasing) {
            if (etf.exist) {
                etf.sell(money, price, date);
            }
            inverse.buy(money, price, date);
        }
        if (isSomeDecreasing) {
            etf.sell(money, price, date);
        }
        if (isSomeIncreasing) {
            inverse.sell(money, price, date);
        }
    });

    console.log(money.val);
});
