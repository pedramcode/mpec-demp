# MPEC service

A **Mathematical Proof Explanatory Chain** service for demo.

## Dependencies

* **@nestjs/swagger** – Generates OpenAPI (Swagger) documentation for all REST APIs, making endpoints self-describing and testable.
* **class-validator** – Declarative validation of request DTOs (e.g., ensuring non-empty strings, valid UUIDs, enums).
* **typeorm** – Object-relational mapper (ORM) for PostgreSQL, handling entities, migrations, and database queries in a TypeScript-friendly way.
* **winston** – A versatile logging library supporting multiple transports (console, file, JSON).

## How to run

Create a `.env` file at root with following content (values are sample):

```ENV
# ========== Docker compose requirements ==========
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=mpec
PGADMIN_DEFAULT_EMAIL=admin@mail.com
PGADMIN_DEFAULT_PASSWORD=admin

# ========== Main service requirements ==========
NODE_ENV=development
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=mpec
DATABASE_USERNAME=admin
DATABASE_PASSWORD=admin
```

Then run following command:

```bash
docker compose up --build
```

NOTE: Swagger documentation is at `/docs` end-point

---

## 🛠 Services (Docker Compose)

This project uses **Docker Compose** to orchestrate the backend, database, and database administration tool. Below are the services included in `docker-compose.yml`:

### 1. **mpec (Backend Service)**

* **Image/Build**: Built from the local `Dockerfile.dev`.
* **Container Name**: `mpec-service`.
* **Purpose**: Runs the NestJS backend API.
* **Environment Variables**:

  * `NODE_ENV=development`
  * `DATABASE_HOST=postgres`
  * `DATABASE_PORT=5432`
  * `DATABASE_NAME=${POSTGRES_DB}`
  * `DATABASE_USERNAME=${POSTGRES_USER}`
  * `DATABASE_PASSWORD=${POSTGRES_PASSWORD}`
  * `PORT=3000`
* **Ports**: Exposes backend API on `http://localhost:3000`.
* **Volumes**: Mounts `./src` to `/app/src` for hot-reloading in development.
* **Depends On**: Waits for the `postgres` service to be available.
* **Network**: Connected to `mpec_net`.

---

### 2. **postgres (Database Service)**

* **Image**: `postgres:16-alpine`.
* **Container Name**: `mpec-postgres`.
* **Purpose**: Provides the PostgreSQL database used by the backend.
* **Environment Variables**:

  * `POSTGRES_USER=${POSTGRES_USER}`
  * `POSTGRES_PASSWORD=${POSTGRES_PASSWORD}`
  * `POSTGRES_DB=${POSTGRES_DB}`
* **Ports**: Maps container port `5432` to host port `5430` → accessible at `localhost:5430`.
* **Volumes**: Persists data using `mpec_pgdata` volume.
* **Network**: Connected to `mpec_net`.

---

### 3. **pgadmin (Database Administration UI)**

* **Image**: `dpage/pgadmin4:latest`.
* **Container Name**: `mpec-pgadmin`.
* **Purpose**: Web-based administration tool for PostgreSQL.
* **Environment Variables**:

  * `PGADMIN_DEFAULT_EMAIL=${PGADMIN_DEFAULT_EMAIL}`
  * `PGADMIN_DEFAULT_PASSWORD=${PGADMIN_DEFAULT_PASSWORD}`
* **Ports**: Exposes UI on `http://localhost:5440`.
* **Depends On**: Requires `postgres` to be available.
* **Network**: Connected to `mpec_net`.

---

### 🔗 Networks and Volumes

* **Network**: `mpec_net` (bridge driver) ensures communication between containers.
* **Volume**: `mpec_pgdata` persists PostgreSQL data across container restarts.

---

## ERD

![ERD image](./ERDiagram.png)