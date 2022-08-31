import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'local',
        database: 'taskmanagment',
        entities: [`${__dirname}/../**/*.entity.{js,ts}`],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
