const express = require('express')
const blog_router = express.Router()
const db = require('../mysql/db')
const { getToken, verify } = require('../jwt/jwt')
blog_router.get('/getarticle', (req, res) => {
    // mysql DATE_FORMAT对时间进行格式化
    const sql = 'select blog.id,blog.title,blog.introduce,' +
        "DATE_FORMAT(blog.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
        'blog.views,type from  blog left join category on blog.typeFlag = category.id  where blog.pubFlag = 1 order by blog.id'
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据')
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据获取成功',
            data
        })
    })
})
blog_router.get('/getNewarticle', (req, res) => {

    // sql语句 查询数据 select 列名称 from 表名称
    db.query('select blog.*,type from  blog left join category on blog.typeFlag = category.id  where blog.pubFlag = 1 order by blog.id desc', (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据')
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据获取成功',
            data
        })
    })
})
blog_router.get('/getTableData', (req, res) => {

    // sql语句 查询数据 select 列名称 from 表名称
    db.query('select blog.*,category.type from  blog left join category on blog.typeFlag = category.id order by blog.id desc', (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据')
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据获取成功',
            data
        })
    })
})

blog_router.get('/getById', (req, res) => {

    // console.log(req.query)
    const sql = `select blog.*,category.type from  blog left join category on blog.typeFlag = category.id where blog.id = '${req.query.id}'`
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据')
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据获取成功',
            data
        })
    })
})


blog_router.get('/getByTitle', (req, res) => {

    // console.log(req.query)
    const sql = `select blog.*,category.type from  blog left join category on blog.typeFlag = category.id where blog.title like '%${req.query.title}%'`
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.length === 0) {
            res.send({
                code: 404,
                msg: '未查到相应文章',
            })
            return console.log('数据库中没有数据')
        } else {
            // console.log(data);
            res.send({
                code: 200,
                msg: '数据获取成功',
                data
            })
        }

    })
})

blog_router.post('/login', (req, res) => {
    // console.log(req.body)
    const sql = `select * from  users where username = '${req.body.username}' and password = '${req.body.password}'`
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据')
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据获取成功',
            data: [{
                token: getToken(),
                user: {
                    username: data[0].username
                }
            }]
        })
    })
})

blog_router.get('/getTypes', (req, res) => {

    // sql语句 查询数据 select 列名称 from 表名称
    db.query('select * from  category', (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据')
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据获取成功',
            data
        })
    })
})

blog_router.get('/DelById', (req, res) => {
    // console.log(req.query)
    const sql = `delete  from  blog where id = '${req.query.id}'`
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
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

blog_router.post('/addBlog', (req, res) => {
    // console.log(req.body)
    const sql = `insert into blog set ?`
    let params = {
        'title': req.body.title,
        'introduce': req.body.introduce,
        'content': req.body.content,
        'addTime': req.body.addTime,
        'views': req.body.views,
        'typeFlag': req.body.typeFlag,
        'pubFlag': req.body.pubFlag
    }
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, params, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.affectedRows !== 1) return console.log('添加失败')
        // console.log(data);
        res.send({
            code: 200,
            msg: '数据添加成功',

        })
    })
})

blog_router.get('/PubById', (req, res) => {
    console.log(req.query)
    const sql = `update blog set pubFlag = '${req.query.pubFlag}' where id = '${req.query.id}'`
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
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

blog_router.get('/updateMi', (req, res) => {
    // console.log(req.query)
    const sql = `update users set password = '${req.query.password}' where username = '${req.query.username}'`
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        if (data.affectedRows !== 1) {
            console.log('修改密码失败')
            return res.send({
                code: 404,
                msg: '修改密码失败',
            })
        } else {
            // console.log(data);
            res.send({
                code: 200,
                msg: '修改密码成功',
            })
        }


    })
})

blog_router.get('/updateView', (req, res) => {
    // console.log(req.query)
    const sql = `update blog set views = '${req.query.views}' where id = '${req.query.id}'`
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
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
blog_router.post('/updateBlog', (req, res) => {
    console.log(req.body)
    const sql = `update blog set ? where id = '${req.body.id}'`
    let params = {
        'title': req.body.title,
        'introduce': req.body.introduce,
        'content': req.body.content,
        'addTime': req.body.addTime,
        'views': req.body.views,
        'typeFlag': req.body.typeFlag,
        'pubFlag': req.body.pubFlag
    }

    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, params, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.affectedRows !== 1) return console.log('blog更新失败')
        // console.log(data);
        res.send({
            code: 200,
            msg: 'blog更新成功',

        })
    })
})

// 添加md文件
let fs = require("fs")
const path = require('path')
const formidable = require('formidable')
blog_router.post('/uploadFile', (req, res) => {
    const form = new formidable.IncomingForm()//要这样解析FormData
    form.parse(req, function (err, fields, files) {
        console.log('fields', fields) //普通类型
        console.log('files', files) //file类型
        // let title = fields.title
        // console.log(files.file.originalFilename)
        let urlPath = files.file.originalFilename
        // formidable自动生成文件，此时只用复制粘贴文件到自己想要的地方
        let copiedPath = files.file.filepath
        let toPath = path.join(__dirname, '..', '/public/blog_md/') + urlPath
        console.log(copiedPath, toPath)
        try {
            fs.copyFileSync(copiedPath, toPath)
            console.log('success')
        } catch (error) {
            console.log(error)
        }
        // 插入数据库
        const sql = `insert blog_md set  ?`
        let sqlData = {
            url: urlPath,
            date: new Date(),
            // title
        }
        db.query(sql, sqlData, (err, result) => {
            if (err) return res.send(err)
            if (result.affectedRows !== 1) return res.msg('发布文章失败！')
            res.send('发布文章成功！', 200)
        })
    })
})
// 请求查询文章
blog_router.get('/getMdById', (req, res) => {

    // console.log(req.query)
    const sql = `select blog_md.url from  blog_md  where id = ${req.query.id}`
    // sql语句 查询数据 select 列名称 from 表名称
    db.query(sql, (err, data) => {
        //err为对象时 表示 连接数据库失败 打印错误信息
        if (err) return console.log(err.message)
        //当数据库中数据data长度为0 时
        if (data.length === 0) return console.log('数据库中没有数据')
        console.log(data)
        let { url } = data[0]
        console.log(url)
        filePath = path.join(__dirname, '..', '/public/blog_md/') + url
        console.log(filePath)
        res.sendFile(`${filePath}`)
    })
})


module.exports = blog_router