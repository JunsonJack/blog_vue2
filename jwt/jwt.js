let jwt = require('jsonwebtoken')
const key = 'junson.com'
 
// 产生token方法
function getToken() {
  // 载体
  let payload = { data: 'junsonjack@qq.com' }
  // 密钥
  let secretOrPrivateKey = key
  //  配置,1天有效期24*60*60
  let options = { expiresIn: 86400 }
  return jwt.sign(payload, secretOrPrivateKey, options)
}
 
// 验证token
function verify(token) {
  try {
    let rt = jwt.verify(token, key)
    // console.log('your token msg:--------------->', rt)
  } catch (error) {
    return false
  }
  return true
}
 
module.exports = { getToken, verify }