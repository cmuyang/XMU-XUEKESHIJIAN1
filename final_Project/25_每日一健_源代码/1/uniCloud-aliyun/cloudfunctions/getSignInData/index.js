const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const res = await db.collection('open-sign-in').where({
      userId: cloud.getWXContext().OPENID, // 使用当前用户的 OPENID 作为查询条件
    }).get();

    return {
      code: 0,
      data: res.data,
    };
  } catch (error) {
    return {
      code: -1,
      error: error.message,
    };
  }
};