#!/usr/bin/env bash

PWD=$PWD user=$(id -u) group=$(id -g) docker-compose --file ./docker-compose.yml up --build nodejs.dev