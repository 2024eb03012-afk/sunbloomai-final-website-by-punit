"use client"

import { FC, useEffect, useRef } from "react"
import { motion, useSpring } from "motion/react"

interface Position {
  x: number
  y: number
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

const SunbloomCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={52}
      viewBox="0 0 48 52"
      fill="none"
      style={{ scale: 0.6 }}
    >
      <g filter="url(#sunbloom_cursor_shadow)">
        {/* Main cursor shape with gradient fill */}
        <path
          d="M40.6817 39.1495L25.5103 4.79925C24.7269 3.02557 22.2082 3.02558 21.3927 4.79925L5.59814 39.1495C4.75833 40.9759 6.52712 42.8902 8.4125 42.1954L22.3757 37.0496C22.8829 36.8627 23.4385 36.8627 23.9422 37.0496L37.8121 42.1954C39.6849 42.8902 41.4884 40.9759 40.6817 39.1495Z"
          fill="url(#sunbloom_gradient)"
        />
        {/* Outer stroke with subtle glow */}
        <path
          d="M41.7146 38.6933L26.5431 4.34306C25.3556 1.65428 21.5772 1.69516 20.3668 4.32755L4.57226 38.6778C3.3134 41.4156 5.97238 44.298 8.803 43.2549L22.7662 38.109C23.0221 38.0147 23.2999 38.0156 23.5494 38.1082L37.4193 43.254C40.2261 44.2953 42.9254 41.4347 41.7146 38.6933Z"
          stroke="url(#sunbloom_stroke_gradient)"
          strokeWidth={2}
        />
        {/* Inner highlight */}
        <path
          d="M30.5 20L26 16L24 22L18 24L24 26L26 32L28 26L34 24L30.5 20Z"
          fill="rgba(255, 255, 255, 0.3)"
        />
      </g>
      <defs>
        <filter
          id="sunbloom_cursor_shadow"
          x={0}
          y={0}
          width={48}
          height={52}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={3} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.95 0.6 0.5 0 0.15 0 0 0 0 0 0.1 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id="sunbloom_gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FF9A76" />
          <stop offset="50%" stopColor="#FFB6A3" />
          <stop offset="100%" stopColor="#FF9A76" />
        </linearGradient>
        <linearGradient
          id="sunbloom_stroke_gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFB6A3" />
          <stop offset="100%" stopColor="#FF9A76" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function SmoothCursor({
  cursor = <SunbloomCursorSVG />,
  springConfig = {
    damping: 35,
    stiffness: 300,
    mass: 0.8,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef<number | null>(null)
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  })
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  })

  useEffect(() => {
    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now()
      const previousTime = lastUpdateTime.current ?? currentTime
      const deltaTime = currentTime - previousTime

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      )

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90

        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle

        scale.set(0.95)

        const timeout = setTimeout(() => {
          scale.set(1)
        }, 150)

        return () => clearTimeout(timeout)
      }
    }

    let rafId: number
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e)
        rafId = 0
      })
    }

    document.body.style.cursor = "none"
    window.addEventListener("mousemove", throttledMouseMove)

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      document.body.style.cursor = "auto"
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [cursorX, cursorY, rotation, scale])

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      {cursor}
    </motion.div>
  )
}
