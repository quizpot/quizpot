import { Car, Carrot, Droplet, Gem, Leaf, Sun } from "lucide-react"

export const FancyIcons = () => {
  const iconStyle = "absolute pointer-events-none select-none"
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
      <Car
        className={`${iconStyle} text-red-500 top-[10%] left-[8%] -rotate-12`} 
        size={140} 
      />
      
      <Droplet
        className={`${iconStyle} text-blue-500 top-[12%] right-[10%] rotate-12`} 
        size={120} 
      />
      
      <Leaf
        className={`${iconStyle} text-green-500 top-[50%] right-[8%] rotate-45`} 
        size={130} 
      />
      
      <Sun
        className={`${iconStyle} text-yellow-500 top-[45%] left-[5%]`} 
        size={160} 
      />

      <Carrot
        className={`${iconStyle} text-orange-500 bottom-[10%] left-[15%] -rotate-30deg`} 
        size={130} 
      />
      
      <Gem
        className={`${iconStyle} text-purple-600 bottom-[12%] right-[15%] -rotate-12`} 
        size={150} 
      />
    </div>
  )
}