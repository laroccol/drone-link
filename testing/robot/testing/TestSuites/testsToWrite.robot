Run Race
    Send start command to api



Timer connects to system
    Timer sends connected message to log
    Database has timer in table xyz

Api can get OK status from timer
    [setup] subscribe to xyz
    Send api message to get timer xyz status
    Wait for mqtt message on subscribed channel
    respond with OK status

Api can set config of timer
    [setup] subscribe to xyz
    Send api message to set timer config
    Wait for mqtt message on subscribed channel
    respond with current config

Api can get config of timer
    [setup] subscribe to xyz
    Send api message to get configuration
    wait for mqtt message on subscribed channel
    respond with current configuration
    Check database for timer config

Api can start Race
    [setup] subscribe to xyz
    Send api messahe to start Race
    Wait for mqtt message on subscribed channel


Api can stop Race
    [setup] subsribe to xyz for 1 message
    Send api message to end race
    wait for mqtt message on subscribed channel


Api can calibrate timer
    [setup] subscribe to xyz
    Send api message to calibrate timer
    Wait for mqtt message on subscribe channel

Test MQTT Message can be sent
    Connect     192.168.1.5
    Subscribe to /test/topic And Validate It Recieves helloWorld message in under 10 seconds


*** Keywords ***
Subscribe to ${topic} And Validate It Recieves ${payload} message in under ${timeout} seconds
    Subscribe And Validate  topic=${topic}  qos=1   payload=${payload}  timeout=${timeout}