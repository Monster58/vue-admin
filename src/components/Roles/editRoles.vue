<template>
  <el-dialog
    title="编辑角色"
    :visible.sync="editRolesDialogVisible"
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
      <el-button @click="editRolesDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitEditRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      editRolesDialogVisible: false,
      formLabelAlign: {
        roleId: "",
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
    open(id) {
      this.editRolesDialogVisible = true;
      axios.get(`roles/${id}`).then(res => {
        if (res.data.meta.status != 200) {
          this.$message.error(res.data.meta.msg);
        } else {
          this.formLabelAlign = res.data.data;
        }
      });
    },
    submitEditRoles() {
      this.$refs["formLabelAlign"].validate(valid => {
        if (valid) {
          axios
            .put(`roles/${this.formLabelAlign.roleId}`, this.formLabelAlign)
            .then(res => {
              if (res.data.meta.status != 200) {
                this.$message.error(res.data.meta.msg);
              } else {
                this.$message.success("编辑成功");
                this.$emit("_getRoles");
                this.editRolesDialogVisible = false;
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
