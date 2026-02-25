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
        className={cn("relative flex w-full items-center", className)}
        {...props}
      >
        {/* Invisible but interactive input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          className="absolute w-full h-5 opacity-0 z-20 cursor-pointer"
        />

        {/* Track */}
        <div className="relative h-2 w-full rounded-full bg-gray-300 z-0">
          {/* Filled portion */}
          <div
            className="absolute h-full rounded-full bg-blue-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb — correctly positioned using interpolated offset */}
        <div
          className="absolute h-5 w-5 rounded-full bg-blue-600 shadow pointer-events-none z-10"
          style={{ left: `calc(${percentage}% - ${percentage * 0.2}px)` }}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };