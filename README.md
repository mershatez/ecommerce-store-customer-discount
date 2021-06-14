# ecommerce-store-customer-discount

This is a simple ecommerce service that provides API resouces that allows: 

1. A store owner 
    - to be able to give discount codes to every nth transaction
    - see a report that includes
        - the count of purchases that were made in the store 
        - the total count of discounts that were given out 
2. Customets
    - to see if  they have a discount and if  eligible to be able to see the appropriate discount code
    - to purchase items with a discount code if available 

Assumptions:
Server side state can be maintained all in memory, so no persistence layer is required
No authentication or authorization required on API/UI
Reports and any other data can be simple JSON 

# If time allows
Develop a simple UI with different pages for admin and customer 

