<template>
  <el-dialog
    :title="`添加${attr_sel == 'many' ? '参数' : '属性'}`"
    :visible.sync="dialogVisible"
    width="60%"
    @close="handleClose"
  >
    <el-form
      ref="addAttrForm"
      label-width="80px"
      :model="formLabelAlign"
      :rules="rules"
    >
      <el-form-item label="名称" prop="attr_name">
        <el-input v-model="formLabelAlign.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addCategoriesParamsAjax } from "../../api/index";
export default {
  props: ["attr_sel", "id"],
  data() {
    return {
      dialogVisible: false,
      formLabelAlign: {
        attr_name: ""
      },
      rules: {
        attr_name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.$refs["addAttrForm"].resetFields();
    },
    submit() {
      this.$refs["addAttrForm"].validate(valid => {
        if (valid) {
          addCategoriesParamsAjax(`categories/${this.id}/attributes`, {
            attr_name: this.formLabelAlign.attr_name,
            attr_sel: this.attr_sel
          }).then(res => {
            if (res.meta.status == 201) {
              this.$message.success(res.meta.msg);
              this.$emit("getCategoriesParams");
              this.dialogVisible = false;
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style></style>
