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

bpm.addEventListener('input', () => {
  metronome.setTempo(parseInt(bpm.value))
  bpmRange.value = metronome.getTempo()
  view.update()
})

bpmRange.addEventListener('input', () => {
  metronome.setTempo(parseInt(bpmRange.value))
  bpm.value = metronome.getTempo()
  view.update()
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

plusOne.addEventListener('click', () => {
  metronome.setTempo(metronome.getTempo() + 1)
  bpm.value = metronome.getTempo()
  bpmRange.value = metronome.getTempo()
  view.update()
})

plusFive.addEventListener('click', () => {
  metronome.setTempo(metronome.getTempo() + 5)
  bpm.value = metronome.getTempo()
  bpmRange.value = metronome.getTempo()
  view.update()
})

minusOne.addEventListener('click', () => {
  metronome.setTempo(metronome.getTempo() - 1)
  bpm.value = metronome.getTempo()
  bpmRange.value = metronome.getTempo()
  view.update()
})

minusFive.addEventListener('click', () => {
  metronome.setTempo(metronome.getTempo() - 5)
  bpm.value = metronome.getTempo()
  bpmRange.value = metronome.getTempo()
  view.update()
})