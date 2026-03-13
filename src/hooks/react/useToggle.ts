import { useState } from "react";

export function useToggle(initial: boolean = false) {
    const [state, setState] = useState(initial);

    const toggle = () => setState(prev => !prev);

    return [state, toggle] as const;
}