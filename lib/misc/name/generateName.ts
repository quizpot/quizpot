import animals from "./animals.json"
import additives from "./additives.json"

export const generateName = () => {
  const animal = animals[Math.floor(Math.random() * animals.length)]
  const additive = additives[Math.floor(Math.random() * additives.length)]

  return `${additive}${animal}`
}