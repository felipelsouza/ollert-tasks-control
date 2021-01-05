require('dotenv').config();

const storage = process.env.DIALECT === 'sqlite' ? "./src/database/database.sqlite" : false;
const url = process.env.DIALECT === 'postgres' ? process.env.DATABASE_URL : false;

module.exports = {
    "dialect": process.env.DIALECT,
    "storage": storage,
    "url": url,
    "define": {
        "timestamps": true,
        "undescored": true
    }
};