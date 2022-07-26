const express = require('express');
const router = express.Router('');
const db = require('../../db/connection');

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

module.exports = router;