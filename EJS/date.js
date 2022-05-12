exports.getDate = () => {
  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }
  
  return new Date().toLocaleDateString('en-US', dateOptions)
}

exports.getDay = () => {
  return new Date().toLocaleString('en-US', {weekday: 'long'})
}