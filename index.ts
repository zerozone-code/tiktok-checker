import mongoose from "mongoose";

const Connect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://myokokowebdev_db_user:fIMD5G9Ky0Q5oQiA@cluster0.3j84zgs.mongodb.net/titktok",
    );
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

Connect();
