module.exports = (sequelize, DataTypes) => {
    const Exam = sequelize.define('Exam', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('mid', 'final', 'quiz'),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        class_id: {
             type: DataTypes.UUID,
             references: {
                 model: 'classes',
                 key: 'id'
             }
        }
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'exams'
    });

    Exam.associate = (models) => {
        Exam.hasMany(models.Result, { foreignKey: 'exam_id' });
        Exam.belongsTo(models.Class, { foreignKey: 'class_id' });
    };

    return Exam;
};
