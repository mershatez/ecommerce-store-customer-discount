import { getAvailableDiscount } from '../src/controller/customer.controller';
import { purchaseWithDiscount } from '../src/controller/customer.controller';
import { purchaseWithoutDiscount } from '../src/controller/customer.controller';
import { Request, Response, NextFunction, request } from 'express';


describe('Testing available discount', () => {
  const mockRequest: any = {
    body: {
      transactionNumber: 1,
      code: '123'
    }
  };

  const mockResponse: any = {
    json: jest.fn(),
    status: jest.fn(),
  };

  const storeDiscounts = new Map<number, Discount>();
  let newDiscount: Discount = {} as Discount;
  newDiscount.transactionNumber = 1;
  newDiscount.code = "testdiscount";
  storeDiscounts[1] = newDiscount;

  test('Invalid discount', async () => {
    expect(getAvailableDiscount(mockRequest, mockResponse, storeDiscounts, 2)).toBeNull;

  });
  test('Valid discount', async () => {
    expect(getAvailableDiscount(mockRequest, mockResponse, storeDiscounts, 1)).not.toBeNull;
  });
  test('Purchase without discount', async () => {
    let report = new Array<Transaction>();
    let customer: Person = {} as Person;
    customer.name = "testCustomer";
    let transaction: Transaction = {} as Transaction;
    transaction.number = 1;
    transaction.customer = customer;
    let storeTransactions = new Array<Transaction>();
    storeTransactions.push(transaction);
    expect(purchaseWithoutDiscount(mockRequest, mockResponse, 1, storeTransactions)).not.toBeNull;
  });
  //TODO: ADD MORE TESTS 
});