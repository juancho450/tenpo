import { useState, useEffect, useRef, CSSProperties } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className = '',
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 5);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + height) / itemHeight) + 5
  );
  
  const visibleItems = items.slice(startIndex, endIndex + 1);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollTop(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height }}
    >
      <div 
        className="relative w-full" 
        style={{ height: totalHeight }}
      >
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          const top = actualIndex * itemHeight;
          
          const itemStyle: CSSProperties = {
            position: 'absolute',
            top,
            left: 0,
            right: 0,
            height: itemHeight,
          };
          
          return (
            <div 
              key={actualIndex} 
              style={itemStyle}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualizedList; 