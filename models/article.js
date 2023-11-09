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
          allowNull: false,
          comment: '글제목',
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '글내용',
        },
        view_count:{
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: '조회수',
        },
        ip_address:{
          type: DataTypes.STRING(20),
          allowNull:false,
          comment: '아이피주소',
        },
        reg_date:{
          type: DataTypes.DATE,
          allowNull: false,
          comment: '등록일시',
        },
        reg_member_id:{
          type: DataTypes.STRING(50),
          allowNull: false,
          comment: '등록자아이디',
        }
      },
      {
         timestamps: true, //데이터 등록일과 수정일 컬럼을 자동으로 만들어주고 관리해준다.createdAt,updatedAt
         paranoid: true //데이터를 삭제시 물리적으로 삭제하지않고 orm상에서는 삭제된것으로 관리해주고 deletedAT컬럼을 생성해주고 삭제된 날자를 관리한다.
    });
  };