document.addEventListener('DOMContentLoaded', function() {
  view.init()

  M.AutoInit()

  M.Modal.init(document.getElementById('tempoModal'), {
    onOpenEnd: function() {
      tempoInput.focus()
    }
  })
  
  view.initTempoMarkingsSelect()
})