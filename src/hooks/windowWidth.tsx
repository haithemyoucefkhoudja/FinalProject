'use client';

import { useEffect, useState } from "react";

export const useWidth = () => {
    const [width, setWidth] = useState(0)
    const handleResize = () => setWidth(window.innerWidth)
    useEffect(() => {
        //make sure it set properly on the first load (before resizing)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
        // the next line for linters, so they won't give a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // empty
    return width
  }