const bpm = document.getElementById('bpm')
const bpmRange = document.getElementById('bpmRange')
const start = document.getElementById('start')
const stop = document.getElementById('stop')
const clickCounter = document.getElementById('clickCounter')
const breakCounter = document.getElementById('breakCounter')
const increment = document.getElementById('increment')
const period = document.getElementById('period')
const limit = document.getElementById('limit')
const tBreak = document.getElementById('tBreak')

let metronome =  {
  isActive: false,
  sound: audio,
  tempo: 60,
  minTempo: 20,
  maxTempo: 300,
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
    if ((trainer.break > 0) && (trainer.breakCounter < trainer.break) && (this.getClickCount() % trainer.period === 0) && (metronome.getClickCount() > 0) && (this.isActive == true)) {
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
    this.isActive = true
    let t1 = performance.now()
    this.setClickCount(this.getClickCount() + 1)
    view.update()

    if (trainer.break == 0) {
      if ((this.getClickCount() % trainer.period === 0) && (this.getTempo() < trainer.limit) && (trainer.breakCounter == 0)) {
        if (this.getTempo() + trainer.increment > trainer.limit) {
          this.setTempo(trainer.limit)
        } else {
          this.setTempo(this.getTempo() + trainer.increment)
        }
      }
    } else {
      if ((this.getClickCount() % trainer.period === 0) && (this.getTempo() < trainer.limit) && (trainer.breakCounter == trainer.break)) {
        if (this.getTempo() + trainer.increment > trainer.limit) {
          this.setTempo(trainer.limit)
        } else {
          this.setTempo(this.getTempo() + trainer.increment)
        }
      }
    }

    this.timer = setTimeout(() => {
      console.log(performance.now() - t1)
      this.tick()
    }, 60000 / this.getTempo())
  },
  stop() {
    clearInterval(this.timer)
    this.isActive = false
    this.setClickCount(0)
    trainer.breakCounter = 0
    view.update()
  }
}

let trainer = {
  isActive: true,
  preCount: false,
  period: 16,
  break: 0,
  breakCounter: 0,
  isOnBreak: false,
  increment: 1,
  limit: 280
}

let view = {
  clickCount: 0,
  init() {
    bpm.value = metronome.tempo
    bpm.min = metronome.minTempo
    bpm.max = metronome.maxTempo

    bpmRange.value = metronome.tempo
    bpmRange.min = metronome.minTempo
    bpmRange.max = metronome.maxTempo

    limit.value = metronome.maxTempo
    limit.min = metronome.minTempo + 1
    limit.max = metronome.maxTempo
  },
  update() {
    bpm.value = metronome.getTempo()
    bpmRange.value = metronome.getTempo()

    view.clickCount = metronome.clickCount % trainer.period
    if (view.clickCount == 0 && metronome.isActive) {
      view.clickCount = trainer.period
    } 
    clickCounter.textContent = view.clickCount
    breakCounter.textContent = trainer.breakCounter
  }
}

document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit()
  view.init()

  bpm.addEventListener('input', () => {
    metronome.setTempo(parseInt(bpm.value))
    bpmRange.value = metronome.getTempo()
  })

  bpmRange.addEventListener('input', () => {
    metronome.setTempo(parseInt(bpmRange.value))
    console.log(metronome.getTempo())
    bpm.value = metronome.getTempo()
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

  increment.addEventListener('input', () => {
    trainer.increment = parseInt(increment.value)
  })

  period.addEventListener('input', () => {
    trainer.period = parseInt(period.value)
  })

  limit.addEventListener('input', () => {
    trainer.limit = parseInt(limit.value)
  })

  tBreak.addEventListener('input', () => {
    trainer.break = parseInt(tBreak.value)
  })
})