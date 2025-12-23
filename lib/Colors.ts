export type Color = "ghost" | "red" | "blue" | "yellow" | "green" | "purple" | "orange" | "pink" | "gray" | "brown" | "lightblue" | "black" | "white" | "dynamic"

export const colors: Record<Color, { cls: string }> = {
  'red': { cls: 'bg-red-500 shadow-red-600 dark:bg-red-600 dark:shadow-red-700 text-white' },
  'blue': { cls: 'bg-blue-500 shadow-blue-600 dark:bg-blue-600 dark:shadow-blue-700 text-white' },
  'yellow': { cls: 'bg-yellow-500 shadow-yellow-600 dark:bg-yellow-600 dark:shadow-yellow-700 text-white' },
  'green': { cls: 'bg-green-500 shadow-green-600 dark:bg-green-600 dark:shadow-green-700 text-white' },
  'purple': { cls: 'bg-purple-500 shadow-purple-600 dark:bg-purple-600 dark:shadow-purple-700 text-white' },
  'orange': { cls: 'bg-orange-500 shadow-orange-600 dark:bg-orange-600 dark:shadow-orange-700 text-white' },
  'pink': { cls: 'bg-pink-500 shadow-pink-600 dark:bg-pink-600 dark:shadow-pink-700 text-white' },
  'gray': { cls: 'bg-neutral-200 shadow-neutral-400 dark:bg-neutral-600 dark:shadow-neutral-700 text-black dark:text-white' },
  'brown': { cls: 'bg-orange-700 shadow-orange-800 dark:bg-orange-900 dark:shadow-orange-950 text-white' },
  'lightblue': { cls: 'bg-blue-300 shadow-blue-400 dark:bg-blue-400 dark:shadow-blue-500 text-black dark:text-white' },
  'black': { cls: 'bg-black shadow-gray-900 dark:bg-black dark:shadow-gray-900 text-white' },
  'white': { cls: 'bg-white shadow-neutral-200 dark:bg-neutral-100 dark:shadow-neutral-300 text-black dark:text-black' },
  'dynamic': { cls: 'bg-neutral-200 shadow-neutral-400 dark:bg-neutral-800 dark:shadow-neutral-900 text-black dark:text-white' },
  'ghost': { cls: 'shadow-black/20 bg-black/10 dark:bg-white/10 dark:shadow-white/5 text-black dark:text-white' },
}

export const colorKeys = Object.keys(colors) as (keyof typeof colors)[]