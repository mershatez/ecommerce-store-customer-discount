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
            log.info("Routing get discount");
            getDiscounts(req,res,storeDiscounts);
        });
        //create new discounts 
        router.post('/new/discount', cors(), (req: express.Request, res: express.Response) => {
            log.info("Routing get new discount");
            createNewDiscount(req,res,storeDiscounts);
        });

        //display report
        router.get('/report', cors(), (req: express.Request, res: express.Response) => {
            log.info("Routing get report");
            getReport(req,res,storeTransactions);
        });

 
        //FOR CUSTOMER       
        //gets available discount
        router.get('/available/discount', cors(), (req: express.Request, res: express.Response) => {
            log.info("Routing get available discount");
            getAvailableDiscount(req,res,storeDiscounts,currentTransactionNumber);
        });
        //purchase with discount
        router.post('/purchase/:code', cors(), (req: express.Request, res: express.Response) => {
            log.info("Routing purchase with discount");
            purchaseWithDiscount(req,res,storeDiscounts,currentTransactionNumber, storeTransactions);
        })
        //purchase without discount
        router.post('/purchase', cors(), (req: express.Request, res: express.Response) => {
            log.info("Routing purchase without discount");
            purchaseWithoutDiscount(req,res,currentTransactionNumber, storeTransactions);
        });
        //DEFAULT
        router.get('/', (req: express.Request, res: express.Response) => {
            log.info("Root was called");
            res.json({
                message: `App is up and running`
            }) 
        })
        router.options('*', cors());

        server.use('/', router)
    }


}
export default Router;
