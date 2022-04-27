*** Settings ***
Library       REST   api:3000

*** Variables ***
    



*** Keywords ***
Get request to ${url}
    GET     ${url}

Post request to ${url} with ${data} message
    POST     ${url}     ${data}
    