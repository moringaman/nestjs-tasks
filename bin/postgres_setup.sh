psql -c 'CREATE USER postgres' -d postgres
psql -c 'ALTER USER postgres CREATEDB' -d postgres
createdb -U postgres taskmanagment
psql -c 'GRANT ALL PRIVILEGES ON DATABASE taskmanagment TO postgres' -d taskmanagment
psql -c 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres' -d taskmanagment
psql -c 'GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres' -d taskmanagment