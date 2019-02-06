<template>
  <section class="container">
    <div class="row">
      <div class="col-md-6">
        <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
      </div>
      <div class="col-md-6">
        <apexchart width="500" type="area" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
      },
      series: [{
        name: 'series-1',
        data: [2, 5, 1, 2, 0, 0, 0]
      }]
    }
  }
}
</script>

<style>
</style>
