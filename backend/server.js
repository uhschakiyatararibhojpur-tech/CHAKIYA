const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "UHS Chakiya Tarari Backend is working!",
        status: "online"
    });
});

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API is working successfully."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
