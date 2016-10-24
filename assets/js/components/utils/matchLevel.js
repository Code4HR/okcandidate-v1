function getThirds(total) {
  return total / 3 % 1 === 0 ? total / 3 : Math.round(total / 3)
}

function getMatchLevel(answered, total) {

  const third = getThirds(total)

  const result = {
    level: 0,
    mood: ':(',
    text: `Answer ${third - answered % third} questions for an OK rating`,
    progress: Math.round(answered % third / third * 100)
  }

  if (total === 0) {
    return result
  }

  if (answered >= third && answered < (2 * third)) {
    return Object.assign({}, result, {
      level: 1,
      mood: 'OK!',
      text: `Answer ${third - answered % third} questions for a good rating`
    })
  }

  else if (answered >= (2 * third) && answered < total) {
    return Object.assign({}, result, {
      level: 2,
      mood: 'Good!',
      text: `Answer ${total - answered} questions for the best rating`
    })
  }

  else if (answered === total) {
    return Object.assign({}, result, {
      level: 3,
      mood: 'Best!',
      text: 'Good to go!',
      progress: 100
    })
  }

  else {
    return result
  }

}

module.exports = {
  getMatchLevel,
  getThirds
}
