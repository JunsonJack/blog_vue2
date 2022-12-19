const express = require('express')
const itnotes_router = express.Router()
const db = require('../mysql/db')
const { getToken, verify } = require('../jwt/jwt.js')

itnotes_router.get('/getNotesList',(req, res) => {

    // sql语句 查询数据 select 列名称 from 表名称
    db.query('select * from  itnotes where pubFlag = 1 order by id desc ', (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message);
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据');
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据获取成功',
            data
        })
    })
})

itnotes_router.get('/getNotesData',(req, res) => {

    // sql语句 查询数据 select 列名称 from 表名称
    db.query('select * from  itnotes  order by id desc ', (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message);
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据');
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据获取成功',
            data
        })
    })
})

itnotes_router.get('/getNotesById', (req, res) => {

    // sql语句 查询数据 select 列名称 from 表名称
    let sql = `select * from  itnotes where id = '${req.query.id}'`
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message);
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据');
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据获取成功',
            data
        })
    })
})


itnotes_router.get('/updateNoteView', (req, res) => {
    // console.log(req.query)
    const sql = `update itnotes set views = '${req.query.views}' where id = '${req.query.id}'`;
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message);
        if (data.affectedRows !== 1) {
            console.log('更新浏览量失败')
            return res.send({
                code: 404,
                msg: '更新浏览量失败',
            })
        } else {
            // console.log(data);
            res.send({
                code: 200,
                msg: '更新浏览量成功',
            })
        }


    })
})


itnotes_router.get('/PubNotesById', (req, res) => {
    console.log(req.query)
    const sql = `update itnotes set pubFlag = '${req.query.pubFlag}' where id = '${req.query.id}'`;
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message);
        if (data.affectedRows !== 1) {
            console.log('发布文章失败')
            return res.send({
                code: 404,
                msg: '发布失败',
            })
        } else {
            // console.log(data);
            res.send({
                code: 200,
                msg: '修改成功',
            })
        }

    })
})

itnotes_router.post('/updateNotes', (req, res) => {
    console.log(req.body)
    const sql = `update itnotes set ? where id = '${req.body.id}'`;
    let params = {
        'title': req.body.title,
        'content': req.body.content,
        'addTime': req.body.addTime,
        'views': req.body.views,
        'pubFlag': req.body.pubFlag
    }

    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, params, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message);
        //当数据库中数据data长度为0 时
        if (data.affectedRows !== 1) return console.log('笔记更新失败');
        // console.log(data);
        res.send({
            code: 200,
            msg: '笔记更新成功',
        })
    })
})

itnotes_router.post('/addNote', (req, res) => {
    // console.log(req.body)
    const sql = `insert into itnotes set ?`;
    let params = {
        'title': req.body.title,
        'content': req.body.content,
        'addTime': req.body.addTime,
        'views': req.body.views,
        'pubFlag': req.body.pubFlag
    }
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, params, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message);
        //当数据库中数据data长度为0 时
        if (data.affectedRows !== 1) return console.log('添加失败');
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据添加成功',

        })
    })
})

itnotes_router.get('/DelNotesById', (req, res) => {
    // console.log(req.query)
    const sql = `delete  from  itnotes where id = '${req.query.id}'`;
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message);
        if (data.affectedRows !== 1) {
            console.log('删除文章失败')
            return res.send({
                code: 404,
                msg: '删除失败',
            })
        } else {
            // console.log(data);
            res.send({
                code: 200,
                msg: '删除成功',
            })
        }


    })
})
module.exports = itnotes_router