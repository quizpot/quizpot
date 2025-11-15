export type Color = "ghost" | "red" | "blue" | "yellow" | "green" | "purple" | "orange" | "pink" | "gray" | "darkgray" | "lightblue" | "black" | "white"

export const colors: Record<Color, { cls: string }> = {
  'ghost': { cls: 'shadow-black/20 bg-black/10 dark:bg-white/10 dark:shadow-white/5 text-black dark:text-white' },
  'red': { cls: 'bg-red-500 shadow-red-700 dark:bg-red-700 dark:shadow-red-900 text-white' },
  'blue': { cls: 'bg-blue-500 shadow-blue-700 dark:bg-blue-700 dark:shadow-blue-900 text-white' },
  'yellow': { cls: 'bg-yellow-500 shadow-yellow-700 dark:bg-yellow-700 dark:shadow-yellow-900 text-black dark:text-white' },
  'green': { cls: 'bg-green-500 shadow-green-700 dark:bg-green-700 dark:shadow-green-900 text-white' },
  'purple': { cls: 'bg-purple-500 shadow-purple-700 dark:bg-purple-700 dark:shadow-purple-900 text-white' },
  'orange': { cls: 'bg-orange-500 shadow-orange-700 dark:bg-orange-700 dark:shadow-orange-900 text-white' },
  'pink': { cls: 'bg-pink-500 shadow-pink-700 dark:bg-pink-700 dark:shadow-pink-900 text-white' },
  'gray': { cls: 'bg-neutral-200 shadow-neutral-400 dark:bg-neutral-700 dark:shadow-neutral-900 text-black dark:text-white' },
  'darkgray': { cls: 'bg-neutral-700 shadow-neutral-900 dark:bg-neutral-700 dark:shadow-neutral-900 text-white' },
  'lightblue': { cls: 'bg-blue-300 shadow-blue-400 dark:bg-blue-400 dark:shadow-blue-500 text-black dark:text-white' },
  'black': { cls: 'bg-black shadow-gray-900 dark:bg-black dark:shadow-gray-900 text-white' },
  'white': { cls: 'bg-white shadow-neutral-400 dark:bg-neutral-100 dark:shadow-neutral-400 text-black dark:text-black' },
}