# React Hooks Warehouse

A collection of useful React hooks for easy state and behavior management.

---

## Installation

Install the package using npm or yarn:

```bash
npm install react-hook-warehouse
```

**1. useToggle**

> Use the hook both Next js & React

```jsx
"use client"; // Remove this line to use in React
import React from "react";
import { useToggle } from "react-hook-warehouse";

export default function Page() {
  const [open, setOpen] = useToggle(false);

  return (
    <div>
      {open && (
        <div>
          <h1>Div is open</h1>
        </div>
      )}
      <button type="button" onClick={setOpen}>
        Toggle
      </button>
    </div>
  );
}
```

**2. useClickOutside**

## Usage

This package provides functionality for detecting clicks outside of elements. Common use cases include:

- Closing a modal when the user clicks outside of it.
- Closing a sidebar when the user clicks outside of it.
- Closing a drawer when the user clicks outside of it.

> Use the hook both Next js & React

```jsx
"use client"; // Remove this line to use in React
import React, { useRef } from "react";
import { useClickOutside } from "react-hook-warehouse";

export default function Page() {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    ref: ref,
    callback: () => {
      console.log("click outside of the div");
    },
  });

  return (
    <div>
      <div ref={ref} className="w-20 h-20 bg-red-300">
        The Box
      </div>
    </div>
  );
}
```
