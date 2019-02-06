<template>
  <li class="list-group-item d-flex p-2 align-items-center">
    <div class="form-group mb-0 flex-fill mr-2">
      <label for="inputTask" class="sr-only">Entry Title</label>
      <input type="text" class="form-control" v-model="title" readonly>
    </div>
    <div class="form-group row align-items-center mb-0 ml-auto">
      <label for="inputPassword2" class="sr-only">Time Amount</label>
      <label for="" class="mb-0"><fa icon="clock"/></label>
      <div class="col-sm-10">
        <input type="text" class="form-control input-time-amount"  placeholder="Time Amount" readonly v-model="timeFormatted">
      </div>
    </div>
    <div class="btn-group" role="group" aria-label="First group">
      <!-- <button type="button" class="btn"><fa icon="circle"  /></button> -->
      <button type="button" class="btn "><fa icon="pen"/></button>
      <button type="button" class="btn"><fa icon="dollar-sign"/></button>
      <!-- <button type="button" class="btn">4</button> -->
    </div>
  </li>
</template>

<script>
export default {
  props: ['title','startTime','endTime', 'timeAmount'],
  computed: {
    timeFormatted () {
      let amount = this.timeAmount
      // days = parseInt(timeRemaining / 86400);
      // timeRemaining = (timeRemaining % 86400);

      let hours = parseInt(amount / 3600);
      if (hours < 10) { hours = this.zeroPad(hours, 2) }
      amount = (amount % 3600);

      let minutes = parseInt(amount / 60);
      if (minutes < 10) { minutes = this.zeroPad(minutes, 2) }
      amount = (amount % 60);

      let seconds = parseInt(amount);
      if (seconds < 10) { seconds = this.zeroPad(seconds, 2) }
      return hours + ":" + minutes + ":" + seconds
    }
  },
  methods: {
    zeroPad: function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    }
  }
}
</script>

<style lang="scss">

.list-group-item {
  background: $c-purple-mid;

  svg path {
    fill: $c-primary;
  }

  .input-time-amount {

  }

}

.form-control,
.form-control[readonly] {
  background: $c-purple-mid;
  color: $c-primary;
  border-color: transparent;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0);
  transition: all 0.5s ease-in-out;

  &:hover,
  &:focus {
    border-color: #3a4047;
    background: $c-purple-mid;
    color: $c-primary;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
}


</style>
