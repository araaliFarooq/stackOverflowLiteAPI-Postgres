export default (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
    {
      answer: { type: DataTypes.TEXT, allowNull: false },
      votes: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {}
  );
  Answer.associate = (models) => {
    Answer.belongsTo(models.Question, {
      foreignKey: 'questionId',
      onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    // associations can be defined here
  };
  return Answer;
};
