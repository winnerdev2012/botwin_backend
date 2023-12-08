import { Sequelize } from 'sequelize';

const db = new Sequelize('pe8x5oeu04c22t8i', 'vz3x9dqklj4ykbj2', 'z19nvr0xh90oe70a', {
    host: 'nuepp3ddzwtnggom.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

export { db };