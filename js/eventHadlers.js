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
const tempoMarkingsSelect = document.getElementById('tempoMarkingsSelect')

bpm.addEventListener('input', () => {
  metronome.setTempo(parseInt(bpm.value))
  view.update()
  view.updateTempoMarkingsSelect()

})

bpmRange.addEventListener('input', () => {
  metronome.setTempo(parseInt(bpmRange.value))
  view.update()
  view.updateTempoMarkingsSelect()
})

start.addEventListener('click', () => {
  metronome.tick()
  start.classList.toggle('hide')
  stop.classList.toggle('hide')
  tempoMarkingsSelect.disabled = true
  view.updateTempoMarkingsSelect()
})

stop.addEventListener('click', () => {
  metronome.stop()
  start.classList.toggle('hide')
  stop.classList.toggle('hide')
  tempoMarkingsSelect.disabled = false
  view.updateTempoMarkingsSelect()  
})

tempoMarkingsSelect.addEventListener('change', () => {
  metronome.setTempo(tempoMarkings.names[tempoMarkingsSelect.value].min)
  view.update()
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
  if (metronome.getTempo() < metronome.maxTempo) {
    metronome.setTempo(metronome.getTempo() + 1)
    bpm.value = metronome.getTempo()
    bpmRange.value = metronome.getTempo()
    view.update()
    view.updateTempoMarkingsSelect()
  }
})

plusFive.addEventListener('click', () => {
  if (metronome.getTempo() < metronome.maxTempo - 5) {
    metronome.setTempo(metronome.getTempo() + 5)
  } else {
    metronome.setTempo(metronome.maxTempo)
  }
  bpm.value = metronome.getTempo()
  bpmRange.value = metronome.getTempo()
  view.update()
  view.updateTempoMarkingsSelect()
})

minusOne.addEventListener('click', () => {
  if (metronome.getTempo() > metronome.minTempo) {
    metronome.setTempo(metronome.getTempo() - 1)
    bpm.value = metronome.getTempo()
    bpmRange.value = metronome.getTempo()
    view.update()
    view.updateTempoMarkingsSelect()
  }
})

minusFive.addEventListener('click', () => {
  if (metronome.getTempo() > metronome.minTempo + 5) {
    metronome.setTempo(metronome.getTempo() - 5)
  } else {
    metronome.setTempo(metronome.minTempo)
  }
  bpm.value = metronome.getTempo()
  bpmRange.value = metronome.getTempo()
  view.update()
  view.updateTempoMarkingsSelect()
})