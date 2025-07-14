# Estable Pay

A modern, modular, and high-performance React Native app for managing invoices.

## Demo

https://github.com/user-attachments/assets/8aa3ee32-e92d-4d09-bd6e-94ff75523e97


## Features

- Invoice listing with filters (status, crypto)
- High-performance lists using [FlashList](https://shopify.github.io/flash-list/)
- Modular, clean codebase (custom hooks, reusable components)
- Filter modal with smooth UX, Airbnb-inspired design.
- TypeScript support

## API

- The app fetches invoice data from the provided endpoint:
  ```
  https://www.postman.com/dattran/workspace/estable/request/213347-b152d514-6824-4d36-bdd2-859afcfc6a35?action=share&creator=213347&ctx=documentation&active-environment=213347-f55df0d1-8a81-471c-a182-e8a7d933a1e2
  ```

## Polling

- The invoice list automatically refreshes every 5 seconds.

## Infinite Scroll

- As you scroll, more invoices are loaded automatically.

## Filters

- Multi-select filters are available for both invoice status and cryptocurrency type.
- Status: CREATED, PENDING, COMPLETED, EXPIRED
- Crypto: USDT-TRX, USDT-ETH, ETH, TRX

## Design

- The layout is inspired by the provided reference design and by Airbnb's clean, modern UI.

## Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 8
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

Then follow the Expo instructions to run on iOS, Android, or web.

## Project Structure

- `src/screens/` — Main screens (HomeScreen, FilterModalScreen)
- `src/components/` — Reusable UI components (Header, InvoiceCard, FilterOptionList)
- `src/hooks/` — Custom hooks (useInvoices, useFilterModalState)
- `src/utils/` — Utility functions (invoiceStatus, etc)
- `src/api/` — API logic

## Main Libraries

- **React Native** (Expo)
- **FlashList** (Shopify) for performant lists
- **React Navigation** for navigation and modals
- **@tanstack/react-query** for data fetching
- **TypeScript** for type safety

## Testing

- To test the app, run it on a simulator or device and:
  - Check that invoices load and update every 5 seconds.
  - Use infinite scroll by scrolling to the bottom of the list.
  - Open the filter modal and apply different filters.
  - Confirm that the UI matches the reference design in spirit.

## Commit & Submission

- All source files and assets are committed.
- See commit messages for a clear history of changes.

## License

[MIT](LICENSE)
