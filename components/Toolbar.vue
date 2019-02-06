<template>
<div class="toolbar position-fixed">
  <div class="container position-relative">
    <div class="btn-toolbar py-3 justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
      <div class="btn-group main mr-2 order-2 order-md-1" role="group" aria-label="First group">
        <button type="button" class="btn btn-danger text-white" v-on:click="pressRecord">
          <fa v-if="!recording" icon="circle"  />
          <fa v-if="recording" icon="stop" />
        </button>
        <button type="button" class="btn btn-warning" v-on:click="showStopwatchPane = !showStopwatchPane"><fa icon="stopwatch"/></button>
      </div>
      <div class="input-group flex-fill mr-2 order-1 order-md-2">
        <input type="text" class="form-control form-control-lg" placeholder="What's up?" aria-label="Input group example" aria-describedby="btnGroupAddon" :value="this.toolbar.title" @input="updateToolbarTitle">
        <div class="input-group-append">
          <button type="button" class="btn btn-success" id="btnGroupAddon">Project</button>
        </div>
      </div>
      <div class="input-group mr-2 order-1 order-md-2">
        <input type="text" class="form-control form-control-lg" placeholder="Time" aria-label="Input group example" aria-describedby="btnGroupAddon" v-model="this.toolbar.timeAmount">
      </div>
      <div class="btn-group ml-md-auto order-3" role="group" aria-label="Button group with nested dropdown">
        <button type="button" class="btn btn-secondary" v-on:click="alert()">1</button>
        <button type="button" class="btn btn-success"><fa icon="dollar-sign"/></button>
        <button type="button" class="btn btn-danger" v-on:click="showNotificationPane = !showNotificationPane"><fa icon="trash"/></button>
      </div>
    </div>
    <div class="menu-popup delete p-3 rounded shadow" v-bind:class="{ active: showNotificationPane }">
      <h6>Are you sure you want to delete this entry?</h6>
      <a class="btn btn-success" v-on:click="clearToolbar(toolbar); showNotificationPane = !showNotificationPane">Yes</a>
      <a class="btn btn-danger" v-on:click="showNotificationPane = !showNotificationPane">No</a>
    </div>
    <div class="menu-popup stopwatch p-3 rounded shadow" v-bind:class="{ active: showStopwatchPane }">
      <h6>Sprint Settings</h6>
      <hr>
      <form>
        <div class="form-row mb-2">
          <div class="col-sm-5 align-content-start text-left">
            <label class="mr-sm-2" for="inlineFormCustomSelect">Length</label>
          </div>
          <div class="col-sm-7">
            <select class="custom-select w-100" id="inlineFormCustomSelect" v-model="menus.sprint.length">
              <option selected value="">None</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">60 min</option>
              <option value="custom">Custom</option>
            </select>
            <div class="input-group mt-2" v-if="menus.sprint.length == 'custom'">
              <input  class="form-control form-control bg-dark" value="0"/>
              <div class="input-group-append">
                <div class="input-group-text bg-purple-light text-light">min</div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-sm-5 text-left">
            <label class="mr-sm-2" for="inlineFormCustomSelect">Notifications</label>
          </div>
          <div class="col-sm-7">
            <select class="custom-select w-100" id="inlineFormCustomSelect">
              <option selected value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      recording: state => state.recording,
      toolbar: state => state.toolbar,
    }),
    timeEntries () {
      return this.$store.state.timeEntries;
    }
  },
  created: function () {
    console.log(this.$store.state.toolbar.title)
    this.timer = setInterval(this.getTotalTime, 1000)
  },
  data () {
    return {
      showNotificationPane: false,
      showStopwatchPane: false,
      menus: {
        sprint: {
          length: '',
        }
      }
    }
  },

  methods: {
    alert: function(message) {
      alert(message)
    },
    pressRecord: function() {
      this.$store.commit('toggleRecording')
    },
    clearToolbar: function(toolbar) {
      this.$store.commit('clearToolbarTitle')
    },
    updateToolbarTitle: function(e) {
      this.$store.commit('updateToolbarTitle', e.target.value)
    },
    getTotalTime: function () {
      if(this.recording) {
        // console.log(this.$store.state.toolbar.startTime)
        // console.log(this.$moment(new Date()))
        var startTime = this.$moment(this.toolbar.startTime).unix()
        var endTime = this.$moment(this.toolbar.currentTime).unix()
        var diff = endTime - startTime
        var result = this.$moment.utc(this.$moment.duration(diff,'seconds')).format("hh:mm:ss")
        console.log(diff + ' ' + result)
        this.$store.commit('updateToolbarTime', diff)
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="scss">
  .form-control {
    background-color: #2E2A58;
    border-color: transparent;
    color: #88FF81;
  }

  .toolbar {
    bottom: 0;
    width: 100%;
    background-color: #1f1e43;
    z-index: 50;

    @media screen and (max-width: 540px) {

    }
    .form-control {
      font-size: 1rem;
    }
  }

  .btn-toolbar {
    background-color: #1f1e43;
    position: relative;
    z-index: 80;

    .btn-group {
      // &.main {
        .btn {
          min-width: 55px;
        }
      // }
    }
  }

  .menu-popup {
    background-color: $c-purple-mid;
    position: absolute;
    bottom: 0;

    width: 320px;
    transition: all 0.4s ease-in-out;
    border: 1px solid #1f1e43;
    opacity: 0;
    pointer-events: none;

    &.active {
      opacity: 1;
      bottom: 100px;
      pointer-events: all;

      &:after {
        opacity: 1;
      }
    }

    &.delete {
      right: 15px;
    }

    &.stopwatch {
      &:after {
        left: 65px;
      }
    }

    &:after {
      content: '';
      width: 32px;
      height: 32px;
      background: $c-purple-mid;
      transform: rotateZ(45deg);
      position: absolute;
      z-index: 200;
      opacity: 0;
      transition: opacity 0.4s ease-in-out;
      transition-delay: 0.2s;
    }

    .custom-select {
      background-color: $c-purple-dark;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%2388FF81' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e");
      color: $c-primary;
      border: transparent;
    }
  }
</style>
