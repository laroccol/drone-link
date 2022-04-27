*** Settings ***  
Resource    ../Resources/rest_api.robot
Resource    ../Resources/mqtt_keywords.robot
Resource    ../Resources/rethinkdb.robot
Test Timeout       2 minutes

*** Variables ***
${json.database}        {"database": "drone-link", "tablename": "data"}
${json.mqtt}            {"topic" : "test", "message" : "helloWorld"}
${json.timers}          {"database": "drone-link", "tablename": "timers"}

*** Keywords ***
Subscribe to ${topic} And Validate It Recieves ${payload} message in under ${timeout} seconds
    Subscribe And Validate  topic=${topic}  qos=1   payload=${payload}  timeout=${timeout}

Wait for ${time} seconds
    sleep   ${time}

Subscribe to ${topic} topic as ${client}
    Subscribe Async     client.id=${client}           topic=${topic}

Confirm ${number_of_messages} message was sent to ${topic} topic with ${message} message
    @{messages}     Listen and Get Messages  topic=${topic}
    Length Should Be    ${messages}     ${number_of_messages}
    Should Be Equal As Strings      ${messages}[0]      helloWorld

Publish ${message} to ${topic} and Disconnect
    Publish to MQTT Broker and Disconnect   topic=${topic}      message=${message}

    

*** Test Cases ***
Api is running
    Get request to /

Api can reach database
    Get request to /database/initalize
    Wait for 2 seconds
    Post request to database/getall with ${json.database} message
 
Api can send Mqtt Message
    Subscribe to test topic as clientTest
    Post request to mqtt/message with ${json.mqtt} message
    Wait for 2 seconds             
    Confirm 1 message was sent to test topic with helloWorld message

Timer can be added to system
    Publish 1 to timer/register and Disconnect
    Connect to Database
    @{data}  Get all data from database drone-link and table timers



