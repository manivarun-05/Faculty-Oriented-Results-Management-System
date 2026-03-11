module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING
        },
        contact_number: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'teachers'
    });

    Teacher.associate = (models) => {
        Teacher.belongsTo(models.User, { foreignKey: 'user_id' });
        Teacher.hasMany(models.Subject, { foreignKey: 'teacher_id' });
        Teacher.hasMany(models.Class, { foreignKey: 'teacher_id', as: 'classTeacher' });
    };

    return Teacher;
};
