import { Message } from 'element-ui'

export function tips(message, type) {
  Message({
    message,
    type,
    duration: 2000
  })
}

export function setLocal(key, value) {
  localStorage.setItem(key, value)
}