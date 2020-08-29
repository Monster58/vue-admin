<template>
  <el-dialog
    title="添加角色"
    :visible.sync="addRolesDialogVisible"
    width="60%"
    @close="resetForm"
  >
    <el-form
      label-position="right"
      label-width="80px"
      :model="formLabelAlign"
      :rules="rules"
      ref="formLabelAlign"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formLabelAlign.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="formLabelAlign.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="addRolesDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAddRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRoles } from "../../api/index";
export default {
  data() {
    return {
      addRolesDialogVisible: false,
      formLabelAlign: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    open() {
      this.addRolesDialogVisible = true;
    },
    submitAddRoles() {
      this.$refs["formLabelAlign"].validate(valid => {
        if (valid) {
          addRoles(this.formLabelAlign).then(res => {
            if (res.meta.status != 201) {
              this.$message.error(res.meta.msg);
            } else {
              this.$message.success(res.meta.msg);
              this.addRolesDialogVisible = false;
              this.$emit("_getRoles");
            }
          });
        }
        return;
      });
    },
    resetForm() {
      this.$refs["formLabelAlign"].resetFields();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
