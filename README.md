# APP-Y_Intrapredenti_g2
Repository for APP-Y PoliTO project, group 2

## Frontend (Hybrid App - Ionic Framework + Angular)
L'applicazione utilizza la coppia framework Ionic + Angular

*Documentazione*
| Framework | Url |
|-----------|-----|
| Ionic | [docs](https://ionicframework.com/docs) |
| Angular | [docs](https://angular.io/docs) |

Per lanciare l'applicazione:
```bash
cd appy_frontend
ionic start
```

## Backend (Go)
Il backend si basa su un web server http che fornisce endpoint api RESTful

_Base endpoint_: `/api`

Per lanciare il backend:
```bash
cd appy_backend
go run main.go
```

_NOTA: è necessario prima avviare un'istanza di database, vedi sezione successiva_

### Login

### Register

### Password recovery

## Database
Il database in utilizzo è *postgresql*

Per lanciare il database:
```bash
docker compose up [-d]
```

_NOTA: l'infrastruttura backend-db è containerizzata in Docker (vedi `docker-compose.yml`)_
