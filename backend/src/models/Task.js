const { Model, DataTypes } = require('sequelize');

class Task extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING
        }, {
            underscored: true,
            sequelize
        })
    };

    static associate(models) {
        this.belongsTo(models.Project, {
            foreignKey: 'project_id',
            as: 'project'
        });
        this.belongsTo(models.TaskStatus, {
            foreignKey: 'status_id',
            as: 'status'
        });
    }
};

module.exports = Task;