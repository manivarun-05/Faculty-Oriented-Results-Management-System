module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
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
        reg_number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATEONLY
        },
        guardian_contact: {
            type: DataTypes.STRING
        },
        class_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'classes',
                key: 'id'
            }
        }
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'students'
    });

    Student.associate = (models) => {
        Student.belongsTo(models.User, { foreignKey: 'user_id' });
        Student.belongsTo(models.Class, { foreignKey: 'class_id' });
        Student.hasMany(models.Result, { foreignKey: 'student_id' });
    };

    return Student;
};
