import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  getInvoiceStatusColor,
  getInvoiceStatusIcon,
  getInvoiceStatusLabel,
} from '../utils/invoiceStatus';

type Invoice = {
  id: string;
  amount: string;
  currency: string;
  status: 'CREATED' | 'PENDING' | 'COMPLETED' | 'EXPIRED';
  customerInfo: {
    fullName: string;
  };
};

type InvoiceCardProps = {
  invoice: Invoice;
};

const InvoiceCardComponent: React.FC<InvoiceCardProps> = ({ invoice }) => {
  const statusColor = getInvoiceStatusColor(invoice.status);
  const statusIcon = getInvoiceStatusIcon(invoice.status, statusColor);
  const statusLabel = getInvoiceStatusLabel(invoice.status);
  // Show only the last 4 digits of the order ID for better readability
  const shortId = String(invoice.id).slice(-4);

  return (
    <View style={styles.invoiceItem}>
      <View style={styles.invoiceRow}>
        <Text style={styles.invoiceLabel}>Order ID</Text>
        <Text style={styles.invoiceValue}>{shortId}</Text>
      </View>
      <View style={styles.invoiceRow}>
        <Text style={styles.invoiceLabel}>Amount</Text>
        <Text style={styles.invoiceValue}>
          {invoice.amount} {invoice.currency}
        </Text>
      </View>
      <View style={styles.invoiceRow}>
        <Text style={styles.invoiceLabel}>Customer</Text>
        <Text style={styles.invoiceValue}>{invoice.customerInfo.fullName}</Text>
      </View>
      <View style={styles.invoiceRow}>
        <Text style={styles.invoiceLabel}>Status</Text>
        <View style={styles.statusRow}>
          {statusIcon}
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const InvoiceCard = React.memo(InvoiceCardComponent);

const styles = StyleSheet.create({
  invoiceItem: {
    backgroundColor: '#23242b',
    padding: 20,
    marginBottom: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#23242b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  invoiceLabel: {
    color: '#b0b3b8',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  invoiceValue: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 2,
  },
});
