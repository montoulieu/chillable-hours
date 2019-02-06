export const state = () => ({
  currentTime: new Date(),
  recording: false,
  toolbar: {
    title: '',
    startTime: '',
    endTime: '',
    timeAmount: ''
  },
  group: [
    {
      title: 'Spire Digital'
    }
  ],
  project: [
    {
      title: 'WOW',
      lastTimeWorkedOn: '',
      group: 0
    }
  ],
  timeEntries: [
    {
      title: 'Concepts and design',
      startTime: 'Tue Feb 05 2019 10:55:37 GMT-0700 (Mountain Standard Time)',
      endTime: 'Tue Feb 05 2019 13:55:37 GMT-0700 (Mountain Standard Time)',
      timeAmount: 314,
      visible: true
    },
    {
      title: 'Started work on chillable',
      startTime: 'Mon Feb 04 2019 14:55:37 GMT-0700 (Mountain Standard Time)',
      endTime: 'Mon Feb 04 2019 15:55:37 GMT-0700 (Mountain Standard Time)',
      timeAmount: 4700,
      visible: true
    },
    {
      title: 'Concepts and design',
      startTime: 'Fri Feb 01 2019 08:15:37 GMT-0700 (Mountain Standard Time)',
      endTime: 'Fri Feb 01 2019 13:55:37 GMT-0700 (Mountain Standard Time)',
      timeAmount: 18900,
      visible: true
    }
  ]
})

export const mutations = {
  getTime(state) {
    state.currentTime = new Date()
  },
  getTimeDiff(state) {
    // state
  },
  clearToolbarTitle(state) {
    state.toolbar.title = ''
  },
  updateToolbarTitle(state, title) {
    state.toolbar.title = title
  },
  toggleRecording(state) {
    if(state.recording) {
      state.toolbar.endTime = new Date()
      state.timeEntries.push({
        title: state.toolbar.title,
        startTime: state.toolbar.startTime,
        endTime: state.toolbar.endTime,
        timeAmount: state.toolbar.timeAmount,
        visible: true
      })

      state.toolbar.title = ''
      state.toolbar.startTime = ''
      state.toolbar.endTime = ''
      state.toolbar.timeAmount = 0
    } else {
      state.toolbar.startTime = new Date()
    }
    state.recording = !state.recording
  },
  updateToolbarTime(state, time) {
    state.toolbar.timeAmount = time
  }
}
