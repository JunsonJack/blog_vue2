const express = require('express')
const cors = require('cors')
const { getToken, verify } = require('./jwt/jwt')

const app = express()

const blog_router = require('./router/Blog_router')
const itnotes_router = require('./router/itnotes_router')

app.use(express.urlencoded({
    extended: false,
    limit: '10mb'
}))

app.use(cors())

// 拦截请求
// 拦截所有请求信息
app.all('*', function (req, res, next) {
    // 设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    let url = req.path
    console.log('url', url)
   
    let pathUrl = ['/getarticle','/getById','/updateView','/login','/getNewarticle','/getByTitle','/getNotesList','/getNotesById','/updateNoteView','/uploadFile','/getMdById']
    if (pathUrl.includes(url)) {
        return next()
    }
    let token = req.headers.token
    if (!token || !verify(token)) {
        return res.send({
            data: null,
            meta: {
                status: 403,
                msg: '请重新登录',
            },
        })
    }
    // 放行
    next()
})

app.use(blog_router,itnotes_router)

app.listen(9922, () => {
    // console.log(itnotes_router.stack)
    console.log('express server running at http:127.0.0.1')
})