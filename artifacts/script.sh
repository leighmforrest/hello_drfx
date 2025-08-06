#!/bin/bash
set -e

PROJECT_NAME = $1
echo "PROJECT NAME: $PROJECT_NAME"

# Set up python to current version
sudo apt update && sudo apt upgrade -y
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install python3.13 python3.13-venv python3-pip supervisor nginx -y

sudo mkdir -p /run/leigh/
sudo chown leigh:www-data /run/leigh/
sudo chmod 770 /run/leigh/

# Run this after code is set to server
# chmod 755 /home
# chmod 755 /home/leigh/web
# chmod 755 /home/leigh/web/$PROJECT_NAME

# # After collectstatic and project setup:
# sudo chown leigh:www-data /run/leigh/hello.sock
# sudo chmod 770 /run/leigh/hello.sock
# sudo chown -R leigh:www-data /var/www/hello/backend
# sudo chmod -R 755 /home/leigh/web/django/static
# cp -r /home/leigh/web/hello/frontend/build/* /var/www/hello/frontend