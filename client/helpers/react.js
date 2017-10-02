import moment from 'moment'

export const getValue = (context, selector) => context
  .querySelector(selector).value

export const setValue = (context, selector, value) => {
  context.querySelector(selector).value = value
}

export const isChecked = (context, selector) => context
  .querySelector(selector).checked

export const formatLastUpdate = (date, style = 'short') => {
  if (date) {
    const dateObject = moment(date)

    return {
      month: dateObject.format((style === 'short') ? 'MMM' : 'MMMM'),
      day: dateObject.format((style === 'short') ? 'DD' : 'Do'),
      year: dateObject.format('YYYY')
    }
  }

  return false
}
