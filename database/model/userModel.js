module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        "User", {
            Nick: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            User: {
                type: DataTypes.STRING,
            },
            UUID: {
                type: DataTypes.STRING,
            },
            Salt: {
                type: DataTypes.STRING,
            },
            Path: {
                type: DataTypes.STRING,
            },
            Visible: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            Password: {
                type: DataTypes.STRING,
            },
            Status: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
        }, {
            tableName: "User",
            //sequelize,
            timestamps: true,
            //createdAt: true,
            //updatedAt: 'updateTimestamp'
        }
    );