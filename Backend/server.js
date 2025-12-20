const express = require('express');
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    port: 4306,
    host: "localhost",
    user: 'adminuser',
    password: 'abc@123!',
    database: 'reader'
})

db.connect();

app.get('/', (re, res) => {
    return res.json("Arf Arf");
})

app.get('/users', (rep, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) return res.json("Err");

        if (data.length > 0) {
            return res.json({
                message: "Login Successful",
                user: data[0]
            });
        } else {
            return res.json({ message: "No record" });
        }
    });
});

app.post('/register', (req, res) => {
    const sql = `
        INSERT INTO users (name, username, password) 
        VALUES (?,?,?)
        `;
    
        const values = [
            req.body.name,
            req.body.username,
            req.body.password
        ];

        db.query(sql,values, (err, result) => {
            if(err) return res.json(err);
            return res.json({message: "User registered successfully!"});
        })
})


app.get('/books',(rep,res) => {
    const sql = `
        SELECT
            id,
            name,
            author,
            imageLink
        FROM books
        `;
    db.query(sql, (err,data) => {
        if(err) res.json(err);
        return res.json(data);
    })
})

app.get('/bookprofile/:id', (req,res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM books WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if(err) return res.json(err)
        res.json(result[0])
    })
})

app.get('/bookprofile/:id/volumes', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM volumes WHERE bookId = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return res.json(err);
      res.json(result);
    });
  });

app.get('/profile/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM profiles WHERE userId = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.json(err);
    res.json(result[0]);
  });
});

app.get('/library/:id', (req, res) => {
    const id_lib = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id_lib], (err, result) => {
      if (err) return res.json(err);
      res.json(result);
    });
  });

  app.post('/updateProfile', (req, res) => {
    const sql = `
        UPDATE profiles
        SET profileImg = ?, profileBg = ?
        WHERE id = ?
    `;

    const values = [
        req.body.profileImg,
        req.body.profileBg,
        req.body.id   // primary key of the profile row
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Profile updated successfully!" });
    });
});

app.post('/updateUser', (req, res) => {
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
        req.body.id   // primary key of the profile row
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Profile updated successfully!" });
    });
});

app.listen(8081, ()=> {
    console.log("Makima is Listening");
})