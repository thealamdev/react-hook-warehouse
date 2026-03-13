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