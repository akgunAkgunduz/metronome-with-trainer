const tempoMarkings = (() => {
  const terms = {
    "Larghissimo": { 
      min: 1,
      max: 19
    },
    "Grave": {
      min: 20,
      max: 39
    },
    "Lento/Largo": {
      min: 40,
      max: 59
    },
    "Larghetto": {
      min: 60,
      max: 66
    },
    "Adagio": {
      min: 67,
      max: 76
    },
    "Andante": {
      min: 77,
      max: 107
    },
    "Moderato": {
      min: 108,
      max: 119
    },
    "Allegro": {
      min: 120,
      max: 155
    },
    "Vivace": {
      min: 156,
      max: 167
    },
    "Presto": {
      min: 168,
      max: 199
    },
    "Prestissimo": {
      min: 200,
      max: 300
    }
  }

  const getTerm = (tempo) => {
    for (term in terms) {
      if (tempo >= terms[term].min && tempo <= terms[term].max) {
        return term
      }
    }
  }

  return {
    getTerm
  }
})()