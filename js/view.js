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

    increment.value = trainer.increment
    period.value = trainer.period
    tBreak.value = trainer.break

    tempoDisplay.innerText = metronome.tempo

    tempoMarkingsDiv.innerText = tempoMarkings.name(metronome.tempo)

    trainerSwitch.querySelector('input').checked = true
  },
  initTempoMarkingsSelect (){
    Object.keys(tempoMarkings.names).forEach(tempoMarking => {
      const newOption = document.createElement('option')
      newOption.value = tempoMarking
      newOption.textContent = tempoMarking + ' (' + tempoMarkings.names[tempoMarking].min + ' - ' + tempoMarkings.names[tempoMarking].max + ' BPM)'
      tempoMarkingsSelect.appendChild(newOption)      
    })
    this.updateTempoMarkingsSelect()
  },
  update() {
    bpm.value = metronome.getTempo()
    bpmRange.value = metronome.getTempo()
    tempoDisplay.innerText = metronome.getTempo()
    tempoMarkingsDiv.innerText = tempoMarkings.name(metronome.getTempo())    

    view.clickCount = metronome.clickCount % trainer.period
    if (view.clickCount == 0 && metronome.isActive) {
      view.clickCount = trainer.period
    } 
    clickCounter.textContent = view.clickCount
    breakCounter.textContent = trainer.breakCounter
  },
  updateTempoMarkingsSelect() {
    if (metronome.getStatus()) {
      tempoMarkingsSelect.disabled = true
    } else {
      tempoMarkingsSelect.disabled = false
    }
    tempoMarkingsSelect.querySelector('option[value="' + tempoMarkings.name(metronome.getTempo()) + '"]').selected = true
    M.FormSelect.init(document.querySelector('#tempoMarkingsSelect'))
  },
  updateStartStop() {
    if (metronome.getStatus()) {
      startStop.querySelector('i').innerText = 'stop'
      startStop.classList.remove('indigo')
      startStop.classList.remove('darken-4')
      startStop.classList.add('red')
      startStop.classList.add('darken-1')
    } else {
      startStop.querySelector('i').innerText = 'play_arrow'
      startStop.classList.remove('red')
      startStop.classList.remove('darken-1')
      startStop.classList.add('indigo')
      startStop.classList.add('darken-4')
    }
  },
  toggleTrainer() {
    if (trainerSwitch.querySelector('input').checked) {
      trainerDiv.style.height = '12rem'
    } else {
      trainerDiv.style.height = '4rem'
    }
  },
  showTempDiv() {
    tempDiv.style.display = 'grid'
  }
}