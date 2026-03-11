module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define('Class', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        semester: {
            type: DataTypes.STRING,
            allowNull: false
        },
        academic_year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teacher_id: {
             type: DataTypes.UUID,
             references: {
                 model: 'teachers',
                 key: 'id'
             }
        }
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'classes'
    });

    Class.associate = (models) => {
        Class.hasMany(models.Student, { foreignKey: 'class_id' });
        Class.belongsTo(models.Teacher, { foreignKey: 'teacher_id', as: 'classTeacher' });
    };

    return Class;
};
