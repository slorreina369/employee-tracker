const express = require('express');
const router = express.Router('');
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/employees', (req, res) =>{
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, role.title,departments.name AS department,
                    CONCAT(manager.first_name,' ', manager.last_name) AS manager 
                FROM employees 
                LEFT JOIN role 
                ON employees.role_id = role.id 
                LEFT JOIN employees AS manager 
                ON employees.manager_id = manager.id
                LEFT JOIN departments
                ON role.department_id = departments.id;`;
    
    db.query(sql, (err,rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message:'success',
            data:rows
        });
    });
});

router.get('/employees/:id', (req,res) =>{
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, role.title,departments.name AS department,
                    CONCAT(manager.first_name,' ', manager.last_name) AS manager 
                FROM employees 
                LEFT JOIN role 
                ON employees.role_id = role.id 
                LEFT JOIN employees AS manager 
                ON employees.manager_id = manager.id
                LEFT JOIN departments
                ON role.department_id = departments.id
                WHERE employees.id = ?`;
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

router.delete('/employees/:id', (req,res) =>{
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({error:err.message});
        } else if(!result.affectedRows){
            res.json({
                error:'employee not found'
            });
        } else {
            res.json({
                message:'deleted',
                changes: result.affectedRows,
                id:req.params.id
            });
        }
    });
});

router.post('/employees', ({body}, res) =>{
    const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'role_id',
        'manager_id'
    );
    if(errors){
        res.status(400).json({error:errors});
        return;
    }

    const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`;
    const params = [
        body.first_name,
        body.last_name,
        body.role_id,
        body.manager_id
    ];

    db.query(sql, params, (err,result) =>{
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

router.put('/employees/:id', (req,res) =>{
    const errors = inputCheck(req.body, 'role_id');
    if(errors){
        res.status(400).json({error:errors});
        return;
    }
    const sql = `UPDATE employees
                SET role_id = ?
                WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err,result) =>{
        if(err){
            res.status(400).json({error:err.message});
        } else if(!result.affectedRows){
            res.json({
                message:'Employee not found'
            });
        } else {
            res.json({
                message:'success',
                data:req.body,
                changes: result.affectedRows
            });
        }
    });

});

module.exports = router;