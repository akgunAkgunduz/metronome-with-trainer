let metronome =  {
  active: false,
  sound: audio,
  tempo: 60,
  clickCount: 0,
  timer: null,
  getTempo() {
    return this.tempo
  },
  setTempo(newTempo) {
    this.tempo = newTempo
    console.log(this.tempo) 
  },
  getClickCount() {
    return this.clickCount
  },
  setClickCount(newClickCount) {
    this.clickCount = newClickCount
  },
  tick() {
    if (
        (trainer.break > 0) && 
        (trainer.breakCounter < trainer.break) && 
        (this.getClickCount() % trainer.period === 0) && 
        (metronome.getClickCount() > 0)
    ) {
      trainer.breakCounter++
      trainer.isOnBreak = true
      metronome.setClickCount(metronome.getClickCount() - 1)
      audio.volume = 0
      console.log('BREAK')
    } else {
      audio.volume = 1
      trainer.breakCounter = 0
      trainer.isOnBreak = false
    }

    audio.play()
    this.active = true
    let t1 = performance.now()
    this.setClickCount(this.getClickCount() + 1)

    if (trainer.break == 0) {
      if ((this.getClickCount() % trainer.period === 0) && (this.getTempo() < trainer.limit) && (trainer.breakCounter == 0)) {
        this.setTempo(this.getTempo() + trainer.increment)
      }
    } else {
      if ((this.getClickCount() % trainer.period === 0) && (this.getTempo() < trainer.limit) && (trainer.breakCounter == trainer.break)) {
        this.setTempo(this.getTempo() + trainer.increment)
      }
    }

    this.timer = setTimeout(() => {
      console.log(performance.now() - t1)
      this.tick()
    }, 60000 / this.getTempo())
  },
  stop() {
    clearInterval(this.timer)
    trainer.breakCounter = 0
    this.active = false
  }
}

let trainer = {
  active: true,
  preCount: false,
  period: 4,
  break: 2,
  breakCounter: 0,
  isOnBreak: false,
  increment: 1,
  limit: 280
}

document.addEventListener('DOMContentLoaded', function() {
  const stop = document.getElementById('stop')

  M.AutoInit()

  bpm.addEventListener('input', (e) => {
    metronome.setTempo(e.target.value)
    bpmRange.value = e.target.value
  })

  bpmRange.addEventListener('input', (e) => {
    metronome.setTempo(e.target.value)
    bpm.value = e.target.value
  })

  start.addEventListener('click', () => {
    metronome.tick()
    start.classList.toggle('hide')
    stop.classList.toggle('hide')   
  })

  stop.addEventListener('click', () => {
    metronome.stop()
    start.classList.toggle('hide')
    stop.classList.toggle('hide')   
  })
})