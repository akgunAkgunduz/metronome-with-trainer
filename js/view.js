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

    tempoDisplay.innerText = metronome.tempo

    tempoMarkingsDiv.innerText = tempoMarkings.name(metronome.tempo)

    console.log(Object.keys(tempoMarkings.names))
    Object.keys(tempoMarkings.names).forEach(tempoMarking => {
      const newOption = document.createElement('option')
      newOption.value = tempoMarking
      newOption.textContent = tempoMarking

      tempoMarkingsDiv2.querySelector('select').appendChild(newOption)
      
    })
  },
  initTempoMarkingsSelect (){
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
    tempoMarkingsSelect.querySelector('option[value="' + tempoMarkings.name(metronome.getTempo()) + '"]').selected = true
    M.FormSelect.init(document.querySelector('#tempoMarkingsSelect'));
  }
}