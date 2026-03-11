module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define('Result', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        student_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id'
            }
        },
        subject_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'subjects',
                key: 'id'
            }
        },
        college_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'MVSR WCE&T'
        },
        batch_year: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '3rd Year'
        },
        semester: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '3-1'
        },
        branch: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'CSE'
        },
        internal_marks: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 0
        },
        external_marks: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 0
        },
        total_marks: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 0
        },
        grade: {
            type: DataTypes.STRING(2),
            comment: 'S, A, B, C, D, E, F'
        },
        result_status: {
            type: DataTypes.ENUM('PASS', 'FAIL'),
            defaultValue: 'PASS'
        }
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'results'
    });

    Result.associate = (models) => {
        Result.belongsTo(models.Student, { foreignKey: 'student_id' });
        Result.belongsTo(models.Subject, { foreignKey: 'subject_id' });
    };

    return Result;
};
