<template>
    <div>
        <el-button type="primary" @click="showAddDialog" size="medium">{{t('vueDemo.common.add')}}</el-button>
        <div class="table-container">
          <el-table
            style="width: 100%"
            border
            stripe
            :data="tableList">
            <el-table-column
              type="selection"
              width="60">
            </el-table-column>
            <el-table-column
              prop="name"
              sortable
              :label="t('vueDemo.label.name')"
              width="400">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              sortable
              :label="t('vueDemo.label.status')"
              width="400">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column 
              :label="t('vueDemo.label.operation')"
              width="400">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showEditDialog(scope.row)">{{t('vueDemo.common.edit')}}</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="showConfirmDelete(scope.row)">{{t('vueDemo.common.del')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <page-one-add :showAddFlag="showAdd" @handelSuccess="addSuccess" @handelCancel="showAdd = false"></page-one-add>
        <page-one-edit :showEditFlag="showEdit" :editData="editRow" @handelSuccess="editSuccess" @handelCancel="showEdit = false"></page-one-edit>
    </div>
</template>

<script>
    import i18n from "~/i18n/i18n.js";
    import pageOneAdd from "./page-one-add.vue";
    import pageOneEdit from "./page-one-edit.vue";

    export default{
        mixins:[i18n],
        data() {
            return {
                tableList: [],
                showAdd:false,
                showEdit:false,
                editRow:{}
            }
        },
        components:{
          "page-one-add":pageOneAdd,
          "page-one-edit":pageOneEdit
        },
        created:function(){
          this.loadTableData();
        },
        methods:{ 
          loadTableData(){
            let _self = this;
            _self.$ajax.getList('/api/lists')
            .then((response) => {
                if(response.code === "success"){
                  _self.tableList = response.data;
                }else{
                  _self.$notify.error({
                    title: _self.t("vueDemo.common.fail"),
                    message: _self.t("vueDemo.common.getFail")
                  });
                }
            },(error) => {
              _self.$notify.error({
                title: _self.t("vueDemo.common.fail"),
                message: _self.t("vueDemo.common.getFail")
              });
            })
            .catch(function (error) {
                _self.$notify.error({
                    title: _self.t("vueDemo.common.fail"),
                    message: _self.t("vueDemo.common.getFail")
                });
            });
          },
           showAddDialog(){
            this.showAdd = true;
           },
           addSuccess(addResult){
              this.showAdd = false;
              this.loadTableData();
           },
           showEditDialog(rowData){
            this.showEdit = true;
            this.editRow = rowData;
           },
           editSuccess(editResult){
              this.showEdit = false;
              this.loadTableData();
           },
           showConfirmDelete(deleteRow){
              let _self = this;
              this.$confirm(_self.t("vueDemo.common.confirmDel",[deleteRow.name]), _self.t("vueDemo.common.tip"), {
                confirmButtonText: _self.t("vueDemo.common.sure"),
                cancelButtonText: _self.t("vueDemo.common.cancel"),
                type: 'warning'
              }).then(() => {
                _self.$ajax.deleteList('/api/lists/'+deleteRow.id)
                .then((response) => {
                    if(response.code === "success"){
                      this.loadTableData();
                    }else{
                      _self.$notify.error({
                        title: _self.t("vueDemo.common.fail"),
                        message: _self.t("vueDemo.common.delFail")
                      });
                    }
                },(error) => {
                  _self.$notify.error({
                    title: _self.t("vueDemo.common.fail"),
                    message: _self.t("vueDemo.common.delFail")
                  });
                })
                .catch(function (error) {
                    _self.$notify.error({
                        title: _self.t("vueDemo.common.fail"),
                        message: _self.t("vueDemo.common.delFail")
                    });
                });
              }).catch(() => {
                console.log("cancel");
              })
           }
        }
    }
</script>

<style scoped>
  .table-container{
    margin-top: 20px;
  }
</style>