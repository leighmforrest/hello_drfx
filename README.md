# Hello DRFX

It is intended for this full-stack web application to be deployed on a Linux VPS, using Supervisor, NGINX and Vite. A developer should be able to get the new code up and running using only `git push`, nothing more.

### Techonologies Used
 - Django
 - Django Rest Framework
 - React
 - Vite
 - Gunicorn
 - Nginx
 - GitHub Actions
 - Supervisor
 - Djoser
 - React Hook Form
 - React Router
 - Pytest
 - Vitest
 - React Testing Library

 #### Future Editions
 - TanStack Query

### Significant commands
    # Setup permissions for static files
    usermod -aG sudo_user www-data
    sudo chown -R sudo_user:www-data <PROJECT_DIRECTORY>/frontend/dist
    sudo chmod -R 750 <PROJECT_DIRECTORY>/frontend/dist
    sudo chmod -R 640 <PROJECT_DIRECTORY>/frontend/dist/*

    sudo chown -R sudo_user:www-data <PROJECT_DIRECTORY>/backend/staticfiles
    sudo chmod -R 750 <PROJECT_DIRECTORY>/backend/staticfiles
    sudo chmod -R 640 <PROJECT_DIRECTORY>/backend/staticfiles/*

    # Setup socket file directory
    sudo mkdir -p /run/hello
    sudo chown sudo_user:www-data /run/hello
    sudo chmod 775 /run/hello
    sudo chmod 775 /run/hello