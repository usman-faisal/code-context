import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scroll(direction: 'next' | 'prev') {
  window.scrollTo({
      top: window.scrollY + (direction === 'next' ? window.innerHeight : -window.innerHeight),
      behavior: 'smooth'
  });
}

// register event key listener for scroll
export function registerScrollEvent() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      scroll('next')
    }
    if (e.key === 'ArrowLeft') {
      scroll('prev')
    }
  })
}
