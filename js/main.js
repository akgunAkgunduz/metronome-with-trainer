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
    audio.play()
    let t1 = performance.now()
    this.setClickCount(this.getClickCount() + 1)

    if (this.getClickCount() % trainer.period === 0) {
      this.setTempo(this.getTempo() + trainer.increment)
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
  // active: true,
  period: 4,
  break: 0,
  increment: 10
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav')
  var instances = M.Sidenav.init(elems)
})