<template>
    <div>
        <el-tabs v-model="activePath" type="card" closable @tab-remove="removeTab" @tab-click="selectTab">
            <el-tab-pane
                    v-for="(item, index) in items"
                    :key="item.index"
                    :label="item.title"
                    :name="item.path"
            >
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'

  export default {
    name: 'Tabs',
    computed: {
      ...mapFields('tabs', [
        'index',
        'items',
        'activePath'
      ]),
      item: function () {
        return {
          name: `user:${this.items.length}`,
          path: `/user/${this.items.length}`,
          icon: 'about.ico',
          hasClose: true
        }
      }
    },
    methods: {
      ...mapActions('tabs', [
        'removeTab',
        'selectTab'
      ])
    }
  }
</script>

<style scoped>

</style>
