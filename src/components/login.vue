<template>
  <div class="login">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>vue后台管理系统</span>
      </div>
      <el-form
        ref="loginForm"
        label-position="left"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="formLabelAlign.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" round :loading="loading" @click="login"
          >登录</el-button
        >
        <el-button type="info" round @click="resetForm">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { login } from "../api/index";
export default {
  data() {
    return {
      loading: false,
      formLabelAlign: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm() {
      this.$refs.loginForm.resetFields();
    },
    login() {
      this.$refs.loginForm.validate(boolean => {
        if (boolean) {
          login(this.formLabelAlign).then(res => {
            console.log(res);
            if (res.meta.status !== 200) {
              this.$message.error(res.meta.msg);
            } else {
              window.sessionStorage.setItem("token", res.data.token);
              this.$router.push("/home");
              this.$message.success(res.meta.msg);
            }
          });
        } else {
          this.$message.error("请输入正确的用户名和密码");
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
// @import url(../common/stylus/minix.styl);
@import '../common/stylus/minix.styl';

.login {
  width: 100vw;
  height: 100vh;
  background-color: $baseColor;

  .box-card {
    width: 30%;
    // height 100%
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .button {
    display: flex;
    justify-content: space-around;
  }
}</style
>>
