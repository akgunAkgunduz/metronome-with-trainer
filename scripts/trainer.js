const trainer = (() => {
  let isActive = localStorage.getItem('trainer-status') === null ? false : JSON.parse(localStorage.getItem('trainer-status'))
  let period = localStorage.getItem('trainer-period') ? parseInt(localStorage.getItem('trainer-period')) : 20
  let increment = localStorage.getItem('trainer-increment') ? parseInt(localStorage.getItem('trainer-increment')) : 1
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

    pubSub.publish('trainer-period-change')
  }

  const getIncrement = () => {
    return increment
  }

  const setIncrement = (newIncrement) => {
    increment = newIncrement

    pubSub.publish('trainer-increment-change')
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
      
      if (period === 1 && totalClicks > 1) {
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