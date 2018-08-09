<template>
    <div>
        <el-dialog :title="t('vueDemo.common.add')" :visible.sync="visible" size="tiny">
		  <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="100px">
		    <el-form-item :label="t('vueDemo.label.name')" prop="name">
		      <el-input v-model="addForm.name"></el-input>
		    </el-form-item>
		    <el-form-item :label="t('vueDemo.label.status')" prop="status">
		      <el-input v-model="addForm.status"></el-input>
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
			showAddFlag:{
				type:Boolean,
				default:false
			}
    	},
        data() {
            return {
                visible:false,
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
        created:function(){
        	this.visible = this.showAddFlag;
        },
        watch:{
        	showAddFlag(val){
        		this.visible = val;
        	}
        },
        components:{

        },
        mounted:function(){

        },
        methods:{
        	handelCancel(){
        		this.visible = false;
        	},
        	handelConfirm(){
        		let _self = this;
        		this.$refs["addForm"].validate((valid)=>{
        			if(valid){
        				this.visible = false;
        				let date = new Date();
        				let addData = {
        					id: date.getTime(),
        					name:_self.addForm.name,
        					status:_self.addForm.status
        				}
        				_self.$emit("handelSuccess",addData);
        			}
        		})
        	}
        }
    }
</script>
