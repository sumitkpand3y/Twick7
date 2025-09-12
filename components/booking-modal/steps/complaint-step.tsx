'use client';

import { useBookingStore } from '@/store/booking-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce'; // You'll need to install this package

export function ComplaintStep() {
  const { bookingData, setBookingData } = useBookingStore();
  const [date, setDate] = useState<Date>();
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Debounce the plate number to avoid too many API calls
  const [debouncedPlateNumber] = useDebounce(bookingData.plateNumber, 500);

  const handleInputChange = (field: string, value: string) => {
    setBookingData({ [field]: value });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setBookingData({ serviceDate: format(selectedDate, 'yyyy-MM-dd') });
    }
  };

  // Fetch vehicle details when plate number changes
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!debouncedPlateNumber || debouncedPlateNumber.length < 3) {
        setVehicleDetails(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Replace with your actual API endpoint
        const response = await fetch(`/api/vehicles?plateNumber=${encodeURIComponent(debouncedPlateNumber)}`);
        
        if (!response.ok) {
          throw new Error('Vehicle not found');
        }

        const data = await response.json();
        setVehicleDetails(data);
        
        // Auto-fill the form with vehicle details
        setBookingData({
          yearOfManufacturing: data.year || '',
          // Add other fields you want to auto-fill
        });
      } catch (err) {
        setError('Vehicle not found');
        setVehicleDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [debouncedPlateNumber, setBookingData]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Service Details</h2>
        <p className="text-muted-foreground">Tell us about your service requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="serviceDate">Preferred Service Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mt-1"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="plateNumber">Vehicle Plate Number</Label>
            <Input
              id="plateNumber"
              placeholder="e.g., MH12AB1234"
              value={bookingData.plateNumber}
              onChange={(e) => handleInputChange('plateNumber', e.target.value)}
              className="mt-1"
            />
            {loading && <p className="text-sm text-muted-foreground mt-1">Searching for vehicle...</p>}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            {vehicleDetails && (
              <div className="mt-2 p-3 border rounded-lg bg-muted/50">
                <h4 className="font-medium">Vehicle Details</h4>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Make:</span> {vehicleDetails.make}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Model:</span> {vehicleDetails.model}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Year:</span> {vehicleDetails.year}
                  </div>
                  <div>
                    <span className="text-muted-foreground">VIN:</span> {vehicleDetails.vin}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="complaint">Main Complaint</Label>
            <Textarea
              id="complaint"
              placeholder="Describe your main complaint..."
              value={bookingData.complaint}
              onChange={(e) => handleInputChange('complaint', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="yearOfManufacturing">Year of Manufacturing</Label>
            <Input
              id="yearOfManufacturing"
              type="number"
              placeholder="e.g., 2020"
              value={bookingData.yearOfManufacturing}
              onChange={(e) => handleInputChange('yearOfManufacturing', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="kmReading">KM Reading</Label>
            <Input
              id="kmReading"
              type="number"
              placeholder="e.g., 25000"
              value={bookingData.kmReading}
              onChange={(e) => handleInputChange('kmReading', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="specificIssues">Any Specific Issues?</Label>
            <Textarea
              id="specificIssues"
              placeholder="Any additional details..."
              value={bookingData.specificIssues}
              onChange={(e) => handleInputChange('specificIssues', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}