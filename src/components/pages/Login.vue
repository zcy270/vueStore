<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <van-field v-model="username" @input="checkFrom" label="用户名" clearable placeholder="请输入用户名" :error-message='userNameErrMsg' required />
      <van-field v-model="password" @input="checkFrom" type="password" :error-message="passwordErrMsg" clearable required label="密码" />
      <div class="register-button">
        <van-button type="primary" @click="loginAction" size='large' round :loading="loadingOption">马上登录
        </van-button>
      </div>

    </div>
  </div>
</template>
<script>
  import axios from "axios"
  import url from "@/serviceAPI.config.js"
  import {Toast} from 'vant'

  export default {
    data() {
      return {
        username: '', //注册名字
        password: '', //注册密码
        loadingOption: false, //防止二次注册
        userNameErrMsg:'',//当用户注册名字出现错误是提示信息
        passwordErrMsg:'',//当用户注册密码出现错误是提示信息
      }
    },
    created() {
      if(localStorage.userInfo){
        Toast.success("你已经登录过")
        this.$router.push("/")
        // console.log(12)
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      checkFrom(){
            let isOk=true
            if(this.username.length<5){
                this.userNameErrMsg="输入名字不能少于5"
                isOk=false
            }else{
                this.userNameErrMsg=""
            }
            if(this.password.length<6){
                this.passwordErrMsg="密码格式有误"
                isOk=false
            }else{
                this.passwordErrMsg=""
            }
            return isOk
      },
      axiosLoginUser() {
        this.loadingOption = true;
          axios({
              method: 'post',
              url: url.login,
              data: {
                UserName: this.username,
                password: this.password
              }
            })
            .then((res) => {
              // console.log(res.data.code=='200' && res.data.message==true)
              if(res.data.code=='200' && res.data.message==true){
                // console.log(123)
                new Promise((resolve,reject)=>{
                  localStorage.userInfo={userName:this.username}
                  setTimeout(()=>{
                    resolve()
                  },500)
                }).then(()=>{
                  // console.log(3123213)
                  Toast.success("登录成功")
                  this.$router.push("/")
                }).catch((err)=>{
                  Toast.fail("登录状态保存失败")
                  console.log(err)
                })
              }else{
                Toast.fail("登录失败")
                this.loadingOption = false;
              }
            }).catch((err) => {
              this.loadingOption = false;
            })
        },
        loginAction(){
          this.checkFrom() && this.axiosLoginUser()
        }, 
    },
  }

</script>
<style scoped>
  .register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
  }

  .register-button {
    padding-top: 10px;
  }

</style>
