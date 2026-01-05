"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type RatingProps = {
  value?: number
  max?: number
  onChange?: (value: number) => void
  size?: number 
  className?: string
  readOnly?: boolean
}

export function Rating({
  value = 0,
  max = 5,
  onChange,
  size = 20,
  className,
  readOnly = false,
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const ratingValue = i + 1
        const active =
          hovered !== null ? ratingValue <= hovered : ratingValue <= value

        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() => !readOnly && onChange?.(ratingValue)}
            onMouseEnter={() => !readOnly && setHovered(ratingValue)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            className={cn(
              "rounded-sm focus:outline-none",
              readOnly && "cursor-default"
            )}
          >
            <Star size={size}
              className={cn(
            `transition-colors`,
                active
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
