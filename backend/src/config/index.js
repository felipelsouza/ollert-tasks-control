module.exports = {
    dialect: 'sqlite',
    storage: './src/database/database.sqlite',
    define: {
        timestamps: true,
        undescored: true
    }
};