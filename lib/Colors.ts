export type Color = "red" | "blue" | "yellow" | "green" | "purple" | "orange" | "pink" | "gray" | "black" | "white" | "ghost"

export const colors: Record<Color, { cls: string }> = {
  'red': { cls: 'bg-red-500 shadow-red-700 dark:bg-red-600 dark:shadow-red-800 text-red-950 dark:text-red-100' },
  'blue': { cls: 'bg-blue-500 shadow-blue-700 dark:bg-blue-600 dark:shadow-blue-800 text-blue-950 dark:text-blue-100' },
  'yellow': { cls: 'bg-yellow-500 shadow-yellow-700 dark:bg-yellow-600 dark:shadow-yellow-800 text-yellow-950 dark:text-yellow-100' },
  'green': { cls: 'bg-green-500 shadow-green-700 dark:bg-green-600 dark:shadow-green-800 text-green-950 dark:text-green-100' },
  'purple': { cls: 'bg-purple-500 shadow-purple-700 dark:bg-purple-600 dark:shadow-purple-800 text-purple-950 dark:text-purple-100' },
  'orange': { cls: 'bg-orange-500 shadow-orange-700 dark:bg-orange-600 dark:shadow-orange-800 text-orange-950 dark:text-orange-100' },
  'pink': { cls: 'bg-pink-500 shadow-pink-700 dark:bg-pink-600 dark:shadow-pink-800 text-pink-950 dark:text-pink-100' },
  'gray': { cls: 'bg-neutral-300 shadow-neutral-400 dark:bg-neutral-600 dark:shadow-neutral-800 text-neutral-900 dark:text-neutral-100' },
  'black': { cls: 'bg-neutral-800 shadow-neutral-900 text-neutral-100' },
  'white': { cls: 'bg-neutral-100 shadow-neutral-300 text-neutral-900' },
  'ghost': { cls: 'shadow-black/20 bg-black/10 dark:bg-white/10 dark:shadow-white/5 text-black dark:text-white' },
}

export const colorKeys = Object.keys(colors) as (keyof typeof colors)[]