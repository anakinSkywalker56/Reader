const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  port: 4306,
  host: "localhost",
  user: "adminuser",
  password: "abc@123!",
  database: "reader",
});

db.connect();

app.get("/", (re, res) => {
  return res.json("Arf Arf");
});

app.get("/users", (rep, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json("Err");

    if (data.length > 0) {
      return res.json({
        message: "Login Successful",
        user: data[0],
      });
    } else {
      return res.json({ message: "No record" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, username, password } = req.body;

  // ✅ Basic validation
  if (!name || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO users (name, username, password)
    VALUES (?, ?, ?)
  `;
  const values = [name, username, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ error: "Failed to register user" });
    }
    return res.status(201).json({ message: "User registered successfully!" });
  });
});

app.get("/books", (rep, res) => {
  const sql = `
        SELECT
            id,
            name,
            author,
            imageLink
        FROM books
        `;
  db.query(sql, (err, data) => {
    if (err) res.json(err);
    return res.json(data);
  });
});

app.get("/bookprofile/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM books WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    res.json(result[0]);
  });
});

app.get("/bookprofile/:id/volumes", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM volumes WHERE bookId = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

app.get("/profile/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM profiles WHERE userId = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.json(err);
    res.json(result[0]);
  });
});

app.get("/library/:id", (req, res) => {
  const id_lib = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id_lib], (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

app.post("/updateProfile", (req, res) => {
  const sql = `
        UPDATE profiles
        SET profileImg = ?, profileBg = ?
        WHERE id = ?
    `;

  const values = [
    req.body.profileImg,
    req.body.profileBg,
    req.body.id, // primary key of the profile row
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: "Profile updated successfully!" });
  });
});

app.get("/chapters/volume/:volumeId/chapter/:chapterNum", (req, res) => {
  const volumeId = req.params.volumeId;
  const chapterNum = req.params.chapterNum;

  console.log("Incoming request:", volumeId, chapterNum); // Add this
  const sql = "SELECT * FROM chapters WHERE volumeId = ? AND chapterNum = ?";

  db.query(sql, [volumeId, chapterNum], (err, result) => {
    if (err) return res.json(err);
    console.log("Query result:", result); // Add this
    res.json(result[0]);
  });
});

app.get("/chapters/volume/:volumeId", (req, res) => {
  const volumeId = req.params.volumeId;
  const sql = "SELECT * FROM chapters WHERE volumeId = ? ORDER BY chapterNum";

  db.query(sql, [volumeId], (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

app.post("/updateUser", (req, res) => {
  const sql = `
        UPDATE users
        SET name = ?, username = ?, password = ?, description = ?
        WHERE id = ?
    `;

  const values = [
    req.body.name,
    req.body.username,
    req.body.password,
    req.body.description,
    req.body.id, // primary key of the profile row
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: "Profile updated successfully!" });
  });
});

app.delete("/deleteUser", (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).send("Missing userId");

  const deleteProfile = "DELETE FROM profiles WHERE userId = ?";
  const deleteUser = "DELETE FROM users WHERE id = ?";

  db.query(deleteProfile, [userId], (err1) => {
    if (err1) {
      console.error("Error deleting profile:", err1);
      return res.status(500).send("Failed to delete profile");
    }

    db.query(deleteUser, [userId], (err2, result) => {
      if (err2) {
        console.error("Error deleting user:", err2);
        return res.status(500).send("Failed to delete user");
      }

      res.send("User and profile deleted successfully");
    });
  });
});

app.listen(8081, () => {
  console.log("Makima is Listening");
});
