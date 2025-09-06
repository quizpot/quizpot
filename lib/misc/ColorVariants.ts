export type ColorVariants = 'red' | 'blue' | 'yellow' | 'green' | 'gray'

export const colorStyles: Record<ColorVariants, { parent: string, child: string }> = {
  'red': { parent: 'bg-red-600 text-white', child: 'bg-red-500' },
  'blue': { parent: 'bg-blue-600 text-white', child: 'bg-blue-500' },
  'yellow': { parent: 'bg-yellow-600 text-white', child: 'bg-yellow-500' },
  'green': { parent: 'bg-green-600 text-white', child: 'bg-green-500' },
  'gray': { parent: 'bg-neutral-200 text-black', child: 'bg-neutral-100' },
}