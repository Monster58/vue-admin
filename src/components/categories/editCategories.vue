<template>
  <el-dialog
    title="编辑分类"
    :visible.sync="dialogVisible"
    width="60%"
    @close="_resetForm"
  >
    <el-form
      ref="editCategoriesForm"
      label-position="left"
      label-width="80px"
      :model="formLabelAlign"
      :rules="rules"
    >
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="formLabelAlign.cat_name" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editCategories">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCategoriesByIdAjax, editCategoriesAjax } from "../../api/index";
export default {
  data() {
    return {
      dialogVisible: false,
      formLabelAlign: {},
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    open(id) {
      this.dialogVisible = true;
      getCategoriesByIdAjax(`categories/${id}`).then(res => {
        if (res.meta.status == 200) {
          this.formLabelAlign = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    _resetForm() {
      this.formLabelAlign = {};
    },
    editCategories() {
      this.$refs["editCategoriesForm"].validate(valid => {
        if (valid) {
          editCategoriesAjax(`categories/${this.formLabelAlign.cat_id}`, {
            cat_name: this.formLabelAlign.cat_name
          }).then(res => {
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this.$emit("_getCategories");
              this._resetForm();
              this.dialogVisible = false;
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="stylus" scoped></style>
