const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Test backend
app.get("/", (req, res) => {
    res.json({
        message: "UHS Chakiya Tarari Backend is working!",
        status: "online"
    });
});

// Test Supabase connection
app.get("/api/test-db", async (req, res) => {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/students?select=id&limit=1`,
            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                error: data
            });
        }

        res.json({
            success: true,
            message: "Supabase database connection is working.",
            data: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
