// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   motion,
//   useAnimationFrame,
//   useMotionTemplate,
//   useMotionValue,
//   useTransform,
// } from "motion/react";
// import { useRef } from "react";
// import { cn } from "@/lib/utils";

// export function Button({
//   borderRadius = "1.75rem",
//   children,
//   as: Component = "button",
//   containerClassName,
//   borderClassName,
//   duration,
//   className,
//   ...otherProps
// }: {
//   borderRadius?: string;
//   children: React.ReactNode;
//   as?: any;
//   containerClassName?: string;
//   borderClassName?: string;
//   duration?: number;
//   className?: string;
//   [key: string]: any;
// }) {
//   return (
//     <Component
//       className={cn(
//         "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
//         containerClassName,
//       )}
//       style={{
//         borderRadius: borderRadius,
//       }}
//       {...otherProps}
//     >
//       <div
//         className="absolute inset-0"
//         style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
//       >
//         <MovingBorder duration={duration} rx="30%" ry="30%">
//           <div
//             className={cn(
//               "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
//               borderClassName,
//             )}
//           />
//         </MovingBorder>
//       </div>

//       <div
//         className={cn(
//           "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
//           className,
//         )}
//         style={{
//           borderRadius: `calc(${borderRadius} * 0.96)`,
//         }}
//       >
//         {children}
//       </div>
//     </Component>
//   );
// }

// export const MovingBorder = ({
//   children,
//   duration = 3000,
//   ...otherProps
// }: {
//   children: React.ReactNode;
//   duration?: number;
//   [key: string]: any;
// }) => {
//   const pathRef = useRef<SVGPathElement | null>(null);
//   const [length, setLength] = useState(0);

//   const progress = useMotionValue(0);

//   // Set path length after component mounts
//   useEffect(() => {
//     if (pathRef.current) {
//       setLength(pathRef.current.getTotalLength());
//     }
//   }, []);

//   // Drive the progress using animation frame
//   useAnimationFrame((time) => {
//     if (length) {
//       const pxPerMs = length / duration;
//       progress.set((time * pxPerMs) % length);
//     }
//   });

//   // Calculate x/y positions along the path
//   const x = useTransform(progress, (val) => {
//     const point = pathRef.current?.getPointAtLength(val);
//     return point?.x ?? 0;
//   });

//   const y = useTransform(progress, (val) => {
//     const point = pathRef.current?.getPointAtLength(val);
//     return point?.y ?? 0;
//   });

//   const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

//   return (
//     <>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="absolute h-full w-full"
//         width="100%"
//         height="100%"
//         viewBox="0 0 160 64"
//         {...otherProps}
//       >
//         <path
//           ref={pathRef}
//           d="
//             M16,0
//             H144
//             a16,16 0 0 1 16,16
//             V48
//             a16,16 0 0 1 -16,16
//             H16
//             a16,16 0 0 1 -16,-16
//             V16
//             a16,16 0 0 1 16,-16
//             Z
//           "
//           fill="none"
//           stroke="transparent"
//         />
//       </svg>
//       <motion.div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: 20,
//           height: 20,
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, #0ea5e9 40%, transparent 60%)",
//           opacity: 0.8,
//           transform,
//         }}
//       >
//         {children}
//       </motion.div>
//     </>
//   );
// };

"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x,
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y,
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
