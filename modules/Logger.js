
export function log(...args) {
  if(console) {
    console.log(...args)
  }
}

export function warning(...args) {
  if(console) {
    console.warning(...args)
  }
}

export function error(...args) {
  if(console) {
    console.error(...args)
  }
}

export default {
  log,
  warning,
  error
}
