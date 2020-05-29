#!/usr/bin/env bash

while { echo -en "$RESPONSE"; } | nc -l "${2:-8080}"; do
RESPONSE="HTTP/1.1 200 OK\r\nConnection: keep-alive\r\n\r\n$(cat $1)\r\n"
  echo "================================================"
done