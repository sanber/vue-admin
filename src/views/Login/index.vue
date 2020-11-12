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
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入6-20位的数字加字母的密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords" v-show="model == 'register'">
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            placeholder="请再次输入密码"
            show-password
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
import {
  stripscript,
  emailValidate,
  passValidate,
  codeValidate
} from "@/utils/validate";
import { isRef, onMounted, reactive, ref, toRefs } from "@vue/composition-api";
export default {
  name: "Login",
  setup(props, context) {
    //验证验证码
    var checkCode = (rule, value, callback) => {
      // let reg = /^[a-z0-9]{6}$/;
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (codeValidate(value)) {
        return callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    //验证账号名是否为邮箱
    var validateEmail = (rule, value, callback) => {
      // let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (emailValidate(value)) {
        callback(new Error("账号格式错误"));
      } else {
        callback();
      }
    };
    //验证密码
    var validatePass = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = stripscript(value);
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (passValidate(value)) {
        callback(new Error("密码为6-20的数字+字母"));
      } else {
        callback();
      }
    };
    //验证重复密码
    var validatePasswords = (rule, value, callback) => {
      //因为使用重复输入密码组件使用v-show的原因所以做一下判断，而是用v-if则不会出现这种情况
      //因为v-show只是把这个组件隐藏而所做的验证并不会消失所以组件值为空一直验证就不会通过，所以也就提交不了
      if (model.value == "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = stripscript(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码输入不一样，请再次输入"));
      } else {
        callback();
      }
    };
    /**
     * 声明数据
     */
    //这里面放置data数据、生命周期、自定义的函数
    const menuList = reactive([
      { text: "登录", activeName: true, type: "login" },
      { text: "注册", activeName: false, type: "register" }
    ]);
    //模块值
    const model = ref("login");
    console.log(model.value);
    //isRef判断是否是一个基础数据类型还是对象数据类型
    console.log(isRef(model) ? true : false); //true
    console.log(isRef(menuList) ? true : false); //false
    //将对象数据类型转换成普通基础数据类型
    const obj = reactive({
      x: 0,
      y: 1
    });
    console.log(obj.x); //0
    const one = toRefs(obj);
    console.log(one.x.value); //0
    //解构数据类型的方法
    function useMousePosition() {
      const pos = reactive({
        x: 0,
        y: 1
      });
      return toRefs(pos);
    }
    const { x, y } = useMousePosition();
    console.log(x + y);
    console.log("props的值：" + props);
    console.log("context的值：" + context);
    //表单绑定数据
    const ruleForm = reactive({
      email: "",
      password: "",
      passwords: "",
      code: ""
    });
    //表单的验证
    const rules = reactive({
      email: [{ validator: validateEmail, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });
    /**
     * 生命周期函数
     * 生命周期函数需要在上方引入——import { isRef, reactive, ref, toRefs, onBeforeMount, onMounted, onBeforeUpdate } from "@vue/composition-api";
     * beforeCreate以及created被setup(props,context){}所替代
     * beforeMount => onBeforeMount
     * mounted => onMounted
     * methods => 去除，普通方式写函数
     * beforeUpdate => onBeforeUpdate
     * updated => onUpdated
     * beforeDestroy => onBeforeUnmount
     * destroyed => onUnmounted
     * errorCaptured => onErrorCaptured
     */
    //挂载完成后
    onMounted(() => {
      console.log("onMounted挂载完成后");
    });
    /**
     * 声明函数
     * 取消methods，直接在setup中声明函数
     */
    const changeTab = item => {
      menuList.forEach(ele => {
        ele.activeName = false;
        // console.log(ele);
      });
      item.activeName = true;
      model.value = item.type;
      // console.log(this.menuList, item);
    };
    const submitForm = formName => {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    return {
      menuList,
      model,
      ruleForm,
      rules,
      changeTab,
      submitForm
    };
  }
  // data() {
  //   var checkCode = (rule, value, callback) => {
  //     // let reg = /^[a-z0-9]{6}$/;
  //     if (!value) {
  //       return callback(new Error("验证码不能为空"));
  //     } else if (codeValidate(value)) {
  //       return callback(new Error("验证码格式错误"));
  //     } else {
  //       callback();
  //     }
  //   };
  //   var validateEmail = (rule, value, callback) => {
  //     // let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  //     if (value === "") {
  //       callback(new Error("请输入账号"));
  //     } else if (emailValidate(value)) {
  //       callback(new Error("账号格式错误"));
  //     } else {
  //       callback();
  //     }
  //   };
  //   var validatePass = (rule, value, callback) => {
  //     this.ruleForm.password = stripscript(value);
  //     value = stripscript(value);
  //     // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  //     if (value === "") {
  //       callback(new Error("请输入密码"));
  //     } else if (passValidate(value)) {
  //       callback(new Error("密码为6-20的数字+字母"));
  //     } else {
  //       callback();
  //     }
  //   };
  //   var validatePasswords = (rule, value, callback) => {
  //     //因为使用重复输入密码组件使用v-show的原因所以做一下判断，而是用v-if则不会出现这种情况
  //     //因为v-show只是把这个组件隐藏而所做的验证并不会消失所以组件值为空一直验证就不会通过，所以也就提交不了
  //     if (this.model == "login") {
  //       callback();
  //     }
  //     this.ruleForm.passwords = stripscript(value);
  //     value = stripscript(value);
  //     if (value === "") {
  //       callback(new Error("请输入密码"));
  //     } else if (value != this.ruleForm.password) {
  //       callback(new Error("两次密码输入不一样，请再次输入"));
  //     } else {
  //       callback();
  //     }
  //   };
  //   return {
  //     menuList: [
  //       { text: "登录", activeName: true, type: "login" },
  //       { text: "注册", activeName: false, type: "register" }
  //     ],
  //     // 模块切换
  //     model: "login",
  //     // 数据验证
  //     ruleForm: {
  //       email: "",
  //       password: "",
  //       passwords: "",
  //       code: ""
  //     },
  //     rules: {
  //       email: [{ validator: validateEmail, trigger: "blur" }],
  //       password: [{ validator: validatePass, trigger: "blur" }],
  //       passwords: [{ validator: validatePasswords, trigger: "blur" }],
  //       code: [{ validator: checkCode, trigger: "blur" }]
  //     }
  //   };
  // },
  // methods: {
  //   changeTab(item) {
  //     this.menuList.forEach(ele => {
  //       ele.activeName = false;
  //       // console.log(ele);
  //     });
  //     item.activeName = true;
  //     this.model = item.type;
  //     // console.log(this.menuList, item);
  //   },
  //   submitForm(formName) {
  //     this.$refs[formName].validate(valid => {
  //       if (valid) {
  //         alert("submit!");
  //       } else {
  //         console.log("error submit!!");
  //         return false;
  //       }
  //     });
  //   }
  // }
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
