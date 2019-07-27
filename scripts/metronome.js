const metronome = (() => {
  const audio = $('#click-sound')
  const minBpm = 20
  const maxBpm = 220
  let isActive = false
  let timer = null
  let tempo = 120
  let t1 = null

  const getStatus = () => {
    return isActive
  }

  const getMinBpm = () => {
    return minBpm
  }

  const getMaxBpm = () => {
    return maxBpm
  }

  const getTempo = () => {
    return tempo
  }

  const setTempo = (newTempo) => {
    if (tempo === maxBpm && newTempo >= maxBpm) return
    if (tempo === minBpm && newTempo <= minBpm) return

    if (newTempo > maxBpm) {
      tempo = maxBpm
    } else if (newTempo < minBpm) {
      tempo = minBpm 
    } else {
      tempo = newTempo
    }

    console.log('TEMPO CHANGE')
    logger.logTempo()

    pubSub.publish('metronome-tempo-change', tempo)
  }

  const click = () => {
    audio.play()
    
    pubSub.publish('metronome-click')
  }

  const play = () => {
    click()
    t1 = Date.now()

    timer = setTimeout(() => {
      console.log(Date.now() - t1)
      play()
    }, 60000 / tempo)
  }
  
  const start = () => {
    isActive = true
    play()

    pubSub.publish('metronome-start')
  }

  const stop = () => {
    isActive = false
    clearInterval(timer)

    pubSub.publish('metronome-stop')
  }

  return {
    getStatus,
    getMinBpm,
    getMaxBpm,
    getTempo,
    setTempo,
    start,
    stop
  }
})()