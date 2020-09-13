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

export function getLocal(key) {
  return localStorage.getItem(key)
}

export function removeLocal(key) {
  localStorage.removeItem(key)
}