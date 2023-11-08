module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      'article',
      {
          article_idx: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: '회원고유번호',
        },
        title: {
          type: DataTypes.STRING(200),
          primaryKey: false,
          allowNull: false,
          comment: '글제목',
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '글내용..',
          }
      },
      {
         timestamps: true,
         paranoid: true
     });
  };