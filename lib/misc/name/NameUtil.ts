import animals from "./animals.json"
import additives from "./additives.json"
import { Player } from "@/lib/server/managers/LobbyManager"

const generateName = () => {
  const animal = animals[Math.floor(Math.random() * animals.length)]
  const additive = additives[Math.floor(Math.random() * additives.length)]

  return `${additive}${animal}`
}

/**
 * Generates a unique name for a player
 * @param players List of players
 * @returns Unique name
 */
export const generateUniqueName = (players: Player[]): string | Error => {
  if (animals.length * additives.length === players.length) {
    return new Error("No unique names available")
  }

  const existingNames = new Set(players.map(player => player.name))

  let newName = generateName()

  while (existingNames.has(newName)) {
    newName = generateName()
  }

  return newName
}