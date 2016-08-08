#!/bin/sh
i=0
while ! nc "postgres" "5432" >/dev/null 2>&1 < /dev/null; do
  i=`expr $i + 1`
  if [ $i -ge 50 ]; then
    echo "$(date) - postgres:5432 still not reachable, giving up"
    exit 1
  fi
  echo "$(date) - waiting for postgres:5432..."
  sleep 1
done
echo "postgres connection established"