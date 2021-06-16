import { getDiscounts } from '../src/controller/admin.controller';
import { createNewDiscount } from '../src/controller/admin.controller';
import { getReport } from '../src/controller/admin.controller';
import { Request, Response, NextFunction, request } from 'express';


describe('Get discounts', () => {
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

  const storeDiscounts = new Map<number, Discount>();
  let newDiscount: Discount = {} as Discount;
  newDiscount.transactionNumber = 1;
  newDiscount.code = "test";
  storeDiscounts[1] = newDiscount;
  test('Get discounts', async () => {
    expect(getDiscounts(mockRequest, mockResponse, storeDiscounts)).not.toBeNull;
  });
  test('Create invalid discount', async () => {
    mockRequest.body = null;
    expect(createNewDiscount(mockRequest, mockResponse, storeDiscounts)).toBeNull;
  });
  test('Test invalid report', async () => {
    mockRequest.body = null;
    expect(getReport(mockRequest, mockResponse, new Array<Transaction>())).toBeUndefined;
  });
  test('Test valid report', async () => {
    let report = new Array<Transaction>();
    let customer: Person = {} as Person;
    customer.name = "testCustomer";
    let transaction: Transaction = {} as Transaction;
    transaction.number = 1;
    transaction.customer = customer;
    let storeTransactions = new Array<Transaction>();
    storeTransactions.push(transaction);
    expect(getReport(mockRequest, mockResponse, storeTransactions)).not.toBeNull;
  });
  //TODO: ADD MORE TESTS 
});