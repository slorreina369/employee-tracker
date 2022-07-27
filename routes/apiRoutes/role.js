const express = require('express');
const router = express.Router('');
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/role', (req,res) =>{
    const sql = `SELECT role.id, role.title, role.salary, departments.name
                AS department
                FROM role
                LEFT JOIN departments
                ON role.department_id = departments.id`;
    
    db.query(sql,(err, rows) =>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json({
            message:'success',
            data:rows
        });
    });
});

router.get('/role/:id', (req,res) =>{
    const sql = `SELECT role.id, role.title, role.salary, departments.name
                AS department
                FROM role
                LEFT JOIN departments
                ON role.department_id = departments.id
                WHERE role.id = ?`;

    const params = [req.params.id];
    
    db.query(sql, params, (err,row) =>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message:'success',
            data:row
        });
    });
});

router.post('/role', ({body}, res) =>{
    const errors = inputCheck(
        body,
        'title',
        'department_id',
        'salary'
    );
    if(errors){
        res.status(400).json({error:errors});
        return;
    }

    const sql=`INSERT INTO role(title, department_id, salary) VALUES(?,?,?)`;
    const params=[
        body.title,
        body.department_id,
        body.salary
    ];

    db.query(sql,params, (err,result)=>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message:'success',
            data:body,
            changes:result.affectedRows
        });
    });
});

router.delete('/role/:id', (req,res) =>{
    const sql = `DELETE FROM role WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({error:err.message});
        } else if(!result.affectedRows){
            res.json({
                error:'role not found'
            });
        } else{
            res.json({
                message:'deleted',
                changes: result.affectedRows,
                id:req.params.id
            });
        }
    });
});

router.put('/role/:id', (req,res) =>{
    const errors =inputCheck(req.body, 'department_id');
    if(errors){
        res.status(400).json({error:errors});
        return;
    }

    const sql = `UPDATE role 
                SET department_id = ?
                WHERE id = ?`;
    const params = [req.body.department_id, req.params.id];
    db.query(sql, params, (err, result) =>{   
        if(err){
            res.status(400).json({error:err.message});
        } else if(!result.affectedRows){
            res.json({
                message:'Candidate not found'
            });
        } else {
            res.json({
                message:'success',
                data:req.body,
                changes:result.affectedRows
            });
        }
    });
});

module.exports = router;