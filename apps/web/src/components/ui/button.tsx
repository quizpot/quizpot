import {ComponentChildren, ComponentProps} from "preact";
import {cn} from "@/lib/utils";

export const Button = (
    { size, children, ...props }:
    { size?: "sm" | "lg", children: ComponentChildren, props?: ComponentProps<"button"> }
) => {


  return <>
    <button { ...props } class={cn(
      "bg-red-300 " +
      "px-4 py-2 " +
      "shadow-[6px_6px_0] shadow-black " +
      "-skew-x-12 duration-300 focus:outline-none " +
      "hover:shadow-amber-600 hover:shadow-[8px_8px_0]"
    )}>
      <span class={"skew-x-12"}>{ children }</span>
    </button>
  </>
}