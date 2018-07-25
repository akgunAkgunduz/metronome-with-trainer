let metronome =  {
  tempo: 60,
  sound: audio,
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
  }
}

let trainer = {
  active: true,
  preCount: false,
  period: 4,
  break: 2,
  breakCounter: 0,
  isOnBreak: false,
  increment: 10,
  limit: 120
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav')
  var instances = M.Sidenav.init(elems)
})