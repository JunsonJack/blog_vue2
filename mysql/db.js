var mysql = require('mysql')

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'blog_vue2',
    timezone: "08:00"
})

module.exports = db