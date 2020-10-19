<template>
  <div id="login">
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
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      menuList: [
        { text: "登录", activeName: true },
        { text: "注册", activeName: false }
      ],
      isActive: true
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
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #344a5f;
  .menuTab {
    width: 330px;
    margin: 0 auto;
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
}
</style>
