## .env file

PORT="put here any port you want"<br>
SECRIT_KEY_JWT="put here any Random Secrit token key"

## /api/login

### Request :

Method POST <br>
email : "put email here" <br>
password : "put password here , Password Must respect these rules it must be biger then 8 chacater " <br>

### Response:

## success login

example data recive :

    {
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQ5OTg2MTl9.2uNZYQ0iKgL5oStIhH3jSaR5qSLrXDml1FttK2IvDQY",
    "msg": "login seccess"
    }

## Fail login

example data rescive :

    {
        "status": "fail",
        "msg": "password / email is not correct"
    }
