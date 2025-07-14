import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice }) => {
  let statusColor = '#6c757d';
  let statusIcon = null;

  if (invoice.status === 'COMPLETED') {
    statusColor = '#00d1b2';
    statusIcon = (
      <Text style={{ color: statusColor, fontSize: 16, marginRight: 4 }}>
        ✔
      </Text>
    );
  } else if (invoice.status === 'EXPIRED') {
    statusColor = '#dc3545';
    statusIcon = (
      <Text style={{ color: statusColor, fontSize: 16, marginRight: 4 }}>
        ⏱
      </Text>
    );
  } else if (invoice.status === 'PENDING') {
    statusColor = '#ffc107';
    statusIcon = (
      <Text style={{ color: statusColor, fontSize: 16, marginRight: 4 }}>
        ⏳
      </Text>
    );
  } else if (invoice.status === 'CREATED') {
    statusColor = '#6c757d';
    statusIcon = (
      <Text style={{ color: statusColor, fontSize: 16, marginRight: 4 }}>
        •
      </Text>
    );
  }
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
            {invoice.status.charAt(0) + invoice.status.slice(1).toLowerCase()}
          </Text>
        </View>
      </View>
    </View>
  );
};

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
