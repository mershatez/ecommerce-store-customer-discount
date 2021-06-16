import * as express from 'express'
import cors from 'cors'
import { Logger } from "tslog"
import {getDiscounts} from './controller/admin.controller'
import {createNewDiscount} from './controller/admin.controller'
import {getReport} from './controller/admin.controller'
import {getAvailableDiscount} from './controller/customer.controller'
import {purchaseWithDiscount} from './controller/customer.controller'
import {purchaseWithoutDiscount}from './controller/customer.controller'

class Router {

    constructor(server: express.Express) {
        const router = express.Router()

        let currentTransactionNumber: number = 1;
        const log: Logger = new Logger;

        const storeDiscounts = new  Map<number,Discount> ();  
        let storeTransactions = new Array<Transaction>();

        //FOR ADMIN/OWNER
        //get all discounts
        router.get('/discounts', cors(), (req: express.Request, res: express.Response) => {
            getDiscounts(req,res,storeDiscounts);
        });
        //create new discounts 
        router.post('/new/discount', cors(), (req: express.Request, res: express.Response) => {
            createNewDiscount(req,res,storeDiscounts);
        });

        //display report
        router.get('/report', cors(), (req: express.Request, res: express.Response) => {
            getReport(req,res,storeTransactions);
        });

        router.options('*', cors());

        server.use('/', router)
    }


}
export default Router;
