const { request } = require('express');
const pool = require('../db');

const getAllTask = async (req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM usuarios');
        res.json(allTasks.rows)
    } catch (error) {
        next(error)
    }
};

const getTask = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

        if (result.rows.length === 0) return res.status(404).json({
            message: "User not found",
        });

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
};

const createTask = async (req, res, next) => {
    const { name, email, password, age } = req.body

    try {
        const result = await pool.query('INSERT INTO usuarios (name, email, password, age) VALUES ($1,$2,$3,$4) RETURNING *', [
            name,
            email,
            password,
            age,]);
        console.log(result);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    const { id } = req.params

    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id])

        if (result.rowCount === 0)
            return res.status(404).json({
                message: "User not found",
            });

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password, age } = req.body;

        const result = await pool.query(
            'UPDATE usuarios SET name = $1, email = $2, password = $3, age = $4 WHERE id = $5 RETURNING *',
            [name, email, password, age, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({
                message: 'User not found'
            });

        return res.json(res.rows[0]);
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    console.log(req.body)


    try {
        const result = await pool.query(`SELECT * FROM usuarios WHERE email = $1 AND password = $2`, [email, password])
        console.log(result)

        if (result) {
            res.json(result.rows[0])
            res.json({
                status: "success", message: `Bienvenido ${result?.row[0]?.name}`, user: {
                    name: result?.row[0]?.name,
                    email: result?.row[0]?.email,
                    id: result?.row[0]?.id
                }
            })
        }
        res.json({ message: "usuario no encontrado" })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTask,
    getTask,
    createTask,
    deleteTask,
    updateTask,
    loginUser
}