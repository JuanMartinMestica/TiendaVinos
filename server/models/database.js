require('dotenv').config({ path: './.env' });

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === 'production';

//Conection string for development
const connection = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

//Setting pool
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connection
});

module.exports = { pool };