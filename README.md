# Hello DRFX

It is intended for this full-stack web application to be deployed on a Linux VPS, using Supervisor, NGINX and Vite. A developer should be able to get the new code up and running using only `git push`, nothing more.

### Prerequisites for the Server
- Python 3.13+
- PIP
- Python Virtual Environment
- Node 22.14+
- SSH

### Techonologies Used
 - Django
 - Django Rest Framework
 - React
 - Vite
 - Gunicorn
 - Nginx
 - GitHub Actions
 - Supervisor
 - Tailwindcss
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

### Environment Variables

Both the frontend and the backend have their own environment variables needed to make the application function. Each has a .env that needs to be set up where their respective directories are located.

#### Backend Variables
| Variable  | Description   |
|---|---|
| SECRET_KEY | A string for signing things cryptographically. There is no default value and it must be generated for each project.|
| ALLOWED_HOSTS  | A list of strings representing the host/domain names that your Django site can serve. This is a list of all of the backend urls in a comma-delimited string.   |
| CORS_ALLOWED_ORIGINS | Set the url of the non-domain origins that are allowed to make requests to the backend. Set this to all of the front end urls used to make contact, in a comma-delimited string.   |
| DJANGO_DEBUG | Determines whether backend is run in debug mode or not. Can be set `on` or `off`  |

#### Frontend Variables
| Variable  | Description   |
|---|---|
| VITE_API_BASE_URL | The url for the backend used to make api calls e.g. `http://127.0.0.1:8000/api` The `/api` endpoint is the base endpoint for this project's backend.|

#### Github Actions Secrets

To push the code to the server and serve it up fresh, certain Github Actions secrets need to be set up in your repo under `settings`.
| Variable  | Description   |
|---|---|
| APP_DIRECTORY | Full path of the directory where the project lives.|
| PRIVATE_KEY | The private key used to SSH into the server. The file's contents start with `BEGIN OPENSSH PRIVATE KEY`.|
| SERVER_IP | The IP address of your VPS.|
| SUDO_PASSWORD | The password used to make sudo commands. |
| USERNAME |  username on the server of your sudo user.|