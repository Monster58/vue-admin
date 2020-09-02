<template>
  <div>
    <my-breadcrumb
      :breadcrumb="['商品管理', '商品列表', '添加商品']"
    ></my-breadcrumb>
    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
      <el-steps
        align-center
        :space="200"
        :active="currentTabIndex"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <el-form
        ref="addGoods"
        label-position="top"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
      >
        <el-tabs tab-position="left" :before-leave="changeTabsBeforeLeave">
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="formLabelAlign.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input
                type="number"
                v-model="formLabelAlign.goods_price"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                type="number"
                v-model="formLabelAlign.goods_number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input
                type="number"
                v-model="formLabelAlign.goods_weight"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="formLabelAlign.goods_cat"
                :options="goodsCategories"
                :props="{
                  expandTrigger: 'hover',
                  value: 'cat_id',
                  label: 'cat_name'
                }"
                @change="handleCascaderChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyParams"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  v-for="(checkboxItem, i) in item.checkedAttrVals"
                  :key="i"
                  :label="checkboxItem"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyParams"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  v-for="(checkboxItem, i) in item.checkedAttrVals"
                  :key="i"
                  :label="checkboxItem"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="uploadHeaders"
              :on-success="handleUploadSuccess"
            >
              <el-button size="large" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <quill-editor
              v-model="formLabelAlign.goods_introduce"
              ref="myQuillEditor"
            ></quill-editor>
            <el-button
              style="margin-top: 15px;"
              type="primary"
              @click="addGoods"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog
      title="图片预览"
      :visible.sync="picPreviewDialogVisible"
      width="60%"
    >
      <img style="width: 100%;" :src="picPreviewUrl" alt />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="picPreviewDialogVisible = false"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCategories,
  getCategoriesParamsAjax,
  addGoodsAjax
} from "../../api/index";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      currentTabIndex: 0,
      formLabelAlign: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
        pics: [],
        goods_introduce: ""
      },
      goodsCategories: [],
      manyParams: [],
      onlyParams: [],
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ]
      },
      uploadUrl: "",
      uploadHeaders: {
        Authorization: window.sessionStorage.getItem("token")
      },
      picPreviewDialogVisible: false,
      picPreviewUrl: "",
      editorContent: ""
    };
  },
  methods: {
    handleCascaderChange() {
      if (this.formLabelAlign.goods_cat.length != 3) {
        this.formLabelAlign.goods_cat = [];
      }
    },
    changeTabsBeforeLeave(activeName, oldActiveName) {
      if (oldActiveName == 0 && this.formLabelAlign.goods_cat.length != 3) {
        this.$message.error("请选择商品分类");
        return false;
      } else {
        this.currentTabIndex = activeName * 1;
      }
    },
    //移除图片
    handleRemove(file) {
      const i = this.formLabelAlign.pics.findIndex(
        item => item == file.response.data.tmp_path
      );
      this.formLabelAlign.pics.splice(i, 1);
    },
    //处理图片预览
    handlePreview(file) {
      this.picPreviewDialogVisible = true;
      this.picPreviewUrl = file.response.data.url;
    },
    handleUploadSuccess(res) {
      if (res.meta.status == 200) {
        this.formLabelAlign.pics.push({
          pic: res.data.tmp_path
        });
      }
    },

    addGoods() {
      this.$refs["addGoods"].validate(valid => {
        if (valid) {
          //整理提交参数
          let data = JSON.stringify(this.formLabelAlign);
          data = JSON.parse(data);
          data.goods_cat = data.goods_cat.join(",");
          //编辑参数属性
          let attrs = [];
          let manyParams = JSON.stringify(this.manyParams);
          manyParams = JSON.parse(manyParams);
          manyParams.forEach(item => {
            attrs.push({
              attr_id: item.attr_id,
              attr_value: item.attr_vals.join(" ")
            });
          });
          let onlyParams = JSON.stringify(this.onlyParams);
          onlyParams = JSON.parse(onlyParams);
          onlyParams.forEach(item => {
            attrs.push({
              attr_id: item.attr_id,
              attr_value: item.attr_vals.join(" ")
            });
          });
          data.attrs = attrs;
          addGoodsAjax(data).then(res => {
            if (res.meta.status == 201) {
              this.$message.success(res.meta.msg);
              this.$router.push("/goods");
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        } else {
          this.$message.error("请填写必要信息");
          return false;
        }
      });
    }
  },
  created() {
    getCategories().then(res => {
      if (res.meta.status == 200) {
        this.goodsCategories = res.data;
      }
    });
    this.uploadUrl = process.env.VUE_APP_BASEAPI + "upload";
  },
  watch: {
    "formLabelAlign.goods_cat": async function(newVal) {
      if (newVal.length) {
        await Promise.all([
          getCategoriesParamsAjax(
            `categories/${this.formLabelAlign.goods_cat[2]}/attributes`,
            { sel: "many" }
          ),
          getCategoriesParamsAjax(
            `categories/${this.formLabelAlign.goods_cat[2]}/attributes`,
            { sel: "only" }
          )
        ]).then(res => {
          res.forEach(item => {
            if (item.meta.status != 200) {
              return this.$message.error(item.meta.status);
            } else {
              this.manyParams = res[0].data;

              this.onlyParams = res[1].data;
            }
          });
          this.manyParams.forEach(item => {
            if (item.attr_vals) {
              item.attr_vals = item.attr_vals.split(" ");
            } else {
              item.attr_vals = [];
            }
            item.checkedAttrVals = item.attr_vals;
          });
          this.onlyParams.forEach(item => {
            if (item.attr_vals) {
              item.attr_vals = item.attr_vals.split(" ");
            } else {
              item.attr_vals = [];
            }
            item.checkedAttrVals = item.attr_vals;
          });
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import url('../../../node_modules/quill/dist/quill.snow.css');

.el-steps {
  margin-top: 15px;
}

.el-tabs {
  margin-top: 15px;
}

.ql-container {
  min-height: 200px !important;
}
</style>
