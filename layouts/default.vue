<template>
  <div class="">
    <Header/>
    <div class="container pt-5">
      <nuxt class="pt-4" />
    </div>
    <Toolbar/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Toolbar from '../components/Toolbar'

export default {
  components: {
    Header,
    Toolbar
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
