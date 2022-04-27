import random


def simulate_race(racers, gates, laps):
    # returns list of tuples where [racer, gate] and the order is how the race plays out

    # Sanitize inputs
    gates = [int(i) for i in gates]
    laps = int(laps)

    #Process
    positions = []

    racer_gate_hits = {}
    for racer in racers:
        racer_gate_hits[racer] = 0

    max_gates_hit = len(gates) * laps
    total_gates_hit = max_gates_hit * (len(racers))

    for x in range(total_gates_hit):
        num_of_gates = len(gates)
        # Pick random racer
        rand = random.randint(0, len(racers)-1)
        current_racer = racers[rand]

        current_gate_hits = racer_gate_hits[current_racer]

        if current_gate_hits == max_gates_hit:
            racers.pop(rand)
        else:
            racer_gate_hits.update({current_racer: current_gate_hits + 1})
        element = list([current_racer, (current_gate_hits % num_of_gates)+1])
        positions.append(element)
    return positions