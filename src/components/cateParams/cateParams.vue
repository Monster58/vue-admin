<template>
  <div>
    <my-breadcrumb :breadcrumb="['商品管理', '分类参数']"></my-breadcrumb>
    <el-card>
      <el-alert
        style="margin-bottom: 15px;"
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
      ></el-alert>
      <el-row>
        <span>选择商品分类：</span>
        <el-cascader
          v-model="selectedCategories"
          :options="categoriesList"
          :props="{
            expandTrigger: 'hover',
            value: 'cat_id',
            label: 'cat_name'
          }"
          @change="selectedCategoriesChange"
        ></el-cascader>
      </el-row>
      <el-tabs
        style="margin-top:15px;"
        v-model="activeTabsName"
        type="card"
        @tab-click="handleTabsClick"
      >
        <el-tab-pane label="动态参数" name="many">
          <el-button
            :disabled="currentCategoriesId == ''"
            @click="$refs['addParamsOrAttr'].open()"
            type="primary"
            style="margin-bottom: 15px;"
            >添加参数</el-button
          >
          <cateParamsTable
            @getCategoriesParams="getCategoriesParams"
            :currentCategoriesId="currentCategoriesId"
            :data="categoriesParams"
          ></cateParamsTable>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            :disabled="currentCategoriesId == ''"
            @click="$refs['addParamsOrAttr'].open()"
            type="primary"
            style="margin-bottom: 15px;"
            >添加属性</el-button
          >
          <cateParamsTable
            @getCategoriesParams="getCategoriesParams"
            :currentCategoriesId="currentCategoriesId"
            :data="categoriesParams"
          ></cateParamsTable>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addParamsOrAttr
      @getCategoriesParams="getCategoriesParams"
      ref="addParamsOrAttr"
      :id="currentCategoriesId"
      :attr_sel="activeTabsName"
    ></addParamsOrAttr>
  </div>
</template>

<script>
import { getCategories, getCategoriesParamsAjax } from "../../api/index";
import cateParamsTable from "./cateParamsTable";
import addParamsOrAttr from "./addParamsOrAttr";
export default {
  components: {
    cateParamsTable,
    addParamsOrAttr
  },
  data() {
    return {
      selectedCategories: [],
      categoriesList: [],
      activeTabsName: "many",
      currentCategoriesId: "",
      categoriesParams: []
    };
  },
  methods: {
    selectedCategoriesChange() {
      if (this.selectedCategories.length != 3) {
        this.selectedCategories = [];
        this.currentCategoriesId = "";
        this.categoriesParams = [];
      } else {
        this.currentCategoriesId = this.selectedCategories[2];
        this.getCategoriesParams();
      }
    },
    handleTabsClick() {
      if (this.currentCategoriesId) {
        this.getCategoriesParams();
      }
    },
    getCategoriesParams() {
      getCategoriesParamsAjax(
        `categories/${this.currentCategoriesId}/attributes`,
        { sel: this.activeTabsName }
      ).then(res => {
        if (res.meta.status == 200) {
          res.data.forEach(item => {
            item.inputVisible = false;
            item.inputValue = "";
            item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
          });
          this.categoriesParams = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    }
  },
  created() {
    getCategories().then(res => {
      if (res.meta.status == 200) {
        this.categoriesList = res.data;
      } else {
        this.$message.error(res.meta.msg);
      }
    });
  }
};
</script>

<style lang="stylus" scoped></style>
