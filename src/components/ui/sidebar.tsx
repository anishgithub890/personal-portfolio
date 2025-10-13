"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sidebarVariants = cva(
  "group relative flex h-full w-full flex-col gap-4 border-r bg-background p-6",
  {
    variants: {
      variant: {
        default: "border-border",
        secondary: "border-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof sidebarVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(sidebarVariants({ variant }), className)}
    {...props}
  />
))
sidebar.displayName = "Sidebar"

const sidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-[60px] items-center px-2", className)}
    {...props}
  />
))
sidebarHeader.displayName = "SidebarHeader"

const sidebarTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "mb-2 px-4 text-lg font-semibold tracking-tight",
      className
    )}
    {...props}
  />
))
sidebarTitle.displayName = "SidebarTitle"

const sidebarDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mb-2 px-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
sidebarDescription.displayName = "SidebarDescription"

const sidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />
))
sidebarContent.displayName = "SidebarContent"

const sidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4 p-4", className)}
    {...props}
  />
))
sidebarFooter.displayName = "SidebarFooter"

const sidebarNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
))
sidebarNav.displayName = "SidebarNav"

const sidebarNavItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
sidebarNavItem.displayName = "SidebarNavItem"

const sidebarNavLink = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  />
))
sidebarNavLink.displayName = "SidebarNavLink"

export {
  sidebar,
  sidebarHeader,
  sidebarTitle,
  sidebarDescription,
  sidebarContent,
  sidebarFooter,
  sidebarNav,
  sidebarNavItem,
  sidebarNavLink,
} 