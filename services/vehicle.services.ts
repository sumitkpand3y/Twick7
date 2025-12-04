
interface VehicleCompatibility {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  variant?: string;
}

class VehicalServices {
  private baseURL: string;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:3000/api/v1";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.error?.message || data.message || "Request failed",
        code: data.error?.code || "UNKNOWN_ERROR",
        status: response.status,
      };
    }

    return data;
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  async getVehicleCompatibility(params: {
    brand?: string;
    model?: string;
    year?: number;
    fuelType?: string;
    search?: string;
  }): Promise<VehicleCompatibility[]> {
    const queryParams = new URLSearchParams();
    if (params.brand) queryParams.append("brand", params.brand);
    if (params.model) queryParams.append("model", params.model);
    if (params.year) queryParams.append("year", params.year.toString());
    if (params.fuelType) queryParams.append("fuelType", params.fuelType);
    if (params.search) queryParams.append("search", params.search);

    return this.request<VehicleCompatibility[]>(
      `/vehicle-compatibility?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  }
}

export const vehicalServices = new VehicalServices();
