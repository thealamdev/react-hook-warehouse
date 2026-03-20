# React Hooks Warehouse

A collection of useful React hooks for easy state and behavior management.

---

## Installation

Install the package using npm or yarn:

```bash
npm install react-hook-warehouse
```

All hooks are compatible with both **React** and **Next.js** (client components).

---

### 1. `useToggle`

Simple boolean toggle hook with clean API.

```tsx
import { useToggle } from 'react-hook-warehouse';

function Example() {
  const [isOpen, toggleIsOpen] = useToggle(false);
  // or with default value
  // const [isOpen, toggleIsOpen] = useToggle(true);

  return (
    <div>
      <p>Status: {isOpen ? 'Open' : 'Closed'}</p>
      <button onClick={toggleIsOpen}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
}
```

**Parameters**

| Param       | Type      | Default | Description                           |
|-------------|-----------|---------|---------------------------------------|
| initialValue| `boolean` | `false` | Initial state of the toggle           |

**Returns** `[state: boolean, toggle: () => void]`

---

### 2. `useClickOutside`

Detects clicks outside of a specified element (great for modals, dropdowns, drawers).

```tsx
import { useRef } from 'react';
import { useClickOutside } from 'react-hook-warehouse';

function Dropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => {
      console.log('Clicked outside → should close dropdown');
      // setIsOpen(false);
    },
  });

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button>Menu</button>
      {/* dropdown content */}
    </div>
  );
}
```

**Parameters** (object)

| Property     | Type                        | Required | Default     | Description                                    |
|--------------|-----------------------------|----------|-------------|------------------------------------------------|
| ref          | `RefObject<HTMLElement>`    | Yes      | —           | Element to detect outside clicks for           |
| callback     | `() => void`                | Yes      | —           | Function called when click is outside          |

---

### 3. `useExportToCSV`

Client-side CSV export hook for array-of-objects data.

```tsx
import { useExportToCSV } from 'react-hook-warehouse';

const users = [
  { id: 1, name: 'Shah Alam', age: 26, city: 'Dhaka' },
  { id: 2, name: 'Aisha Rahman', age: 24, city: 'Chittagong' },
];

function ExportButton() {
  const { pending, exportToCSV } = useExportToCSV({
    data: users,
    filename: 'users-report.csv',
  });

  return (
    <button
      onClick={exportToCSV}
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {pending ? 'Exporting...' : 'Export to CSV'}
    </button>
  );
}
```

**Parameters** (object)

| Property   | Type                  | Required | Default           | Description                                |
|------------|-----------------------|----------|-------------------|--------------------------------------------|
| data       | `object[]`            | Yes      | —                 | Array of objects to export                 |
| filename   | `string`              | No       | —                  | Name of downloaded file (should end with .csv) |

**Returns**

```ts
{
  pending: boolean;
  exportToCSV: () => void;
}
```

---

### 4. `useLocation`

Gets user's geolocation (with permission).

```tsx
import { useLocation } from 'react-hook-warehouse';

function MyLocation() {
  const location = useLocation();

  return (
    <div>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <p>Timezone: {location.timezone}</p>
    </div>
  );
}
```

**Returns**

```ts
{
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
}
```

> **Note**: Requires HTTPS in production and user permission.

---

### 5. `useIsMobile`

Detects mobile-sized screens via media query.

```tsx
import { useIsMobile } from 'react-hook-warehouse';

function ResponsiveComponent() {
  const isMobile = useIsMobile(768); // breakpoint in px

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

**Parameters**

| Param       | Type     | Default | Description                          |
|-------------|----------|---------|--------------------------------------|
| breakpoint  | `number` | `768`   | Max width (px) to consider "mobile"  |

**Returns** `boolean`

---

### 6. `useDebounce`

Delays updating a value until after a specified time (useful for search inputs, filters, and API calls).

```jsx
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-hook-warehouse';

interface FilterInterface {
  search: string;
  event: string;
  status: string;
}

function Example() {
  const [filters, setFilters] = useState<FilterInterface>({
    search: '',
    event: '',
    status: '',
  });

  // Debounce filters by 600ms
  const debouncedFilters = useDebounce(filters, 600);

  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // API call or expensive operation
    console.log('Debounced Filters:', debouncedFilters);
  }, [debouncedFilters]);

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(e) => handleChange('search', e.target.value)}
      />

      <input
        placeholder="Event..."
        onChange={(e) => handleChange('event', e.target.value)}
      />

      <select onChange={(e) => handleChange('status', e.target.value)}>
        <option value="">All</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}
```

**Parameters**

| Param | Type     | Default | Description                |
| ----- | -------- | ------- | -------------------------- |
| value | `any`    | —       | The value to debounce      |
| delay | `number` | `300`   | Delay time in milliseconds |

**Returns** `debouncedValue`

---

Here’s the `useActiveTab` hook documentation written in the same style as your file:

---

### 7. `useActiveTab`

Manages active tab state with optional persistence (e.g., query param or key-based state).

```jsx id="v72k9d"
"use client";

import { useActiveTab } from "react-hook-warehouse";

enum DashboardTab {
  ALL = "all",
  UPCOMING = "upcoming",
  PAST = "past",
}

function Example() {
  const { tab, setTab } = useActiveTab("tab", DashboardTab.ALL);

  return (
    <div>
      <div className="flex gap-4">
        <button onClick={() => setTab(DashboardTab.ALL)}>
          All
        </button>
        <button onClick={() => setTab(DashboardTab.UPCOMING)}>
          Upcoming
        </button>
        <button onClick={() => setTab(DashboardTab.PAST)}>
          Past
        </button>
      </div>

      <p>Active Tab: {tab}</p>
    </div>
  );
}
```

**Parameters**

| Param        | Type     | Default | Description                               |
| ------------ | -------- | ------- | ----------------------------------------- |
| key          | `string` | —       | Unique key for storing/managing tab state |
| initialValue | `string` | —       | Default active tab value                  |

**Returns**

```ts
{
  tab: string;
  setTab: (value: string) => void;
}
```

---

Here’s the `useActivePath` hook documentation written in your existing style:

---

### 8. `useActivePath`

Checks if a given path matches the current route (useful for active links, menus, and navigation highlighting).

```jsx id="v81k2p"
"use client";

import Link from "next/link";
import { useActivePath } from "react-hook-warehouse";

function Example() {
  const isDashboardActive = useActivePath("/dashboard");
  const isEventActive = useActivePath("/events", "startsWith");

  return (
    <div className="space-y-2">
      <Link
        href="/dashboard"
        className={isDashboardActive ? "text-primary" : "text-gray-500"}
      >
        Dashboard
      </Link>

      <Link
        href="/events"
        className={isEventActive ? "text-primary" : "text-gray-500"}
      >
        Events
      </Link>
    </div>
  );
}
```

**Parameters**

| Param     | Type                      | Default   | Description                                  |
| --------- | ------------------------- | --------- | -------------------------------------------- |
| path      | `string`                  | —         | Path to match against current route          |
| matchType | `'exact' \| 'startsWith'` | `'exact'` | Matching strategy (`exact` or partial match) |

**Returns** `boolean`

---