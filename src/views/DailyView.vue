<template>
    <div class="app-container">
        <div v-if="user">
            <el-row :gutter="20">

                <el-col :span="6" :xs="24">
                    <user-card :user="user" />
                </el-col>

                <el-col :span="18" :xs="24">
                    <el-card>
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="日常活动" name="activity">
                                <activity />
                            </el-tab-pane>
                            <el-tab-pane label="时间线" name="timeline">
                                <timeline />
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>

            </el-row>
        </div>
    </div>
</template>

<script>
import UserCard from '@/components/UserCard'
import Activity from '@/components/Activity'
import Timeline from '@/components/Timeline'

export default {
    components: { UserCard, Activity, Timeline },
    data() {
        return {
            user: {},
            activeTab: 'activity'
        }
    },
}
</script>

<style lang="scss" scoped>

</style>