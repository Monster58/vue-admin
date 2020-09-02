<template>
  <el-dialog title="物流信息" :visible.sync="dialogVisible" width="60%">
    <el-timeline :reverse="true">
      <el-timeline-item
        v-for="(activity, index) in logistics"
        :key="index"
        :timestamp="activity.time"
        >{{ activity.context }}</el-timeline-item
      >
    </el-timeline>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getLogisticsAjax } from "../../api/index";
export default {
  data() {
    return {
      dialogVisible: false,
      logistics: []
    };
  },
  methods: {
    open() {
      getLogisticsAjax(`/kuaidi/1106975712662`).then(res => {
        if (res.meta.status == 200) {
          this.logistics = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
      this.dialogVisible = true;
    }
  }
};
</script>

<style></style>
