*** Settings ***
Library     ../Libraries/simulate.py


*** Keywords ***
Simulate race with ${racers} racers and ${gates} gates with ${laps} laps  
    @{positions}    simulate race   ${racers}       ${gates}        ${laps}
    [Return]    ${positions}
