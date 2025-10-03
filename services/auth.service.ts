interface OTPResponse {
  success: boolean;
  message?: string;
  data?: {
    sessionId?: string;
    expiresIn?: number;
  };
  error?: {
    message: string;
    code: string;
  };
}

interface VerifyOTPResponse {
  success: boolean;
  data?: {
    token: string;
    user: {
      id: string;
      name: string;
      email?: string;
      mobile?: string;
    };
  };
  error?: {
    message: string;
    code: string;
  };
}

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.error?.message || data.message || 'Request failed',
        code: data.error?.code || 'UNKNOWN_ERROR',
        status: response.status,
      };
    }

    return data;
  }

  async sendMobileOTP(mobile: string): Promise<OTPResponse> {
    return this.request<OTPResponse>('/otp/mobile/send', {
      method: 'POST',
      body: JSON.stringify({ mobile }),
    });
  }

  async verifyMobileOTP(mobile: string, otp: string): Promise<VerifyOTPResponse> {
    return this.request<VerifyOTPResponse>('/otp/mobile/verify', {
      method: 'POST',
      body: JSON.stringify({ mobile, otp }),
    });
  }

  async sendEmailOTP(email: string): Promise<OTPResponse> {
    return this.request<OTPResponse>('/otp/email/send', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyEmailOTP(email: string, otp: string): Promise<VerifyOTPResponse> {
    return this.request<VerifyOTPResponse>('/otp/email/verify', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  removeAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

export const authService = new AuthService();
