const store = (() => {
  const setBpm = () => localStorage.setItem('bpm', metronome.getTempo())
  const setTrainerStatus = () => localStorage.setItem('trainer-status', trainer.getStatus())
  const setTrainerIncrement = () => localStorage.setItem('trainer-increment', trainer.getIncrement())
  const setTrainerPeriod = () => localStorage.setItem('trainer-period', trainer.getPeriod())

  const setUpSubscriptions = () => {
    pubSub.subscribe('metronome-tempo-change', setBpm)
    pubSub.subscribe('trainer-activate', setTrainerStatus)
    pubSub.subscribe('trainer-deactivate', setTrainerStatus)
    pubSub.subscribe('trainer-increment-change', setTrainerIncrement)
    pubSub.subscribe('trainer-period-change', setTrainerPeriod)
  }

  return {
    setUpSubscriptions
  }
})()