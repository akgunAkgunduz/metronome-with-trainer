const trainer = (() => {
  let isActive = false
  let period = 4
  let increment = 1
  let totalClicks = 0

  const getStatus = () => {
    return isActive
  }

  const activate = () => {
    isActive = true
  }

  const deactivate = () => {
    isActive = false

    resetTotalClicks()
  }

  const toggleStatus = () => {
    if (isActive) {
      deactivate()
      pubSub.publish('trainer-deactivate')
    } else {
      activate()
      pubSub.publish('trainer-activate')
    }
  }

  const getPeriod = () => {
    return period
  }

  const setPeriod = (newPeriod) => {
    period = newPeriod
  }

  const getIncrement = () => {
    return increment
  }

  const setIncrement = (newIncrement) => {
    increment = newIncrement
  }

  const getTotalClicks = () => {
    return totalClicks
  }

  const calculateTotalClicks = () => {
    totalClicks++
  }

  const resetTotalClicks = () => {
    totalClicks = 0
  }  

  const regulateMetronome = () => {
    if (isActive) {
      calculateTotalClicks()

      pubSub.publish('trainer-modulus', (totalClicks % period))

      logger.logTotalClicks()
      
      if (period === 1  && totalClicks > 1) {
        metronome.setTempo(metronome.getTempo() + increment)
      } else {
        if (totalClicks % period === 1 && totalClicks > 1) {
          metronome.setTempo(metronome.getTempo() + increment)
        }
      }
    }
  }

  const setUpSubscriptions = () => {
    pubSub.subscribe('metronome-click', regulateMetronome)
    pubSub.subscribe('metronome-stop', resetTotalClicks)
    pubSub.subscribe('tempo-change-by-ui', resetTotalClicks)
  }

  return {
    getStatus,
    activate,
    deactivate,
    toggleStatus,
    getPeriod,
    setPeriod,
    getIncrement,
    setIncrement,
    getTotalClicks,
    setUpSubscriptions
  }
})()