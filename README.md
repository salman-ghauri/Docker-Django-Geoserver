# Docker-Django-Geoserver
This is a sample application to get started with docker compose.
It has following components which run in seperate container:
- Ngnix
- Geoserver
- Postgresql
- Django web app
- Named data volumes

All of the settings in docker compose yaml are intended to beused on local system while the other file is for server.

### Django Web App
It is a simple web app which is loading few layers of map and data from geoserver. It is using ***Openlayers 3*** for frontend manipulation of data.
This web app is serverd using Ngnix server and gunicorn. They are setup in respective containers.

### Run Application
To run the application, just cd into the folder of docker-compose.yml file run following commands:
```sh
$ docker-compose build
$ docker-compose up
```

Feel free to contact regarding any query.
***Cheers!***
