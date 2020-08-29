<template>
  <div>
    <my-breadcrumb :breadcrumb="['权限管理', '权限列表']"></my-breadcrumb>
    <el-card>
      <el-table :data="showList[currentNum - 1]" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.level == 0">一级</el-tag>
            <el-tag v-else-if="scope.row.level == 1" type="success"
              >二级</el-tag
            >
            <el-tag v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="pagenumChange"
        background
        layout="prev, pager, next"
        :total="rightsList.length"
        :page-size="10"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getRights } from "../../api/index";
export default {
  data() {
    return {
      rightsList: [],
      showList: [],
      currentNum: 1
    };
  },
  methods: {
    pagenumChange(num) {
      this.currentNum = num;
    }
  },
  created() {
    getRights().then(res => {
      if (res.meta.status != 200) {
        this.$message.error(res.meta.msg);
      } else {
        this.$message.success(res.meta.msg);
        this.rightsList = res.data;
        let newArr = [];
        let arr = [];
        res.data.forEach((item, index) => {
          arr.push(item);
          if (arr.length == 10) {
            newArr.push(arr);
            arr = [];
          }
          if (index == res.data.length - 1) {
            newArr.push(arr);
          }
        });
        this.showList = newArr;
      }
    });
  }
};
</script>

<style lang="stylus" scoped></style>
