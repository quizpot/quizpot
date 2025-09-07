export type ColorVariants = 'red' | 'blue' | 'yellow' | 'green' | 'gray' | 'orange' | 'darkgray' | 'pink' | 'purple' | 'ghost'

export const colorStyles: Record<ColorVariants, { parent: string, child: string }> = {
  'ghost': { parent: 'bg-transparent', child: 'bg-transparent' },
  'red': { parent: 'bg-red-600 text-white', child: 'bg-red-500' },
  'blue': { parent: 'bg-blue-600 text-white', child: 'bg-blue-500' },
  'yellow': { parent: 'bg-yellow-600 text-white', child: 'bg-yellow-500' },
  'green': { parent: 'bg-green-600 text-white', child: 'bg-green-500' },
  'gray': { parent: 'bg-neutral-200 text-black', child: 'bg-neutral-100' },
  'orange': { parent: 'bg-orange-600 text-white', child: 'bg-orange-500' },
  'darkgray': { parent: 'bg-neutral-800 text-white', child: 'bg-neutral-700' },
  'pink': { parent: 'bg-pink-600 text-white', child: 'bg-pink-500' },
  'purple': { parent: 'bg-purple-600 text-white', child: 'bg-purple-500' },
}