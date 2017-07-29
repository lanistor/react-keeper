
export function log(...args) {
  if(console) {
    console.log(...args)
  }
}

export function warn(...args) {
  if(console) {
    console.warn(...args)
  }
}

export function error(...args) {
  if(console) {
    console.error(...args)
  }
}

export default {
  log,
  warn,
  error
}
