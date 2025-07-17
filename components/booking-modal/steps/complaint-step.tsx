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
import { useState } from 'react';

export function ComplaintStep() {
  const { bookingData, setBookingData } = useBookingStore();
  const [date, setDate] = useState<Date>();

  const handleInputChange = (field: string, value: string) => {
    setBookingData({ [field]: value });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setBookingData({ serviceDate: format(selectedDate, 'yyyy-MM-dd') });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Service Details</h2>
        <p className="text-muted-foreground">Tell us about your service requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
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