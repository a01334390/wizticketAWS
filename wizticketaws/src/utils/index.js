import format from 'date-fns/format'
export const convertPesosToCents = price => (price * 100).toFixed(0)
export const formatProductDate = date => format(date,"Do MMM, YYYY")
export const formatOrder = date => format(date, "ddd h:mm A, Do MMM, YYYY")