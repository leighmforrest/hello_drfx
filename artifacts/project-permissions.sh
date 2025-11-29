# frontend permissions
sudo chmod 711 /home/leigh
sudo chmod 755 /home/leigh/django
sudo chmod 755 /home/leigh/django/pictures
sudo chmod -R 755 /home/leigh/django/pictures/frontend/dist
sudo chown -R leigh:www-data /home/leigh/django/pictures/frontend/dist

# sockfile permissions
sudo mkdir -p /run/leigh
sudo chown leigh:www-data /run/leigh
sudo chmod 770 /run/leigh

# create static folder
sudo mkdir -p /var/www/pictures/static
sudo chown -R leigh:www-data /var/www/pictures/static
sudo chmod -R 755 /var/www/pictures/static
