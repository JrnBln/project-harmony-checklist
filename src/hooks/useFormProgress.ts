
import { useState, useEffect } from 'react';

export interface FieldConfig {
  name: string;
  required?: boolean;
  validator?: (value: FieldValue) => boolean;
}

type FieldValue = string | number | boolean | undefined | null;

export function useFormProgress(fields: FieldConfig[], formData: Record<string, FieldValue>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Count how many fields are filled
    let filledFields = 0;
    let totalWeight = fields.length;

    for (const field of fields) {
      const value = formData[field.name];
      const isValid = field.validator 
        ? field.validator(value)
        : value !== undefined && value !== null && value !== '';
      
      if (isValid) {
        filledFields++;
      }
    }

    // Calculate progress percentage
    const calculatedProgress = totalWeight > 0 
      ? (filledFields / totalWeight) * 100
      : 0;
    
    setProgress(calculatedProgress);
  }, [fields, formData]);

  return progress;
}
