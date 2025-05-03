
import { cn } from "@/lib/utils" // Optional utility to join classes, or use simple `className` string

export function Card({ className, ...props }) {
  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className="mb-4 border-b border-gray-100 pb-2 dark:border-gray-800"
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }) {
  return (
    <h2
      className=
      "text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100"


      {...props}
    />
  )
}

export function CardContent({ className, ...props }) {
  return (
    <div
      className="text-sm text-gray-700 dark:text-gray-300"
      {...props}
    />
  )
}
