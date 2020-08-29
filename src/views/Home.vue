<template>
  <!-- <div class="home">
    <h1>Home</h1>
    <el-button type="primary">退出</el-button>
  </div>-->
  <el-container>
    <el-aside :width="isCollapse ? '70px' : '200px'">
      <el-row class="tac">
        <router-link tag="h1" to="/" class="logo">
          <img
            :width="isCollapse ? '80%' : '20%'"
            class="logo-img"
            src="@/assets/logo.png"
            alt=""
          />
          <span v-show="!isCollapse">VUE后台管理系统</span>
        </router-link>
        <div @click="isCollapse = !isCollapse" class="toggle-menu">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <el-col :span="24">
          <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <el-submenu
              v-for="item in menuList"
              :key="item.id"
              :index="item.id.toString()"
            >
              <template slot="title">
                <i :class="menuIcon[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item
                  v-for="secondLevel in item.children"
                  :key="secondLevel.id"
                  :index="`/${secondLevel.path}`"
                >
                  <i class="el-icon-menu"></i>
                  <span>{{ secondLevel.authName }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header class="header">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-button type="primary" @click="logout">退出</el-button>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { getMenuList } from "../api/index";
export default {
  name: "Home",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      isCollapse: false,
      menuList: [],
      menuIcon: {
        "125": "el-icon-user-solid",
        "103": "el-icon-s-tools",
        "101": "el-icon-s-goods",
        "102": "el-icon-s-order",
        "145": "el-icon-s-data"
      }
    };
  },
  created() {
    getMenuList().then(res => (this.menuList = res.data));
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      this.$router.replace("/login");
    }
  },
  components: {}
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/minix.styl';

.el-aside {
  background: rgb(84, 92, 100);
  min-height: 100vh;
  position relative
  overflow unset
  // transition all .6s ease-out
  .toggle-menu {
    position absolute
    width 40px
    height 40px
    right -40px
    top 12px
    z-index 1
    font-size 30px
    // border 1px solid #ccc
    line-height 40px
    text-align center
    color: #909399
    cursor pointer
    transition all .3s ease
  }
  .toggle-menu:hover {
    color #fff
  }
}

.logo {
  line-height: 60px;
  text-align: center;
  background: rgb(84, 92, 100);
  color: #fff;
  display flex
  align-items center
  padding: 10px;
  span {
    display block
  }

}

.el-menu-vertical-demo {
  width: 100%;
}

.el-menu {
  border: none;
}

.header {
  padding: 0;

  .el-menu-demo {
    padding: 0 20px;
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
