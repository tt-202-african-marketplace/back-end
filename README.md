# endpoint documentation

## Products
root: https://tt-202-african-marketplace.herokuapp.com/api/products/

### GET /
shows array of all products that users have added for sale

response:
```
[{"id":1,"item_name":"test item","user_id":1,"category_id":3,"price":"6.99","description":"looks good!"}, {"id":2,"item_name":"dummy product","user_id":2,"category_id":3,"price":"3.00","description":"comfortable!"}]
```
### GET /:productid
returns an object. Shows the product with the specified id in the url

response:
```
{"id":1,"item_name":"test item","user_id":1,"category_id":3,"price":"6.99","description":"looks good!"}
```
### GET /categories/all
shows array of all 8 categories a listed product wil fall under

response
```
[{"id":1,"category_name":"animal products"},{"id":2,"category_name":"cereals"},{"id":3,"category_name":"clothing and shoes"},{"id":4,"category_name":"cosmetics"},{"id":5,"category_name":"fruits"},{"id":6,"category_name":"seeds and nuts"},{"id":7,"category_name":"vegetables"},{"id":8,"category_name":"other"}]
```

# These endpoints require or give authentication/authoriazation
Root URL: https://tt-202-african-marketplace.herokuapp.com/api/auth

## Register
POST /register/owner 
```
request :
    {
        email: jondoe@email.com,
        password: 123456,
        first_name: 'Jon',
        last_name: 'Doe',
        shop_name: 'Jon's Shop',
        location_id: 1
    }

response: 
    {
        4
    }
```    
Notes:  
- ```location_id``` will corespond to drop down choice 
- the integer in the repsonse is the new user's id

## Login
POST /login 
```
request :
    {
        email: jondoe@email.com,
        password: 123456,
    }

response: 
    {
        message: 'Welcome, Jon',
        role: 2,
        token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJmaXJzdF9uYW1lIjoiU2FtIiwicm9sZSI6MiwiaWF0IjoxNjA5ODIwNDI1LCJleHAiOjE2MDk4MjA0ODV9.PucZT3o1ZsejaTlDpEMey7nIE1kQGVZGYECESJhGisw
    }
```    
