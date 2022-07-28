const express = require('express');
const router = express.Router('');
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/roles', (req,res) =>{
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name
                AS department
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;
    
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

router.get('/roles/:id', (req,res) =>{
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name
                AS department
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id
                WHERE roles.id = ?`;

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

router.post('/roles', ({body}, res) =>{
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

    const sql=`INSERT INTO roles(title, department_id, salary) VALUES(?,?,?)`;
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

router.delete('/roles/:id', (req,res) =>{
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({error:err.message});
        } else if(!result.affectedRows){
            res.json({
                error:'roles not found'
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

router.put('/roles/:id', (req,res) =>{
    const errors =inputCheck(req.body, 'department_id');
    if(errors){
        res.status(400).json({error:errors});
        return;
    }

    const sql = `UPDATE roles 
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