type TooltipProps = {
  children: React.ReactNode
  content: string
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className="group/tooltip relative">
      {children}
      <div className="pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100">
        {content}
      </div>
    </div>
  )
}
