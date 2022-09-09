# .gitpod.Dockerfile
FROM gitpod/workspace-full:latest
FROM gitpod/workspace-postgres

ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB taskmanagment