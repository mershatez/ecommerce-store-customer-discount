import  {getDiscounts}  from '../src/controller/admin.controller';
import { Request, Response, NextFunction, request } from 'express';
 

describe('Get discounts', () => {
  test('Get discounts', async () => {
    const mockRequest: any = {
      body: {
        transactionNumber: 1,
        code: '123'
      },
    };

    const mockResponse: any = {
      json: jest.fn(),
      status: jest.fn(),
    };

    const storeDiscounts = new  Map<number,Discount> (); 
    let newDiscount: Discount = {} as Discount;
    newDiscount.transactionNumber = 1;
    newDiscount.code = "test";
    storeDiscounts[1]=newDiscount;
    getDiscounts(mockRequest,mockResponse,storeDiscounts);

    expect(getDiscounts(mockRequest,mockResponse,storeDiscounts)).not.toBeNull;
  });
  test('Show report', async () => {
    //TODO
  });
});