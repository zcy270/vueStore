<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <van-field v-model="username" label="用户名" clearable placeholder="请输入用户名" :error-message='userNameErrMsg' required />
      <van-field v-model="password" type="password" :error-message="passwordErrMsg" clearable required label="密码" />
      <div class="register-button">
        <van-button type="primary" @click="registerAction" size='large' round :loading="loadingOption">马上注册
        </van-button>
      </div>

    </div>
  </div>
</template>
<script>
  import axios from "axios"
  import url from "@/serviceAPI.config.js"
  import {
    Toast
  } from "vant"

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
                this.passwordErrMsg="设置密码长度不能少于6"
                isOk=false
            }else{
                this.passwordErrMsg=""
            }
            return isOk
      },
      axiosRegisterUser() {
        this.loadingOption = true;
          axios({
              method: 'post',
              url: url.registerUser,
              data: {
                UserName: this.username,
                password: this.password
              }
            })
            .then((res) => {
              // console.log(res)
              if (res.data.code == 200) {
                this.$router.push('/login')
                Toast.success(res.data.message)
              } else {
                Toast.fail("注册失败")
                this.loadingOption = false;
              }
            }).catch((err) => {
              console.log(err)
              Toast.fail("注册失败")
              this.loadingOption = false;
            })
        },
      registerAction(){
        this.checkFrom() && this.axiosRegisterUser()
      }  
    },
    created() {},
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
