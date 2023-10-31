const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

require("dotenv").config();

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;
const APP_ID = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
  try {
    const { email, fullName, phoneNumber, userName, password } = req.body;

    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(API_KEY, API_SECRET, APP_ID);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    res.status(200).json({
      token,
      fullName,
      userName,
      email,
      userId,
      hashedPassword,
      phoneNumber,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const serverClient = connect(API_KEY, API_SECRET, APP_ID);
    const client = StreamChat.getInstance(API_KEY, API_SECRET);

    const { users } = await client.queryUsers({ name: userName });

    if (!users.length)
      return res.status(400).json({
        message: "User doesn't exist",
      });

    const success = await bcrypt.compare(password, users[0].hashedPassword);

    const token = serverClient.createUserToken(users[0].id);

    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        userName,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  signup,
  login,
};
