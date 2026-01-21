const Chat = require("../models/chatSchema");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    // 1. Fetch last 5 messages for context/memory
    const history = await Chat.find().sort({ timestamp: -1 }).limit(5);
    
    // 2. Format history for Gemini
    const chatHistory = history.reverse().map(msg => [
      { role: "user", parts: [{ text: msg.userMessage }] },
      { role: "model", parts: [{ text: msg.aiResponse }] },
    ]).flat();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // 3. Start a chat with history
    const chatSession = model.startChat({ history: chatHistory });
    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    // 4. Save new interaction
    const newChat = new Chat({ userMessage: message, aiResponse: responseText });
    await newChat.save();

    res.json({ reply: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { handleChat };