module.exports = {
    dialect: 'sqlite',
    storage: './src/database/database.sqlite',
    ssl: false,
    define: {
        timestamps: true,
        undescored: true
    }
};