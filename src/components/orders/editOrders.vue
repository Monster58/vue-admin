<template>
  <el-dialog
    title="编辑订单"
    :visible.sync="dialogVisible"
    width="60%"
    @close="resetForm"
  >
    <el-form
      ref="editOrdersForm"
      label-position="left"
      label-width="90px"
      :model="formLabelAlign"
      :rules="rules"
    >
      <el-form-item label="省市区/县" prop="position">
        <el-cascader
          v-model="formLabelAlign.position"
          :options="cityData"
          :props="{ expandTrigger: 'hover', label: 'name', value: 'code' }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="formLabelAlign.address"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import cityData from "../../utils/cityData";
export default {
  data() {
    return {
      dialogVisible: false,
      formLabelAlign: {
        position: "",
        address: ""
      },
      rules: {
        position: [
          {
            type: "array",
            required: true,
            message: "请选择省市区/县",
            trigger: "blur"
          }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      cityData: []
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    handleChange() {
      console.log(this.formLabelAlign.position);
    },
    resetForm() {
      this.$refs["editOrdersForm"].resetFields();
    },
    submitForm() {
      this.$refs["editOrdersForm"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.cityData = cityData;
  }
};
</script>

<style></style>
