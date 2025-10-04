'use client';

import { useBookingStore } from '@/store/booking-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldWrapper } from '../field-wrapper';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ComplaintStepProps {
  errors?: { [key: string]: string };
}

export function ComplaintStep({ errors = {} }: ComplaintStepProps) {
  const { bookingData, setBookingData } = useBookingStore();
  const [date, setDate] = useState<Date | undefined>(
    bookingData.serviceDate ? new Date(bookingData.serviceDate) : undefined
  );

  const handleInputChange = (field: string, value: string) => {
    setBookingData({ [field]: value });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setBookingData({ serviceDate: format(selectedDate, 'yyyy-MM-dd') });
    }
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 35 }, (_, i) => currentYear - i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Service Details</h2>
        <p className="text-muted-foreground">Provide your vehicle and service information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldWrapper
          label="Preferred Service Date"
          htmlFor="serviceDate"
          error={errors.serviceDate}
          required
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="serviceDate"
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !date && 'text-muted-foreground'
                } ${errors.serviceDate && 'border-red-500'}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Select service date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FieldWrapper>

        <FieldWrapper
          label="Preferred Time Slot"
          htmlFor="serviceTime"
          error={errors.serviceTime}
          required
        >
          <Select
            value={bookingData.serviceTime}
            onValueChange={(value) => handleInputChange('serviceTime', value)}
          >
            <SelectTrigger id="serviceTime" className={errors.serviceTime && 'border-red-500'}>
              <SelectValue placeholder="Select time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldWrapper>

        <FieldWrapper
          label="Vehicle Plate Number"
          htmlFor="plateNumber"
          error={errors.plateNumber}
          required
          className="md:col-span-2"
        >
          <Input
            id="plateNumber"
            placeholder="e.g., KA12AB1234"
            value={bookingData.plateNumber || ''}
            onChange={(e) => handleInputChange('plateNumber', e.target.value.toUpperCase())}
            className={errors.plateNumber && 'border-red-500'}
            maxLength={13}
          />
        </FieldWrapper>

        <FieldWrapper
          label="Year of Manufacturing"
          htmlFor="yearOfManufacturing"
          error={errors.yearOfManufacturing}
          required
        >
          <Select
            value={bookingData.yearOfManufacturing}
            onValueChange={(value) => handleInputChange('yearOfManufacturing', value)}
          >
            <SelectTrigger id="yearOfManufacturing" className={errors.yearOfManufacturing && 'border-red-500'}>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldWrapper>

        <FieldWrapper
          label="KM Reading"
          htmlFor="kmReading"
          error={errors.kmReading}
          required
        >
          <Input
            id="kmReading"
            type="number"
            placeholder="e.g., 25000"
            value={bookingData.kmReading || ''}
            onChange={(e) => handleInputChange('kmReading', e.target.value)}
            className={errors.kmReading && 'border-red-500'}
            min="0"
          />
        </FieldWrapper>

        <FieldWrapper
          label="Describe Your Issue"
          htmlFor="complaint"
          error={errors.complaint}
          required
          className="md:col-span-2"
        >
          <Textarea
            id="complaint"
            placeholder="Please describe your vehicle's issue or service requirement in detail..."
            value={bookingData.complaint || ''}
            onChange={(e) => handleInputChange('complaint', e.target.value)}
            className={`min-h-[100px] ${errors.complaint && 'border-red-500'}`}
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground text-right mt-1">
            {(bookingData.complaint || '').length}/500 characters
          </div>
        </FieldWrapper>
      </div>
    </motion.div>
  );
}
