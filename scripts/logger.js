const logger = (() => {
  const logTotalClicks = () => {
    console.log('LOGGER -> total clicks:', trainer.getTotalClicks())
  }

  const logTempo = () => {
    console.log('LOGGER -> tempo:', metronome.getTempo())
  }

  return {
    logTotalClicks,
    logTempo
  }
})()