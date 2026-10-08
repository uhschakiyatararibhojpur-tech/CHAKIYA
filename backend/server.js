const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

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

                    student_name:
                        student.student_name,

                    father_name:
                        student.father_name,

                    mother_name:
                        student.mother_name,

                    class_name:
                        student.class_name,

                    mobile:
                        student.mobile,

                    date_of_birth:
                        student.date_of_birth,

                    gender:
                        student.gender,

                    admission_number:
                        student.admission_number,

                    student_photo_path:
                        studentPhotoPath
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

        return res.json({
            success: true,
            message: "Student added successfully.",
            student: data
        });

    } catch (error) {

        console.error(
            "STUDENT REGISTRATION ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
// Get temporary secure URL for a student photo
app.get("/api/student-photo", async (req, res) => {
    try {

        const filePath = req.query.path;

        if (!filePath) {
            return res.status(400).json({
                success: false,
                error: "Photo path is required"
            });
        }

        const response = await fetch(
            `${SUPABASE_URL}/storage/v1/object/sign/student-photos/${encodeURIComponent(filePath)}`,
            {
                method: "POST",
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    expiresIn: 3600
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

        return res.json({
            success: true,
            url: `${SUPABASE_URL}/storage/v1${data.signedURL}`
        });

    } catch (error) {

        console.error(
            "PHOTO URL ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
// Update student
app.put("/api/students/:id", async (req, res) => {
    try {

        const studentId = req.params.id;
        const student = req.body;

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/students?id=eq.${studentId}`,
            {
                method: "PATCH",

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
                    date_of_birth: student.date_of_birth,
                    gender: student.gender,
                    mobile: student.mobile,
                    admission_number: student.admission_number
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

        return res.json({
            success: true,
            message: "Student updated successfully.",
            student: data
        });

    } catch (error) {

        console.error(
            "STUDENT UPDATE ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
// Delete student
app.delete("/api/students/:id", async (req, res) => {
    try {

        const studentId = req.params.id;

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/students?id=eq.${studentId}`,
            {
                method: "DELETE",
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                    Prefer: "return=representation"
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

        return res.json({
            success: true,
            message: "Student deleted successfully.",
            student: data
        });

    } catch (error) {

        console.error(
            "STUDENT DELETE ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
// Save student attendance
// Save or update student attendance
app.post("/api/attendance", async (req, res) => {
    try {
        const {
            student_id,
            attendance_date,
            status
        } = req.body;

        if (!student_id || !attendance_date || !status) {
            return res.status(400).json({
                success: false,
                error: "Student ID, date and status are required."
            });
        }

        if (!["Present", "Absent", "Leave"].includes(status)) {
            return res.status(400).json({
                success: false,
                error: "Invalid attendance status."
            });
        }

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/attendance?on_conflict=student_id,attendance_date`,
            {
                method: "POST",
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json",
                    Prefer: "resolution=merge-duplicates,return=representation"
                },
                body: JSON.stringify({
                    student_id: student_id,
                    attendance_date: attendance_date,
                    status: status
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

        return res.json({
            success: true,
            message: "Attendance saved successfully.",
            attendance: data
        });

    } catch (error) {
        console.error("ATTENDANCE ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
app.get("/api/attendance", async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                success: false,
                error: "Attendance date is required."
            });
        }

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/attendance?attendance_date=eq.${encodeURIComponent(date)}&select=id,student_id,attendance_date,status`,
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

        return res.json({
            success: true,
            attendance: data
        });

    } catch (error) {
        console.error("GET ATTENDANCE ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
