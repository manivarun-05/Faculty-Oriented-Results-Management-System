module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'teacher', 'student'),
            allowNull: false,
            defaultValue: 'student'
        }
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'users'
    });

    User.associate = (models) => {
        User.hasOne(models.Student, { foreignKey: 'user_id' });
        User.hasOne(models.Teacher, { foreignKey: 'user_id' });
    };

    return User;
};
