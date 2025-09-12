import { Booking, STATUS_CONFIG, StatusUpdate } from "@/types/booking.types";

class WhatsAppService {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_WHATSAPP_API_KEY || '';
    this.baseURL = process.env.NEXT_PUBLIC_WHATSAPP_API_URL || '';
  }

  async sendStatusUpdate(booking: Booking, status: StatusUpdate): Promise<boolean> {
    try {
      const message = this.formatStatusMessage(booking, status);
      
      const response = await fetch(`${this.baseURL}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          phone: booking.customer.whatsappNumber || booking.customer.phone,
          message,
          image: status.image,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('WhatsApp send failed:', error);
      return false;
    }
  }

  private formatStatusMessage(booking: Booking, status: StatusUpdate): string {
    const statusConfig = STATUS_CONFIG[status.status];
    
    return `
🔧 *Service Update - ${booking.bookingNumber}*

Hi ${booking.customer.name},

Your ${booking.vehicle.brand} ${booking.vehicle.model} (${booking.vehicle.plateNumber}) service status has been updated:

📋 *Status:* ${statusConfig.label}
📝 *Update:* ${status.description}
⏰ *Time:* ${new Date(status.timestamp).toLocaleString()}

${booking.technician ? `👨‍🔧 *Technician:* ${booking.technician.name}` : ''}

${status.status === 'ready_for_delivery' ? `
💰 *Total Amount:* ₹${booking.totalAmount}
💳 *Paid:* ₹${booking.paidAmount}
${booking.remainingAmount > 0 ? `💳 *Remaining:* ₹${booking.remainingAmount}` : '✅ *Fully Paid*'}
` : ''}

For any queries, call us at: +91-XXXXXXXXXX

Thank you for choosing our service! 🚗✨
    `.trim();
  }
}

export const whatsappService = new WhatsAppService();