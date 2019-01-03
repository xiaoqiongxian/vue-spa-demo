<template>
    <div>
        <el-dialog :title="t('vueDemo.common.add')" :visible.sync="showAdd" size="tiny" @close="handelCancel">
		  <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="100px">
		    <el-form-item :label="t('vueDemo.label.name')" prop="name">
		      <el-input v-model="addForm.name"></el-input>
		    </el-form-item>
		    <el-form-item :label="t('vueDemo.label.status')" prop="status">
		      <el-input v-model="addForm.status"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="handelCancel">{{t("vueDemo.common.cancel")}}</el-button>
		    <el-button type="primary" @click="handelConfirm">{{t("vueDemo.common.sure")}}</el-button>
		  </div>
		</el-dialog>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    import i18n from "~/i18n/i18n.js";

    export default{
        mixins:[i18n],
    	props:{
			
    	},
        data() {
            return {
                addForm:{
                	name:"",
                	status:""
                },
                addFormRules:{
                	name:[
                		{required:true,message:this.t("vueDemo.validateTip.nameIsRequired"),trigger:"blur"},
                        {validator:this.validateExtend.checkEnglish,trigger:"blur"}
                	],
                	status:[
                		{required:true,message:this.t("vueDemo.validateTip.statusIsRequired"),trigger:"blur"}
                	]
                }
            }
        },
        computed:{
            // 映射 this.showAdd 为 state.pageOne.showAdd
            ...mapState({
                showAdd: state => state.pageOne.showAdd
            })
        },
        methods:{
        	handelCancel(){
                this.$store.commit("pageOneHideAdd");
                this.$refs["addForm"].resetFields();
                this.$emit("handelCancel");
        	},
        	handelConfirm(){
        		let _self = this;
                console.log(_self.$store);
        		this.$refs["addForm"].validate((valid)=>{
        			if(valid){
                        _self.$ajax.addList("/api/lists",_self.addForm)
                        .then((response) => {
                            if(response.code === "success"){
                              _self.$emit("handelSuccess");
                              _self.$store.commit("pageOneHideAdd");
                            }else{
                              _self.$notify.error({
                                title: _self.t("vueDemo.common.fail"),
                                message: _self.t("vueDemo.common.addFail")
                              });
                            }
                        },(error) => {
                          _self.$notify.error({
                            title: _self.t("vueDemo.common.fail"),
                            message: _self.t("vueDemo.common.addFail")
                          });
                        })
                        .catch(function (error) {
                            _self.$notify.error({
                                title: _self.t("vueDemo.common.fail"),
                                message: _self.t("vueDemo.common.addFail")
                            });
                        });
        			}
        		})
        	}
        }
    }
</script>
