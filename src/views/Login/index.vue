<template>
  <div id="login">
    <div class="loginWrap">
      <ul class="menuTab">
        <li
          :class="{ activeStyle: item.activeName }"
          v-for="(item, index) in menuList"
          :key="index"
          @click="changeTab(item)"
        >
          {{ item.text }}
        </li>
      </ul>
      <!-- 表单 start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="email">
          <el-input
            v-model="ruleForm.email"
            autocomplete="off"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="请输入6-20位的数字加字母的密码"
            show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.code"
                placeholder="输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="primary" round>获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            round
            @click="submitForm('ruleForm')"
            class="submitBtn"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
    };
    var validateEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (!reg.test(value)) {
        callback(new Error("账号格式错误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码为6-20的数字+字母"));
      } else {
        callback();
      }
    };
    return {
      menuList: [
        { text: "登录", activeName: true },
        { text: "注册", activeName: false }
      ],
      ruleForm: {
        email: "",
        pass: "",
        age: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    changeTab(item) {
      this.menuList.forEach(ele => {
        ele.activeName = false;
        // console.log(ele);
      });
      item.activeName = true;
      // console.log(this.menuList, item);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #344a5f;
  .loginWrap {
    width: 330px;
    margin: 0 auto;
    .menuTab {
      width: 100%;
      margin-bottom: 30px;
      overflow: hidden;
      li {
        width: 50%;
        height: 60px;
        line-height: 60px;
        float: left;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
      }
      .activeStyle {
        border-bottom: 3px #409eff solid;
      }
    }
    .submitBtn {
      width: 100%;
    }
  }
}
</style>
