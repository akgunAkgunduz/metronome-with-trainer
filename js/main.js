let metronome =  {
  tempo: 60,
  sound: audio,
  timer: null,
  getTempo() {
    return this.tempo
  },
  setTempo(newTempo) {
    this.tempo = newTempo
    console.log(this.tempo) 
  },
  tick() {
    audio.play()
    let t1 = performance.now()
    this.timer = setTimeout(() => {
      this.tick()
      console.log(performance.now() - t1)
    }, 60000 / this.getTempo())
  },
  stop() {
    clearInterval(this.timer)
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav')
  var instances = M.Sidenav.init(elems)
})