*** Settings ***
Library     ../Libraries/rethinkDB.py


*** Keywords ***
Connect to Database
    connect database    database        28015


Get all data from database ${database} and table ${table}
    @{entries}  get all documents in table      ${database}     ${table}
    [Return]    ${entries}