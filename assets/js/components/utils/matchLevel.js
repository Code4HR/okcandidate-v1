function getThirds(total) {
  return total / 3 % 1 === 0 ? total / 3 : Math.round(total / 3)
}

function getMatchLevel(answered, total) {

  const third = getThirds(total)
  const remaining = total - answered

  const result = {
    level: 0,
    mood: ':(',
    text: `${remaining} question${remaining === 1 ? '' : 's'} remaining`,
    progress: Math.round((answered / total) * 100)
  }

  if (total === 0) {
    return result
  }

  if (answered >= third && answered < (2 * third)) {
    return Object.assign({}, result, {
      level: 1,
      mood: 'OK!'
    })
  }

  else if (answered >= (2 * third) && answered < total) {
    return Object.assign({}, result, {
      level: 2,
      mood: 'Good!'
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
