import * as express from 'express'
import cors from 'cors'
import {Logger} from "tslog"

class Router {

    constructor(server: express.Express) {
        const router = express.Router()

        let currentDiscount: Discount = {} as Discount;
        let currentTransactionNumber: number = 1;
        const log: Logger = new Logger;

        const discounts = new Array()


        //get all discounts
        router.get('/discounts', cors(), (req: express.Request, res: express.Response) => {
            log.info("About to get list of discounts")
            let discount: Discount = {} as Discount;
            discounts.push(discount); 
            res.json({
                discounts
            })
        });
        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: `App is up and running`
            })
        })

        router.options('*', cors());

        server.use('/', router)
    }
}

export default Router;