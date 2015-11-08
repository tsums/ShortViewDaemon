#!/bin/bash

loads=($(mpstat -P ALL 1 1 | awk '/Average:/ && $2 ~ /[0-9]/ {print $3}'))

echo ${loads[0]} ${loads[1]} ${loads[2]} ${loads[3]}

