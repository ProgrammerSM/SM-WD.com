import {
  useEffect,
  useState,
} from 'react'

const browserStorageApis = ['localStorage', 'sessionStorage']
export default function useBrowserStorage(key, initialValue, options = {}) {
  const {
    resetToInitial = false,
    storageApi = 'localStorage',
  } = options

  if (!browserStorageApis.includes(storageApi))
    throw new Error(`${storageApi} is not a balid storage api`)

  const storage = typeof window === 'undefined' ? null : window[storageApi]
  const localStorageValue = storage?.getItem(key)
  let init
  try {
    init = (localStorageValue && !resetToInitial) ? JSON.parse(localStorageValue) : initialValue
  } catch {
    init = initialValue
  }

  const [storedValue, setStoredValue] = useState(init)
  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.log(error)
    }
  }, [
    storedValue,
    key,
    storage,
  ])

  return [storedValue, setStoredValue]
}
