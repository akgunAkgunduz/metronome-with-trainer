const view = (() => {
  const minusFiveButton = $('#minus-five')
  const minusOneButton = $('#minus-one')
  const bpm = $('#bpm')
  const plusOneButton = $('#plus-one')
  const plusFiveButton = $('#plus-five')
  const tempoMarking = $('#tempo-marking')
  const bpmSlider = $('#bpm-slider')
  const playStopButton = $('#play-stop-button')
  const playStopIcon = $('#play-stop-icon')
  const trainerToggle = $('#trainer-toggle')
  const increment = $('#increment')
  const period = $('#period')
  const incrementDisplay = $('#increment-display')
  const incrementUnit = $('#increment-unit')
  const periodDisplay = $('#period-display')
  const periodUnit = $('#period-unit')
  const incrementMinus = $('#increment-minus')
  const incrementPlus = $('#increment-plus')
  const periodMinus = $('#period-minus')
  const periodPlus = $('#period-plus')
  const incrementValue = $('#increment-value')
  const periodValue = $('#period-value')
  const trainerAnimation = $('#trainer-animation')
  const trainerAnimationProgress = $('#trainer-animation-progress')
  const trainerAnimationProgressNumber = $('#trainer-animation-progress-number')

  const init = () => {
    const metronomeInfo = controller.provideMetronomeInfo()
    const trainerInfo = controller.provideTrainerInfo()

    const { metronomeTempo, metronomeMinBpm, metronomeMaxBpm } = metronomeInfo
    const { trainerStatus, trainerPeriod, trainerIncrement } = trainerInfo

    bpm.innerText = metronomeTempo
    tempoMarking.innerText = tempoMarkings.getTerm(metronomeTempo)
    bpmSlider.min = metronomeMinBpm
    bpmSlider.max = metronomeMaxBpm
    bpmSlider.value = metronomeTempo

    trainerToggle.checked = trainerStatus
    period.value = trainerPeriod
    increment.value = trainerIncrement

    incrementDisplay.innerText = trainerIncrement
    periodDisplay.innerText = trainerPeriod
    incrementValue.innerText = trainerIncrement
    periodValue.innerText = trainerPeriod

    trainerStatus ? disableTrainerControls() : enableTrainerControls()

    updateTrainerUnits()

    setUpEventListeners()
    setUpSubscriptions()
  }

  const updatePlayStopButton = (isActive) => {
    playStopIcon.innerText = isActive ? 'stop' : 'play_arrow'
  }

  const syncTempo = (tempo) => {
    bpm.innerText = tempo
    tempoMarking.innerText = tempoMarkings.getTerm(tempo)
    bpmSlider.value = tempo
  }

  const updateTrainerUnits = () => {
    const { trainerIncrement, trainerPeriod } = controller.provideTrainerInfo()

    trainerIncrement > 1 ? incrementUnit.innerText = ' BPMs' : incrementUnit.innerText= ' BPM'
    trainerPeriod > 1 ? periodUnit.innerText = ' clicks' : periodUnit.innerText= ' click'
  }

  const disableTrainerControls = () => {
    const { metronomeStatus } = controller.provideMetronomeInfo()
    const { trainerStatus } = controller.provideTrainerInfo()

    if (metronomeStatus && trainerStatus) {
      increment.disabled = true
      period.disabled = true
      incrementMinus.disabled = true
      incrementPlus.disabled = true
      periodMinus.disabled = true
      periodPlus.disabled = true
    }
  }

  const enableTrainerControls = () => {
    increment.disabled = false
    period.disabled = false
    incrementMinus.disabled = false
    incrementPlus.disabled = false
    periodMinus.disabled = false
    periodPlus.disabled = false
  }

  const animateTrainer = (number) => {
    const containerWidth = trainerAnimation.offsetWidth
    const { trainerPeriod } = controller.provideTrainerInfo()
    if (number === 0) number = trainerPeriod
    trainerAnimationProgress.style.width =  `${containerWidth * number / trainerPeriod}px`
    trainerAnimationProgressNumber.innerText = number
  }

  const resetTrainerAnimation = () => {
    trainerAnimationProgress.style.width = 0
    trainerAnimationProgressNumber.innerText = ''
  }

  const handleMinusFiveButtonClick = () => {
    controller.changeMetronomeTempo(-5)
    pubSub.publish('tempo-change-by-ui')
  }

  const handleMinusOneButtonClick = () => {
    controller.changeMetronomeTempo(-1)
    pubSub.publish('tempo-change-by-ui')
  }

  const handlePlusOneButtonClick = () => {
    controller.changeMetronomeTempo(1)
    pubSub.publish('tempo-change-by-ui')
  }

  const handlePlusFiveButtonClick = () => {
    controller.changeMetronomeTempo(5)
    pubSub.publish('tempo-change-by-ui')
  }

  const handleBpmSliderInput = (e) => {
    controller.updateMetronomeTempo(parseInt(e.target.value))
    pubSub.publish('tempo-change-by-ui')
  }

  const handlePlayStopButtonClick = () => {
    controller.toggleMetronome()
  }

  const handleTrainerToggleClick = () => {
    controller.toggleTrainer()
  }

  const handleIncrementInput = (e) => {
    controller.updateTrainerIncrement(parseInt(e.target.value))
    incrementDisplay.innerText = e.target.value
    incrementValue.innerText = e.target.value
    updateTrainerUnits()
  }
  
  const handlePeriodInput = (e) => {
    controller.updateTrainerPeriod(parseInt(e.target.value))
    periodDisplay.innerText = e.target.value
    periodValue.innerText = e.target.value
    updateTrainerUnits()
  }

  const handleIncrementMinusClick = () => {
    increment.value = parseInt(increment.value) - 1
    controller.updateTrainerIncrement(parseInt(increment.value))
    incrementDisplay.innerText = increment.value
    incrementValue.innerText = increment.value
    updateTrainerUnits()
  }

  const handleIncrementPlusClick = () => {
    increment.value = parseInt(increment.value) + 1
    controller.updateTrainerIncrement(parseInt(increment.value))
    incrementDisplay.innerText = increment.value
    incrementValue.innerText = increment.value
    updateTrainerUnits()
  }

  const handlePeriodMinusClick = () => {
    period.value = parseInt(period.value) - 1
    controller.updateTrainerPeriod(parseInt(period.value))
    periodDisplay.innerText = period.value
    periodValue.innerText = period.value
    updateTrainerUnits()
  }

  const handlePeriodPlusClick = () => {
    period.value = parseInt(period.value) + 1
    controller.updateTrainerPeriod(parseInt(period.value))
    periodDisplay.innerText = period.value
    periodValue.innerText = period.value
    updateTrainerUnits()
  }


  const setUpEventListeners = () => {
    minusFiveButton.addEventListener('click', handleMinusFiveButtonClick)
    minusOneButton.addEventListener('click', handleMinusOneButtonClick)
    plusOneButton.addEventListener('click', handlePlusOneButtonClick)
    plusFiveButton.addEventListener('click', handlePlusFiveButtonClick)
    bpmSlider.addEventListener('input', handleBpmSliderInput)
    playStopButton.addEventListener('click', handlePlayStopButtonClick)    
    trainerToggle.addEventListener('click', handleTrainerToggleClick)    
    increment.addEventListener('input', handleIncrementInput)
    period.addEventListener('input', handlePeriodInput)
    incrementMinus.addEventListener('click', handleIncrementMinusClick)
    incrementPlus.addEventListener('click', handleIncrementPlusClick)
    periodMinus.addEventListener('click', handlePeriodMinusClick)
    periodPlus.addEventListener('click', handlePeriodPlusClick)
  }

  const setUpSubscriptions = () => {
    pubSub.subscribe('metronome-tempo-change', syncTempo)
    pubSub.subscribe('metronome-start', disableTrainerControls)
    pubSub.subscribe('metronome-stop', enableTrainerControls)
    pubSub.subscribe('metronome-stop', resetTrainerAnimation)
    pubSub.subscribe('trainer-modulus', animateTrainer)
    pubSub.subscribe('trainer-deactivate', resetTrainerAnimation)
    pubSub.subscribe('trainer-deactivate', enableTrainerControls)
    pubSub.subscribe('trainer-activate', disableTrainerControls)
  }

  return {
    init,
    updatePlayStopButton
  }
})()