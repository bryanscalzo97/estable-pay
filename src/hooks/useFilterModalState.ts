import { useState } from 'react';

export const STATUS_OPTIONS = ['CREATED', 'PENDING', 'COMPLETED', 'EXPIRED'];
export const CRYPTO_OPTIONS = ['USDT-TRX', 'USDT-ETH', 'ETH', 'TRX'];

export function useFilterModalState(
  initialStatus: string[] = STATUS_OPTIONS,
  initialCrypto: string[] = CRYPTO_OPTIONS
) {
  const [selectedStatus, setSelectedStatus] = useState<string[]>(initialStatus);
  const [selectedCrypto, setSelectedCrypto] = useState<string[]>(initialCrypto);

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const toggleCrypto = (crypto: string) => {
    setSelectedCrypto((prev) =>
      prev.includes(crypto)
        ? prev.filter((c) => c !== crypto)
        : [...prev, crypto]
    );
  };

  const handleClear = () => {
    setSelectedStatus([]);
    setSelectedCrypto([]);
  };

  return {
    selectedStatus,
    setSelectedStatus,
    selectedCrypto,
    setSelectedCrypto,
    toggleStatus,
    toggleCrypto,
    handleClear,
  };
}
