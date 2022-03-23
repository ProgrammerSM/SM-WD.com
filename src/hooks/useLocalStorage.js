import {
  useEffect,
  useState,
} from 'react'

const parseLocalStorage = (key, fallback) => {
  if (typeof window === 'undefined')
    return fallback

  const localStorageValue = window.localStorage.getItem(key)

  if (!localStorageValue)
    return fallback

  try {
    return JSON.parse(localStorageValue)
  } catch {
    return fallback
  }
}

export default function useLocalStorage(key, initialValue) {

  const init = parseLocalStorage(key, initialValue)
  const [storedValue, setStoredValue] = useState(init)

  useEffect(() => {
    setTimeout(() => {
      setStoredValue(parseLocalStorage(key, initialValue))
    }, 100)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.log(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
