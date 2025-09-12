import { Booking, STATUS_CONFIG } from "@/types/booking.types";
import { formatDate } from "./booking.utils";

export const exportBookingsToCSV = (bookings: Booking[]): void => {
  const headers = [
    'Booking Number',
    'Customer Name',
    'Phone',
    'Vehicle',
    'Plate Number',
    'Service',
    'Status',
    'Service Date',
    'Total Amount',
    'Paid Amount',
    'Remaining Amount',
    'Technician',
    'Created At'
  ];
  
  const csvData = bookings.map(booking => [
    booking.bookingNumber,
    booking.customer.name,
    booking.customer.phone,
    `${booking.vehicle.brand} ${booking.vehicle.model}`,
    booking.vehicle.plateNumber,
    booking.service.name,
    STATUS_CONFIG[booking.status].label,
    formatDate(booking.serviceDate),
    booking.totalAmount,
    booking.paidAmount,
    booking.remainingAmount,
    booking.technician?.name || 'Not Assigned',
    formatDate(booking.createdAt)
  ]);
  
  const csv = [headers, ...csvData]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `bookings-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const printBookingDetails = (booking: Booking): void => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Booking Details - ${booking.bookingNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .section h3 { border-bottom: 2px solid #333; padding-bottom: 5px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .status { display: inline-block; padding: 5px 10px; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Service Booking Details</h1>
        <h2>${booking.bookingNumber}</h2>
      </div>
      
      <div class="section">
        <h3>Customer Information</h3>
        <div class="grid">
          <div>
            <strong>Name:</strong> ${booking.customer.name}<br>
            <strong>Phone:</strong> ${booking.customer.phone}<br>
            <strong>Email:</strong> ${booking.customer.email}
          </div>
          <div>
            <strong>Address:</strong> ${booking.address}
          </div>
        </div>
      </div>
      
      <div class="section">
        <h3>Vehicle Information</h3>
        <div class="grid">
          <div>
            <strong>Vehicle:</strong> ${booking.vehicle.brand} ${booking.vehicle.model}<br>
            <strong>Year:</strong> ${booking.vehicle.year}<br>
            <strong>Plate Number:</strong> ${booking.vehicle.plateNumber}
          </div>
          <div>
            <strong>Service:</strong> ${booking.service.name}<br>
            <strong>Service Date:</strong> ${formatDate(booking.serviceDate)}<br>
            <strong>Status:</strong> <span class="status">${STATUS_CONFIG[booking.status].label}</span>
          </div>
        </div>
      </div>
      
      ${booking.parts.length > 0 ? `
      <div class="section">
        <h3>Parts Used</h3>
        <table>
          <thead>
            <tr>
              <th>Part Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            ${booking.parts.map(part => `
              <tr>
                <td>${part.name}</td>
                <td>${part.quantity}</td>
                <td>₹${part.unitPrice}</td>
                <td>₹${part.totalPrice}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}
      
      ${booking.charges.length > 0 ? `
      <div class="section">
        <h3>Additional Charges</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${booking.charges.map(charge => `
              <tr>
                <td>${charge.name}</td>
                <td>${charge.type}</td>
                <td>₹${charge.amount}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}
      
      <div class="section">
        <h3>Payment Summary</h3>
        <table>
          <tr>
            <td><strong>Service Charge:</strong></td>
            <td>₹${booking.service.basePrice}</td>
          </tr>
          <tr>
            <td><strong>Parts Total:</strong></td>
            <td>₹${booking.parts.reduce((sum, part) => sum + part.totalPrice, 0)}</td>
          </tr>
          <tr>
            <td><strong>Additional Charges:</strong></td>
            <td>₹${booking.charges.reduce((sum, charge) => sum + charge.amount, 0)}</td>
          </tr>
          <tr style="font-weight: bold; font-size: 1.1em;">
            <td><strong>Total Amount:</strong></td>
            <td>₹${booking.totalAmount}</td>
          </tr>
          <tr>
            <td><strong>Paid Amount:</strong></td>
            <td>₹${booking.paidAmount}</td>
          </tr>
          <tr style="color: ${booking.remainingAmount > 0 ? 'red' : 'green'};">
            <td><strong>Remaining Amount:</strong></td>
            <td>₹${booking.remainingAmount}</td>
          </tr>
        </table>
      </div>
      
      <div class="section no-print" style="text-align: center; margin-top: 40px;">
        <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px;">Print</button>
        <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; margin-left: 10px;">Close</button>
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
};