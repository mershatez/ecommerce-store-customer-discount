import { Logger } from "tslog"
import * as express from 'express'

const log: Logger = new Logger;
//get all discounts
export const getDiscounts = function (req: express.Request, res: express.Response, storeDiscounts: Map<number,Discount>) {
    log.info('Getting all of discounts in the store')
    let discount: Discount = {} as Discount;
    res.json({
        storeDiscounts
    })
};
//create new discounts 
export const createNewDiscount = function (req: express.Request, res: express.Response, storeDiscounts: Map<number,Discount>){
    try {
        let newDiscount: Discount = {} as Discount;
        Object.assign(newDiscount, req.body);
        storeDiscounts[newDiscount.transactionNumber]=newDiscount;                
        res.json({
            newDiscount
        })
    } catch (e) {
        log.error(e);
        res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
    }
}
//display report
export const getReport = function (req: express.Request, res: express.Response, storeTransactions = new Array<Transaction>()){
    log.info('Getting all of store transactions')
    res.json({
        storeTransactions
    })
}