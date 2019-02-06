<template>
  <div>
    <ul class="list-group font-weight-bold mb-5">
      <ListItem
        v-for="entry in timeEntries"
        :key="entry.id"
        :title="entry.title"
        :startTime="entry.startTime"
        :endTime="entry.endTime"
        :timeAmount="entry.timeAmount"
        />
    </ul>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
  computed: {
    timeEntries () {
      return this.$store.state.timeEntries;
    }
  },
  components: {
    ListItem
  }
}
</script>

<style>

</style>
