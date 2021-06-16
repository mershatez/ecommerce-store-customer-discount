import { Logger } from "tslog"
import * as express from 'express'

const log: Logger = new Logger;

//gets available discount
export const getAvailableDiscount = function (req: express.Request, res: express.Response, storeDiscounts: Map<number, Discount>, currentTransactionNumber: number) {
    log.info("Getting available discount");
    let availableDiscount: Discount = {} as Discount;
    availableDiscount = storeDiscounts[currentTransactionNumber];
    res.json({
        availableDiscount
    })
};

//purchase with discount
export const purchaseWithDiscount = function (req: express.Request, res: express.Response, storeDiscounts: Map<number, Discount>, currentTransactionNumber: number, storeTransactions = new Array<Transaction>()) {
    try {
        if (!req.params.code) {
            log.error("Please enter a discount code");
            res.status(404).send(JSON.stringify({ "error": "Discount code not entered" }));
        } else {
            let availableDiscount = storeDiscounts[currentTransactionNumber];
            if (availableDiscount
                && currentTransactionNumber === availableDiscount.transactionNumber
                && availableDiscount.code === req.params.code) {
                let transaction: TransactionWithDiscount = {} as TransactionWithDiscount;
                let discount: Discount = {} as Discount
                Object.assign(transaction, req.body);
                transaction.number = currentTransactionNumber++;
                transaction.discount = discount
                transaction.discount.code = req.params.code
                transaction.discount.transactionNumber = transaction.number;
                storeTransactions.push(transaction)
                res.json({
                    transaction
                })
            } else {
                log.error("Invalid discount code");
                res.status(404).send(JSON.stringify({ "error": "Invalid discount code" }));
            }
        }
    } catch (e) {
        log.error(e);
        res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
    }
}

//purchase without discount
export const purchaseWithoutDiscount = function (req: express.Request, res: express.Response, currentTransactionNumber: number, storeTransactions = new Array<Transaction>()) {
    let transaction: Transaction = {} as Transaction;
    try {
        Object.assign(transaction, req.body);
        transaction.number = currentTransactionNumber++;
        storeTransactions.push(transaction)
        res.json({
            transaction
        })
    } catch (e) {
        res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
    }
};