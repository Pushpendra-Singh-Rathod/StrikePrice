"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Render an avatar root element with base avatar styling and any forwarded props.
 *
 * @param className - Additional class names appended to the component's base styling
 * @returns A JSX element for the avatar root with composed classes and forwarded props
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the avatar image slot with default sizing and aspect styles.
 *
 * @param className - Additional CSS classes to merge with the default styles
 * @returns The Avatar image element with merged `className` and forwarded props
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Renders the styled fallback content for an Avatar component.
 *
 * Applies default avatar-fallback styling and forwards any additional props to the underlying Radix AvatarFallback primitive.
 *
 * @param className - Additional CSS classes to merge with the component's default styles
 * @param props - Extra props forwarded to AvatarPrimitive.Fallback
 * @returns The Avatar fallback element
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }