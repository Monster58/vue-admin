<template>
  <el-dialog
    @close="_reset"
    title="分配权限"
    :visible.sync="setRolesDialogVisible"
    width="60%"
  >
    <el-tree
      :data="allRights"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      default-expand-all
      ref="tree"
      :default-checked-keys="defaultCheckedKeys"
      check-on-click-node
    ></el-tree>
    <span slot="footer">
      <el-button @click="setRolesDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="setRoleRights">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRightsTree, setRolesRightsAjax } from "../../api/index";
export default {
  data() {
    return {
      setRolesDialogVisible: false,
      allRights: [],
      currentRole: {},
      defaultProps: {
        children: "children",
        label: "authName"
      },
      defaultCheckedKeys: []
    };
  },
  methods: {
    open(scope) {
      this.currentRole = scope;
      this.setRolesDialogVisible = true;
      this._getCheckedRights(scope);
      if (this.$refs["tree"]) {
        this.$refs["tree"].setCheckedKeys(this.defaultCheckedKeys);
      }
    },
    // 递归查询选中的权限
    _getCheckedRights(obj) {
      if (obj.children) {
        obj.children.forEach(item => {
          this._getCheckedRights(item);
        });
      } else {
        this.defaultCheckedKeys.push(obj.id);
      }
    },
    _reset() {
      this.defaultCheckedKeys = [];
    },
    setRoleRights() {
      const str = [
        ...this.$refs["tree"].getCheckedKeys(),
        ...this.$refs["tree"].getHalfCheckedKeys()
      ].join(",");
      setRolesRightsAjax(`roles/${this.currentRole.id}/rights`, {
        rids: str
      }).then(res => {
        if (res.meta.status == 200) {
          this.$message.success(res.meta.msg);
          this.$emit("_getRoles");
          this.setRolesDialogVisible = false;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    }
  },
  created() {
    getRightsTree().then(res => {
      if (res.meta.status != 200) {
        this.$message.error(res.meta.msg);
      } else {
        this.allRights = res.data;
      }
    });
  }
};
</script>

<style lang="stylus" scoped></style>
