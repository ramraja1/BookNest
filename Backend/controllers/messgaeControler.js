import Message from "../models/userMessage.js"; // Ensure correct file path

export const messageController = async (req, res) => {
    try {
        const { name, email, message } = req.body; // ✅ Destructure the request body

        // ✅ Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ✅ Create and save the message
        const newMessage = await Message.create({ name, email, message });

        res.status(201).json({ success: true, message: "Message sent successfully!", data: newMessage });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
