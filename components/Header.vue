<template>
  <header class="bg-dark">
    <div class="container">
      <nav class="navbar navbar-expand-sm px-0">
        <nuxt-link class="navbar-brand font-weight-bold" to="/">
          <fa icon="clock" class="mr-2"/>Chillable Hours
        </nuxt-link>
        <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="time ml-auto">
            <h6 class="my-0 d-inline font-weight-bold">
              {{  this.$store.state.currentTime | moment("MM/D/YY") }}
            </h6> |
            <h6 class="my-0 d-inline font-weight-bold">
              {{  this.$store.state.currentTime | moment("h:mm:ss A") }}
            </h6>
          </div>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/">
                Dashboard
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/timesheet">
                Timesheet
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/reports">
                Reports
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/badges">
                Badges
              </nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  created: function() {
    this.getTime()
    this.timer = setInterval(this.getTime, 1000)
  },
  methods: {
    getTime: function() {
      // console.log(toolbar.title)
      this.$store.commit('getTime')
    }
  }
}
</script>

<style lang="scss">
header .navbar .navbar-brand {
  color: #88FF81;
}

header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;

  .nav-item {
    a.nav-link {
      color: #88FF81;
      font-weight: 300;

      position: relative;
      &::after {
        content: '';
        width: 0%;
        height: 3px;
        background-color: #88FF81;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        transition: all 0.5s ease-in-out;
      }

      &.nuxt-link-exact-active {
        &::after {
          width: 95%;
        }
      }
    }
  }
}
</style>
