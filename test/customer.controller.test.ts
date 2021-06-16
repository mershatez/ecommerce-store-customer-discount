import  {getAvailableDiscount}  from '../src/controller/customer.controller';
import { Request, Response, NextFunction, request } from 'express';
 

describe('User Registration', () => {
  test('User has an invalid first name', async () => {
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

    expect(getAvailableDiscount(mockRequest,mockResponse,storeDiscounts,1)).not.toBeNull;
    expect(getAvailableDiscount(mockRequest,mockResponse,storeDiscounts,2)).toBeNull;

  });
});