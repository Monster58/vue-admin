<template>
  <div>
    <my-breadcrumb :breadcrumb="['权限管理', '角色列表']"></my-breadcrumb>
    <el-card>
      <el-button @click="$refs['addRoles'].open()" style="margin-bottom: 15px;" type="primary">添加角色</el-button>
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              class="row1"
              :gutter="20"
              v-for="(level1,index) in scope.row.children"
              :key="index"
            >
              <el-col :span="5">
                <el-tag closable @close="deleteRolesRights(scope,level1.id)" type="warning">{{level1.authName}}</el-tag>
              </el-col>
              <el-col :span="19">
                <el-row
                  class="row2"
                  v-for="(level2,index2) in level1.children"
                  :key="index2"
                  :gutter="20"
                >
                  <el-col :span="4">
                    <el-tag closable @close="deleteRolesRights(scope,level2.id)" type="success">{{level2.authName}}</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag
                      @close="deleteRolesRights(scope,level3.id)"
                      closable
                      v-for="(level3,index3) in level2.children"
                      :key="index3"
                    >{{level3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column width="300" label="操作" prop="roleDesc">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="$refs['editRoles'].open(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteRoles(scope.row.id)"
            >删除</el-button>
            <el-button @click="$refs['setRights'].open(scope.row)" size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <addRoles ref="addRoles" @_getRoles="_getRoles"></addRoles>
    <editRoles ref="editRoles" @_getRoles="_getRoles"></editRoles>
    <setRights ref="setRights" @_getRoles="_getRoles"></setRights>
  </div>
</template>

<script>
import { getRoles, deleteRoles, deleteRolesRightsAjax } from "../../api/index";
import addRoles from "./addRoles";
import editRoles from "./editRoles";
import setRights from "./setRights";
export default {
  components: {
    addRoles,
    editRoles,
    setRights
  },
  data() {
    return {
      rolesList: []
    };
  },
  methods: {
    _getRoles() {
      getRoles().then(res => {
        if (res.meta.status != 200) {
          this.$message.error(res.meta.msg);
        } else {
          this.$message.success(res.meta.msg);
          this.rolesList = res.data;
        }
      });
    },
    deleteRoles(id) {
      deleteRoles(`roles/${id}`).then(res => {
        if (res.meta.status != 200) {
          this.$message.error(res.meta.msg);
        } else {
          this.$message.success(res.meta.msg);
          this._getRoles();
        }
      });
    },
    deleteRolesRights(scope, rightsId) {
      this.$confirm("此操作将删除该权限?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRolesRightsAjax(`roles/${scope.row.id}/rights/${rightsId}`).then(
            res => {
              // console.log(res);
              if (res.meta.status != 200) {
                this.$message({
                  type: "error",
                  message: res.meta.msg
                });
              } else {
                this.$message({
                  type: "success",
                  message: res.meta.msg
                });
                scope.row.children = res.data
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this._getRoles();
  }
};
</script>

<style lang="stylus" scoped>
.row1 {
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  padding: 10px 0;

  &:first-child {
    border-top: 1px solid #ececec;
  }

  .row2 {
    border-bottom: 1px solid #ececec;
    padding: 10px;
    display: flex;
    align-items: center;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
    }
  }
}

.el-tag {
  margin: 6px 10px;
}
</style>
