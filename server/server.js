const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, "public")))
app.use(cors());
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students"
})

app.post('/add_user', (req,res)=>{
    const sql = "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?,?,?,?)";

    const values = [req.body.name, req.body.email, req.body.age, req.body.gender]

    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured' + err})
        return res.json({success: "Student added successfully"})
    })
})

app.get('/students',(req,res)=>{
    const sql = "SELECT * from student_details";
  
    db.query(sql, (err,result)=>{
        if(err) return res.json({message: 'Sever error' + err})
        return res.json(result)
    })
})

app.get('/get_student/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * from student_details WHERE id = ?`;
  
    db.query(sql, [id], (err,result)=>{
        if(err) return res.json({message: 'Sever error' + err})
        return res.json(result)
    })
})

app.post('/edit_user/:id', (req,res)=>{
    const id = req.params.id
    const sql = "UPDATE student_details set `name`=?,`email`=?,`age`=?,`gender`=? WHERE id=?";

    const values = [req.body.name, req.body.email, req.body.age, req.body.gender,id]

    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured' + err})
        return res.json({success: "Student added successfully"})
    })
})

app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id
    const sql = "DELETE from student_details WHERE id=?";

    db.query(sql, [id], (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured' + err})
        return res.json({success: "Student deleted successfully"})
    })
})


app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})


