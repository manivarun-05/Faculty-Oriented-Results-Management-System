module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define('Subject', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        credits: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        department: {
            type: DataTypes.STRING
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
        tableName: 'subjects'
    });

    Subject.associate = (models) => {
        Subject.hasMany(models.Result, { foreignKey: 'subject_id' });
        Subject.belongsTo(models.Teacher, { foreignKey: 'teacher_id' });
    };

    return Subject;
};
