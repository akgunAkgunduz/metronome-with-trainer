const controller = (() => {
  const provideMetronomeInfo = () => {
    return {
      metronomeStatus: metronome.getStatus(),
      metronomeTempo: metronome.getTempo(),
      metronomeMinBpm: metronome.getMinBpm(),
      metronomeMaxBpm: metronome.getMaxBpm()
     }
  }

  const provideTrainerInfo = () => {
    return { 
      trainerStatus: trainer.getStatus(),
      trainerPeriod: trainer.getPeriod(),
      trainerIncrement: trainer.getIncrement()
     }
  }

  const changeMetronomeTempo = (quantity) => {
    metronome.setTempo(metronome.getTempo() + quantity)
  }

  const updateMetronomeTempo = (newTempo) => {
    metronome.setTempo(newTempo)
  }

  const toggleMetronome = () => {
    metronome.getStatus() ? metronome.stop() : metronome.start()

    view.updatePlayStopButton(metronome.getStatus())
  }

  const toggleTrainer = () => {
    trainer.toggleStatus()
  }

  const updateTrainerPeriod = (newPeriod) => {
    trainer.setPeriod(newPeriod)
  }

  const updateTrainerIncrement = (newIncrement) => {
    trainer.setIncrement(newIncrement)
  }

  return {
    provideMetronomeInfo,
    provideTrainerInfo,
    changeMetronomeTempo,
    updateMetronomeTempo,
    toggleMetronome,
    toggleTrainer,
    updateTrainerPeriod,
    updateTrainerIncrement
  }
})()