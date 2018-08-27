<template>
    <div>
        <el-dialog :title="t('vueDemo.common.edit')" :visible.sync="visible" size="tiny" @close="handelCancel">
		  <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="100px">
		    <el-form-item :label="t('vueDemo.label.name')" prop="name">
		      <el-input v-model="editForm.name"></el-input>
		    </el-form-item>
		    <el-form-item :label="t('vueDemo.label.status')" prop="status">
		      <el-input v-model="editForm.status"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="handelCancel">{{t('vueDemo.common.cancel')}}</el-button>
		    <el-button type="primary" @click="handelConfirm">{{t('vueDemo.common.sure')}}</el-button>
		  </div>
		</el-dialog>
    </div>
</template>
<script>
    import i18n from "~/i18n/i18n.js";

    export default{
        mixins:[i18n],
    	props:{
			showEditFlag:{
				type:Boolean,
				default:false
			},
			editData:{
				type:Object,
				default:{}
			}
    	},
        data: function () {
            return {
                visible:false,
                editForm:{
                	id:"",
                	name:"",
                	status:""
                },
                editFormRules:{
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
        created:function(){
        	this.visible = this.showEditFlag;
        },
        watch:{
        	showEditFlag(val){
        		this.visible = val;
        	},
        	editData(val){
        		this.editForm.id = val.id;
        		this.editForm.name = val.name;
        		this.editForm.status = val.status
        	}
        },
        components:{

        },
        mounted:function(){

        },
        methods:{
        	handelCancel(){
        		this.visible = false;
                this.$refs["editForm"].resetFields();
                this.$emit("handelCancel");
        	},
        	handelConfirm(){
        		let _self = this;
        		this.$refs["editForm"].validate((valid)=>{
        			if(valid){
                        _self.$ajax.updateList('/api/lists/'+_self.editForm.id, _self.editForm)
                        .then((response) => {
                            if(response.code === "success"){
                                _self.$emit("handelSuccess");
                                _self.visible = false;
                            }else{
                              _self.$notify.error({
                                title: _self.t("vueDemo.common.fail"),
                                message: _self.t("vueDemo.common.editlFail")
                              });
                            }
                        },(error) => {
                          _self.$notify.error({
                            title: _self.t("vueDemo.common.fail"),
                            message: _self.t("vueDemo.common.editlFail")
                          });
                        })
                        .catch(function (error) {
                            _self.$notify.error({
                                title: _self.t("vueDemo.common.fail"),
                                message: _self.t("vueDemo.common.editlFail")
                            });
                        });

        			}
        		})
        	}
        }
    }
</script>
