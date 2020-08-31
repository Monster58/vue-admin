<template>
  <el-dialog
    title="编辑"
    :visible.sync="dialogVisible"
    width="60%"
    @close="handleClose"
  >
    <el-form
      ref="editAttrForm"
      label-width="80px"
      :model="currentEditObj"
      :rules="rules"
    >
      <el-form-item label="名称" prop="attr_name">
        <el-input v-model="currentEditObj.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getCategoriesParamsByIdAjax,
  putCategoriesParamsAjax
} from "../../api/index";
export default {
  props: ["id"],
  data() {
    return {
      dialogVisible: false,
      rules: {
        attr_name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      currentEditObj: {}
    };
  },
  methods: {
    open(id, attrId) {
      getCategoriesParamsByIdAjax(`categories/${id}/attributes/${attrId}`).then(
        res => {
          if (res.meta.status == 200) {
            this.currentEditObj = res.data;
            console.log(res.data);
          } else {
            this.$message.error(res.meta.msg);
          }
        }
      );
      this.dialogVisible = true;
    },
    handleClose() {
      this.$refs["editAttrForm"].resetFields();
    },
    submit() {
      this.$refs["editAttrForm"].validate(valid => {
        if (valid) {
          putCategoriesParamsAjax(
            `categories/${this.currentEditObj.cat_id}/attributes/${this.currentEditObj.attr_id}`,
            this.currentEditObj
          ).then(res => {
            if (res.meta.status == 200) {
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
