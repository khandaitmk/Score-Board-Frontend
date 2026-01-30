import * as React from "react";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef(
  (
    {
      className,
      value,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value?.[0] ?? min);

    React.useEffect(() => {
      if (value?.[0] !== undefined) {
        setInternalValue(value[0]);
      }
    }, [value]);

    const handleChange = (e) => {
      const newValue = parseFloat(e.target.value);
      setInternalValue(newValue);
      onValueChange?.([newValue]);
    };

    const percentage = ((internalValue - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          className="sr-only"
        />
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute h-full bg-primary transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background shadow transition-all hover:scale-110"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };

