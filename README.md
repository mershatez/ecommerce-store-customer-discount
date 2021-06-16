# ecommerce-store-customer-discount

This is a simple ecommerce service that provides API resouces that allows: 

1. A store owner 
    - to be able to give discount codes to every nth transaction
    - see a report that includes
        - the count of purchases that were made in the store 
        - the total count of discounts that were given out 
2. Customets
    - to see if they have a discount and if  eligible to be able to see the appropriate discount code
    - to purchase items with a discount code if available 


HOW TO RUN THE SERVICE

I have added a Swagger for accessing all endpoints. Once you have the service up and running, you can go to 
http://localhost:3000/swagger/#/ and see all endpoints. If you choose to use curl command, please see the commonds at the end of this file. 


Mac
- on a mac go to terminal 
- cd to the directory
- npm install
- if it's your first time running it, run tsc
- npm run dev


This service is set to run on port 3000. You are free to change the port number inside server.ts. 
In case you have something else running on port 3000, you might come across an error that says
[1] Error: listen EADDRINUSE: address already in use :::3000
If that happens, follow the following steps. 

On your terminal type
1) lsof -i:3000
2) get the list of pids then
3) kill -9 <PID>



# ENDPOINTS
The service has the following endpoints. 

I) For Owner

1. To see a total number of transacitons made, total number of discounts used and, list all transactions
   - Using swagger - http://localhost:3000/report 
   - Using CURL - (curl -X 'GET' \ 'http://localhost:3000/report' \ -H 'accept: application/json')
2. To see discounts
   - Using swagger - http://localhost:3000/discounts
   - Using CURL - (curl -X 'GET' \ 'http://localhost:3000/discounts' \ -H 'accept: application/json')
3. To add a new discount
   - Using swagger - http://localhost:3000/new/discount
   - Using CURL - (curl -X 'POST' \ 'http://localhost:3000/new/discount' \ -H 'accept: application/json' \ -H 'Content-Type: application/json' \ -d '{ "transactionNumber": 1, "code": "string" }')

II) For Customer

1. To see available discount
   - Using swagger - http://localhost:3000/available/discount
   - Using CURL - (curl -X 'GET' \ 'http://localhost:3000/available/discount' \ -H 'accept: application/json')
2. To purchase without discount code
   - Using swagger - http://localhost:3000/purchase
   - Using CURL - (curl -X 'POST' \ 'http://localhost:3000/purchase' \ -H 'accept: application/json' \ -H 'Content-Type: application/json' \ -d '{ "customer": { "name": "string" }, "items": { "items": { "name": "string" } } })
3. To purchase with discount code
   - Using swagger - http://localhost:3000/purchase/{code}
   - Using CURL - (curl -X 'POST' \ 'http://localhost:3000/purchase/{code}' \ -H 'accept: application/json' \ -H 'Content-Type: application/json' \ -d '{ "customer": { "name": "string" }, "items": { "items": { "name": "string" } } }')


I wanted to apply typescript concurrency to purchase requests but I need to read more about it before being comfortable in using it properly since this is my first time ever to use typescript. I read about Promises but still need to dig a little deeper. 
 



