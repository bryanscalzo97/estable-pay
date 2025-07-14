import React from 'react';
import { Text } from 'react-native';

export function getInvoiceStatusColor(status: string): string {
  switch (status) {
    case 'COMPLETED':
      return '#00d1b2';
    case 'EXPIRED':
      return '#dc3545';
    case 'PENDING':
      return '#ffc107';
    case 'CREATED':
    default:
      return '#6c757d';
  }
}

export function getInvoiceStatusIcon(
  status: string,
  color: string
): React.ReactNode {
  switch (status) {
    case 'COMPLETED':
      return <Text style={{ color, fontSize: 16, marginRight: 4 }}>✔</Text>;
    case 'EXPIRED':
      return <Text style={{ color, fontSize: 16, marginRight: 4 }}>⏱</Text>;
    case 'PENDING':
      return <Text style={{ color, fontSize: 16, marginRight: 4 }}>⏳</Text>;
    case 'CREATED':
    default:
      return <Text style={{ color, fontSize: 16, marginRight: 4 }}>•</Text>;
  }
}

export function getInvoiceStatusLabel(status: string): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}
