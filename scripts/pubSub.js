const pubSub = (() => {
  const topics = {}

  const subscribe = (topicName, fn) => {
    topics[topicName] = topics[topicName] || []
    topics[topicName].push(fn)
  }

  const unsubscribe = (topicName, fn) => {
    if (topics[topicName]) {
      for (var i = 0; i < topics[topicName].length; i++) {
        if (topics[topicName][i] === fn) {
          topics[topicName].splice(i, 1)
          break
        }
      }
    }
  }

  const publish = (topicName, data) => {
    if (topics[topicName]) {
      topics[topicName].forEach((fn) => {
        fn(data)
      })
    }
  }

  return {
    topics,
    subscribe,
    unsubscribe,
    publish
  }
})()