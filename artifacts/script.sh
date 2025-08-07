#!/bin/bash

# Exit immediately on error
set -e

echo "🔧 Updating and upgrading system packages..."
sudo apt update && sudo apt upgrade -y

echo "📦 Installing dependencies for Python..."
sudo apt install software-properties-common curl -y

echo "🐍 Adding deadsnakes PPA and installing Python 3.13 + tools..."
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install python3.13 python3.13-venv python3-pip -y

echo "🧰 Installing Supervisor and Nginx..."
sudo apt install supervisor nginx -y

echo "🧵 Creating socket directory..."
sudo mkdir -p /run/sudo_user/
sudo chown -R sudo_user:www-data /run/sudo_user/
sudo chmod 770 /run/sudo_user/

echo "⬇️ Installing Node.js 24.x..."
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install nodejs -y

echo "✅ Server base setup complete!"
