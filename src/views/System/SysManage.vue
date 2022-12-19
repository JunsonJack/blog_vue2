<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="id" width="80" prop="id">
            </el-table-column>
            <el-table-column label="标题" width="180" prop="title">
            </el-table-column>
            <el-table-column label="类别" width="140">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.type }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="发布日期" width="240">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime | format('YYYY-MM-DD HH:mm:ss') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发布状态">
                <template slot-scope="scope">
                    <el-switch style="display: block" 
                    v-model="scope.row.pubFlag"
                    active-color="#13ce66"
                    inactive-color="#ff4949"  
                    :active-value= 1 
                    :inactive-value= 0 
                    @change="changeSwitch(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="浏览量" width="100" prop="views">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mixin_date } from '@/mixin/mixin_date'
import { getTableData, DelArticleById,PubArticleById } from '@/http/api'
export default {
    data() {
        return {
            tableData: [],
            value:0
        }
    },
    methods: {
        loadTable() {
            getTableData().then((res) => {
                console.log('res.data',res.data)
                this.tableData = res.data

            })
        },
        handleEdit(row) {
            this.$router.push({
                path: '/sysIndex',
                query: {
                    id: row.id
                }
            })
        },
        handleDelete(row) {
            console.log('row', row.id)
            // 注意这里请求传参需要是一个对象
            let id = {
                id: row.id
            }
            DelArticleById(id).then(() => {
                this.$message.success('删除成功')
                setTimeout(() => {
                    this.loadTable()
                }, 200);
            })
        },
        changeSwitch(row) {
            
            let data = {
                id: row.id,
                pubFlag: row.pubFlag
            }
            console.log(data)
            PubArticleById(data).then((res) => {
                console.log(res)

                this.$message.success('修改成功')
            })
        }
    },
    mixins: [mixin_date],
    mounted() {
        this.loadTable()
    }
}
</script>

<style lang="scss" scoped>

</style>