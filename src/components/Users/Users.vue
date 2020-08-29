<template>
  <div>
    <my-breadcrumb :breadcrumb="['用户管理', '用户列表']"></my-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="40">
        <el-col :span="10">
          <div>
            <el-input
              v-model="getUser.query"
              placeholder="搜索用户"
              clearable
              @clear="searchUsers"
            >
              <el-button
                @click="searchUsers"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加用户</el-button
        >
      </el-row>
      <el-table
        :data="usersData.users"
        style="width: 100%;margin-top:15px;"
        stripe
        border
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              active-color="#13ce66"
              @change="handleMgStateChange(scope.row)"
              v-model="scope.row.mg_state"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              :enterable="false"
              placement="top"
            >
              <el-button
                @click="getEditUser(scope.row.id)"
                size="mini"
                type="primary"
              >
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              :enterable="false"
              placement="top"
            >
              <el-button
                @click="$refs['setUserRole'].open(scope.row)"
                size="mini"
                type="warning"
              >
                <i class="el-icon-setting"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              :enterable="false"
              placement="top"
            >
              <el-button
                size="mini"
                type="danger"
                @click="deleteUser(scope.row.id)"
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>

            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="usersData.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="getUser.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersData.total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      @close="resetAddUserForm"
      title="添加用户"
      :visible.sync="dialogFormVisible"
      width="60%"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="addUserForm"
        ref="addUserForm"
        :rules="addUserRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetAddUserForm">重 置</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addUserForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editUserDialogVisible"
      width="60%"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="editUserForm"
        ref="editUserForm"
        :rules="addUserRules"
      >
        <el-form-item label="用户名">
          <el-input :value="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <setUserRole @_getUserList="_getUserList" ref="setUserRole"></setUserRole>
  </div>
</template>

<script>
import { getUserList, changeUserState, addUser } from "../../api/index";
import ajax from "../../api/ajax.js";
import axios from "axios";
import validator from "@u/validator.js";
import setUserRole from "./setUserRole";
export default {
  components: {
    setUserRole
  },
  data() {
    let checkEmail = (rule, value, callback) => {
      if (value != "") {
        if (validator.checkEmail.test(value)) {
          return callback();
        } else {
          callback(new Error("邮箱格式不正确"));
        }
      } else {
        callback();
      }
    };
    let checkMobile = (rule, value, callback) => {
      if (value != "") {
        if (validator.checkMobile.test(value)) {
          return callback();
        } else {
          callback(new Error("手机格式不正确"));
        }
      } else {
        callback();
      }
    };
    return {
      usersData: [],
      getUser: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      dialogFormVisible: false,
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addUserRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      },
      editUserDialogVisible: false,
      editUserForm: {
        username: "",
        email: "",
        mobile: ""
      }
    };
  },
  methods: {
    handleSizeChange(pagesize) {
      this.getUser.pagesize = pagesize;
      this._getUserList();
    },
    handleCurrentChange(pagenum) {
      this.getUser.pagenum = pagenum;
      this._getUserList();
    },
    handleMgStateChange(obj) {
      changeUserState({
        users: obj.id,
        state: obj.mg_state
      }).then(res => {
        if (res.meta.status != 200) {
          obj.mg_state = !obj.mg_state;
          this.$message.error(res.meta.msg);
        } else {
          this.$message.success(res.meta.msg);
        }
      });
    },
    searchUsers() {
      this._getUserList();
    },
    _getUserList() {
      getUserList(this.getUser).then(res => {
        this.usersData = res.data;
        if (res.meta.status != 200) {
          this.$message.error(res.meta.msg);
        } else {
          this.$message.success(res.meta.msg);
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //发送请求
          addUser(this.addUserForm).then(res => {
            if (res.meta.status != 201) {
              this.$message.error(res.meta.msg);
            } else {
              this.$message.success(res.meta.msg);
              this._getUserList();
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    resetAddUserForm() {
      this.$refs["addUserForm"].resetFields();
    },
    getEditUser(id) {
      this.editUserDialogVisible = true;
      ajax(`users/${id}`).then(res => {
        if (res.meta.status != 200) {
          this.$message.error(res.meta.msg);
        } else {
          this.editUserForm = res.data;
        }
      });
    },
    submitEdit() {
      this.$refs["editUserForm"].validate(valid => {
        if (valid) {
          axios
            .put(`users/${this.editUserForm.id}`, this.editUserForm)
            .then(res => {
              const { data } = res;
              if (data.meta.status != 200) {
                this.$message.error(data.meta.msg);
              } else {
                this.$message.success(data.meta.msg);
                this.editUserDialogVisible = false;
                this._getUserList();
              }
            });
        }
      });
    },
    deleteUser(id) {
      this.$confirm("确定要删除当前用户吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      })
        .then(() => {
          axios.delete(`users/${id}`, { id }).then(res => {
            const { data } = res;
            if (data.meta.status != 200) {
              this.$message.error(data.meta.msg);
            } else {
              this.$message.success(data.meta.msg);
              this.editUserDialogVisible = false;
              this._getUserList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    }
  },
  created() {
    this._getUserList();
  }
};
</script>

<style lang="stylus" scoped></style>
