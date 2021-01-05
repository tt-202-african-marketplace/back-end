# documentation

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

## login
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
