psql -c 'CREATE USER postgres' -d postgres
psql -c 'ALTER USER postgres CREATEDB' -d postgres
createdb -U postgres taskmanagment