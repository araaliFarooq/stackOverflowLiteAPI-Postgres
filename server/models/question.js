export default (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      qstnbody: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      tags: DataTypes.ARRAY(DataTypes.TEXT)
    },
    {}
  );
  Question.associate = (models) => {
    Question.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE'
    });
    Question.hasMany(models.Answer, {
      foreignKey: 'questionId',
      as: 'answers'
    });
    // associations can be defined here
  };
  return Question;
};
