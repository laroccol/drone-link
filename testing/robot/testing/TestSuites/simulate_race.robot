*** Settings ***  
Resource    ../Resources/rest_api.robot
Resource    ../Resources/mqtt_keywords.robot
Resource    ../Resources/simulate.robot
Test Timeout       20 minutes
Library           DateTime
Library           Collections

*** Variables ***
${race.time}            10



*** Keywords ***
Subscribe to ${topic} And Validate It Recieves ${payload} message in under ${timeout} seconds
    Subscribe And Validate  topic=${topic}  qos=1   payload=${payload}  timeout=${timeout}

Wait for ${time} seconds
    sleep   ${time}

Subscribe to ${topic} topic
    ${time}         Get Time        epoch
    ${client}       Catenate        SEPARATOR=.     robot.mqtt  ${time}
    Subscribe Async     topic=${topic}

Confirm ${number_of_messages} message was sent to ${topic} topic
    @{messages}     Listen and Get Messages     topic=${topic}      limit=0
    Length Should Be    ${messages}     ${number_of_messages}

Publish ${message} to ${topic} and Disconnect
    ${time}         Get Time        epoch
    ${client}       Catenate        SEPARATOR=.     robot.mqtt  ${time}
    Publish to MQTT Broker and Disconnect   client.id=${client}     topic=${topic}      message=${message}      qos=1

Frequency ${frequency} detected at gate ${gate_num}
    ${time_stamp}      Get Time
    ${racePing}     Set Variable    {"time_stamp" : "${time_stamp}", "gate" : ${gate_num}, "frequency" : ${frequency}}
    Publish ${racePing} to race/pings and Disconnect



*** Test Cases ***

Add all timers to system
    Publish gate_1 to timer/register and Disconnect
    Publish gate_2 to timer/register and Disconnect
    Publish gate_3 to timer/register and Disconnect
    Publish gate_4 to timer/register and Disconnect
    Publish gate_5 to timer/register and Disconnect

Wait for start command on all timers
    Subscribe to gate/# topic
    # Start the race by setting all timers to "start"
    #Wait for 10 seconds
    #Confirm 5 message was sent to gate/# topic


Simulate racers flying through gates
    #Edit lists here for differnt gates, and pilot frequencies
    ${racers}      Create List      50   100   150
    ${gates}       Create List      1   2   3   4    5
    ${laps}        Set Variable     5

    @{simulation}   Simulate race with ${racers} racers and ${gates} gates with ${laps} laps

    FOR     ${position}     IN      @{simulation}
        ${racer}    Get From List   ${position}     0
        ${gate}     Get From List   ${position}     1

        Frequency ${racer} detected at gate ${gate}
        # Random Time
        ${random}=    Evaluate    random.randint(0,3)
        wait for ${random} seconds
    END



# Wait for end commands on all timers
