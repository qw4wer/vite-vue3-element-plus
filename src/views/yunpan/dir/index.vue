<template>
    <div>
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item label="文件夹名称">
                <el-input v-model="queryForm.dirName" placeholder="文件夹名称"></el-input>
            </el-form-item>
            <el-form-item label="文件夹路径">
                <el-input v-model="queryForm.path" placeholder="文件夹路径"></el-input>
            </el-form-item>
            <el-form-item label="文件夹描述">
                <el-input v-model="queryForm.describe" placeholder="文件夹描述"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="queryForm.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="0"></el-option>
                    <el-option label="禁用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findByCond">查询</el-button>
                <el-button type="primary" @click="toAdd">新建</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="isLoading" :data="tableData" highlight-current-row :fit=true style="width: 100%">
            <el-table-column align="center" prop="id" label="id" width="180" v-if="false"></el-table-column>
            <el-table-column align="center" prop="dirName" label="文件夹名称" width="180"></el-table-column>
            <el-table-column align="center" prop="path" label="文件夹路径" width="180"></el-table-column>
            <el-table-column align="center" prop="describe" label="文件夹描述" width="180"></el-table-column>
            <el-table-column align="center" label="操作">
                <template #default="scope">
                    <el-button size="small" @click="toUpdate(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="toDel(scope.$index, scope.row)">删除</el-button>
                    <el-button size="small" @click="toOpen(scope.$index, scope.row)">打开</el-button>

                </template>
            </el-table-column>
        </el-table>

        <form-dialog title="新建/修改文件夹" ref="dirDialog" :submit-fn="submitFn" :after-submit-fn="findByCond">
            <template v-slot:body>
                <dir-form :dirFormData="formData" @clear="clear" />
            </template>
        </form-dialog>

    </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import bind from "../../../utils/index.handle";

export default {
    name: 'index',
    setup() {
        const queryForm = ref({
            name: '',
            path: '',
            describe: '',
            status: ''
        })

        const formData = ref({
            name: null,
            path: null,
            describe: null,
            id: null
        })

        const { proxy } = getCurrentInstance();
        const bindHandle = bind({
            module: 'dir',
            queryForm: queryForm,
            formData: formData,
            dialog: 'dirDialog'
        }, proxy);

        const toOpen = (index, row) => {
            window.open(`../yunpan?id=${row.id}`)
        }



        return {
            ...bindHandle,
            queryForm,
            formData,
            toOpen
        }
    },
    computed: {},
    methods: {}
}
</script>

<style scoped>

</style>
