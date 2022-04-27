#!/bin/bash

# Windows specifc command
CURRENT_DIR=$(cmd //c cd)

docker build -t localhost/robot:latest .
docker run -v ${CURRENT_DIR}/testing:/root --network=web_backend localhost/robot:latest robot -d results/ TestSuites/timer.robot