<template>
  <el-dialog title="分配角色" :visible.sync="setUserRoleDialogVisible" width="60%">
    <p>当前用户：{{user.username}}</p>
    <p>当前角色：{{user.role_name}}</p>
    <p>分配新角色</p>
    <el-select v-model="checkedRoleId" placeholder="请选择">
      <el-option v-for="item in allRoles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="setUserRoleDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="setUserRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoles } from "../../api/index";
import axios from "axios";
export default {
  data() {
    return {
      setUserRoleDialogVisible: false,
      user: {},
      allRoles: [],
      checkedRoleId: ""
    };
  },
  methods: {
    open(user) {
      this.setUserRoleDialogVisible = true;
      this.user = user;
    },
    setUserRole() {
      axios
        .put(`users/${this.user.id}/role`, { rid: this.checkedRoleId })
        .then(res => {
          if (res.data.meta.status == 200) {
            this.$message.success(res.data.meta.msg);
            this.setUserRoleDialogVisible = false;
            this.$emit('_getUserList')
          } else {
            this.$message.error(res.data.meta.msg);
          }
          this.checkedRoleId = "";
        });
    }
  },
  created() {
    getRoles().then(res => {
      if (res.meta.status == 200) {
        this.allRoles = res.data;
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
p {
  margin-bottom: 15px;
}
</style>