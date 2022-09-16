import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'taskmanagment',
        entities: [`${__dirname}/../**/*.entity.{js,ts}`],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
