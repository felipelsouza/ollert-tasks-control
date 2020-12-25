const { Model, DataTypes } = require('sequelize');

class TaskStatus extends Model {
    static init(sequelize) {
        super.init({
            status: DataTypes.STRING
        }, {
            underscored: true,
            tableName: 'task_status',
            timestamps: false,
            sequelize
        })
    };

    static associate(models) {
        this.hasMany(models.Task, {
            foreignKey: 'status_id',
            as: 'tasks'
        })
    };
};

module.exports = TaskStatus;