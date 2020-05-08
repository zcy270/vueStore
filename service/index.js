const Koa = require('koa')


//引入connect
const {connect , initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const app = new Koa()

const cors = require('koa2-cors')
app.use(cors())
let user = require('./appAPI/user.js')
let goods = require('./appAPI/goods.js')



//装载了所有路由
let router = new Router()
router.use('/user',user.routes())
router.use('/goods',goods.routes())

//加载路由中间件

app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods())


//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({UserName:'jszcy022',password:'123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
    // let  users = await  User.findOne({}).exec()

    // console.log('------------------')
    // console.log(users)
    // console.log('------------------') 

})()

app.use(async(ctx)=>{
  ctx.body = ctx.request.body;
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})