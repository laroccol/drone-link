import rethink from 'rethinkdb';

export const onPingReceived = async (ping, conn) => {
    const gate = ping.gate;
    const pilotFrequency = ping.frequency;
    const date = new Date(ping.time_stamp);
    const timestamp = date.getTime();

    if (!gate || !pilotFrequency || !timestamp) return;

    console.log(ping);

    rethink.db('drone-link').table('pilots').filter({frequency: pilotFrequency}).run(conn, async (err, result) => {
        result.toArray(async (e, r) => {
            if (e) throw e;

            if (r.length > 0)
            {
                const pilotData = r[0];
                const pilotId = pilotData.id;
                const currentRaceId = pilotData.current_race;

                if (currentRaceId === null) return;

                const pilotRaceStats = await rethink.db('drone-link').table(`race_${currentRaceId}_stats`).get(pilotId).run(conn);
                const lastGate = pilotRaceStats.gate;
                const lapTimes = pilotRaceStats.lapTimes;

                let newLapTimes = lapTimes;

                if (gate === 1) {
                    if (lastGate !== 0) {
                        newLapTimes[newLapTimes.length - 1] = timestamp - newLapTimes[newLapTimes.length - 1];
                    }

                    newLapTimes.push(timestamp);
                }

                const raceStatsCursor = await rethink.db('drone-link').table(`race_${currentRaceId}_stats`).run(conn);
                if (!raceStatsCursor) return;

                let raceStats = await raceStatsCursor.toArray();

                const currentPilotIndex = findWithAttr(raceStats, 'id', pilotId);

                raceStats[currentPilotIndex] = {...pilotRaceStats, gate: gate, lapTimes: newLapTimes};

                let sortedRaceStats = determinePlaces(raceStats);
                updatePlaceChanges(sortedRaceStats, currentRaceId, conn);

                console.log(newLapTimes);

                rethink.db('drone-link').table(`race_${currentRaceId}_stats`).get(pilotId).update({gate: gate, lapTimes: newLapTimes}).run(conn);

            }
        })
        //console.log(await getFirstItemFromCursor(err, cursor));
    });
}

const determinePlaces = (raceArray) => {
    let newArray = raceArray.sort((a, b) => {
        if (a.lapTimes.length < b.lapTimes.length) {
            return 1;
        }
        else {
            if (a.lapTimes.length > b.lapTimes.length) {
                return -1;
            }
            else {
                if (a.gate < b.gate) {
                    return 1;
                }
                else {
                    if (a.gate > b.gate) {
                        return -1
                    }
                    else {
                        return 1;
                        /*
                        if (a.lapTimes[a.lapTimes.length -1] > b.lapTimes[b.lapTimes.length -1]) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                        */
                    }
                }
            }
        }
    });

    return newArray;
}

const updatePlaceChanges = (sortedRaceStats, raceId, conn) => {
    for (let index = 0; index < sortedRaceStats.length; index++) {
        const element = sortedRaceStats[index];
        console.log(`Element: ${element.place}, Index: ${index}`);
        if (element.place !== index + 1) {
            console.log("Updating");
            rethink.db('drone-link').table(`race_${raceId}_stats`).get(element.id).update({place: index + 1}).run(conn);
        }
        
    }
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}