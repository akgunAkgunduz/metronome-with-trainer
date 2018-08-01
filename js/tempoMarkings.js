const tempoMarkings = {
  name: function(tempo) {
    // console.log(this)
    for (name in this.names) {
      // console.log(name)
      if (tempo >= this.names[name].min && tempo <= this.names[name].max) {
        // console.log('found:', name)
        return name
      }
    }
  },
  names: {
    "Larghissimo": { 
      min: 1,
      max: 19,
      desc: "very, very slow" 
    },
    "Grave": {
      min: 20,
      max: 39,
      desc: "slow and solemn"
    },
    "Lento": {
      min: 40,
      max: 44,
      desc: "slowly"
    },
    "Largo": {
      min: 45,
      max: 49,
      desc: "wide"
    },
    "Larghetto": {
      min: 50,
      max: 54,
      desc: "quite broadly"
    },
    "Adagio": {
      min: 55,
      max: 64,
      desc: "slow and stately"
    },
    "Adagietto": {
      min: 65,
      max: 69,
      desc: "quite slow"
    },
    "Andante moderato": {
      min: 70,
      max: 72,
      desc: "a bit slower than andante"
    },
    "Andante": {
      min: 73,
      max: 77,
      desc: "at a walking pace"
    },
    "Andantino": {
      min: 78,
      max: 83,
      desc: "quite faster than andante (but some cases it means a bit slower than andante)"
    },
    "Marcia moderato": {
      min: 84,
      max: 85,
      desc: "moderately, in the style of a march"
    },
    "Moderato": {
      min: 86,
      max: 97,
      desc: "moderately"
    },
    "Allegretto": {
      min: 98,
      max: 109,
      desc: "moderately fast"
    },
    "Allegro": {
      min: 110,
      max: 131,
      desc: "fast, quickly and bright"
    },
    "Vivace": {
      min: 132,
      max: 139,
      desc: "lively and fast"
    },
    "Vivacissimo": {
      min: 140,
      max: 149,
      desc: "very fast and lively"
    },
    "Allegrissimo": {
      min: 150,
      max: 167,
      desc: "very fast"
    },
    "Presto": {
      min: 168,
      max: 177,
      desc: "extremely fast"
    },
    "Prestissimo": {
      min: 178,
      max: 300,
      desc: "even faster than Presto"
    }
  }  
}