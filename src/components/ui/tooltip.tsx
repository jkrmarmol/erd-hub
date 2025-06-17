type TooltipProps = {
  children: React.ReactNode;
  content: string;
};

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className="relative group/tooltip">
      {children}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
        {content}
      </div>
    </div>
  );
};
