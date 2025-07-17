'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      {/* Mobile Stepper */}
      <div className="block sm:hidden mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Step {currentStep + 1} of {steps.length}</span>
          <span className="font-medium">{steps[currentStep]}</span>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors',
                {
                  'bg-primary text-primary-foreground border-primary': index <= currentStep,
                  'bg-background text-muted-foreground border-muted': index > currentStep,
                  'cursor-pointer hover:border-primary/50': onStepClick && index <= currentStep,
                }
              )}
              onClick={() => onStepClick?.(index)}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2 sm:mx-4 transition-colors',
                  {
                    'bg-primary': index < currentStep,
                    'bg-muted': index >= currentStep,
                  }
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}