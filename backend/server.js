const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Test backend
app.get("/", (req, res) => {
    res.json({
        message: "UHS Chakiya Tarari Backend is working!",
        status: "online"
    });
});
// Get all students
app.get("/api/students", async (req, res) => {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/students?select=*&order=id.desc`,
            {
                method: "GET",
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
            students: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
// Upload student photo to Supabase Storage
async function uploadStudentPhoto(base64Data, studentName) {

    if (!base64Data) {
        return "";
    }

    const parts = base64Data.split(",");

    if (parts.length !== 2) {
        throw new Error("Invalid student photo data");
    }

    const mimeMatch = parts[0].match(/data:(.*);base64/);

    if (!mimeMatch) {
        throw new Error("Invalid student photo format");
    }

    const contentType = mimeMatch[1];

    const extension =
        contentType === "image/png" ? "png" : "jpg";

    const safeName =
        (studentName || "student")
        .replace(/[^a-zA-Z0-9]/g, "_");

    const filePath =
        safeName + "_" + Date.now() + "." + extension;

    const fileBytes =
        Buffer.from(parts[1], "base64");

    const response = await fetch(
        `${SUPABASE_URL}/storage/v1/object/student-photos/${filePath}`,
        {
            method: "POST",
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
                "Content-Type": contentType
            },
            body: fileBytes
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Student photo upload failed"
        );
    }

    return filePath;
}
// Add a new student
app.post("/api/students", async (req, res) => {
    try {
        const student = req.body;
        const studentPhotoPath =
    await uploadStudentPhoto(
        student.student_photo,
        student.student_name
    );

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/students`,
            {
                method: "POST",
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json",
                    Prefer: "return=representation"
                },
                body: JSON.stringify({
                    student_name: student.student_name,
                    father_name: student.father_name,
                    mother_name: student.mother_name,
                    class_name: student.class_name,
                    mobile: student.mobile,
                    admission_number: student.admission_number,
                    student_photo_path: studentPhotoPath
                })
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
            message: "Student added successfully.",
            student: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
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
