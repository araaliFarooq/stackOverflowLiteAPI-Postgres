export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    passwordResetToken: { type: DataTypes.STRING },
    passwordResetExpires: { type: DataTypes.DATE }
  });

  return User;
};
