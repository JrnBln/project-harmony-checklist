
import { useState, useEffect } from 'react';

export type FormField = {
  name: string;
  required?: boolean;
};

export function useFormProgress(formData: Record<string, any>, fields: FormField[]) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate how many fields are filled
    const filledFields = fields.filter(field => {
      const value = formData[field.name];
      // Check if field has a value
      if (value === undefined || value === null || value === '') {
        return false;
      }
      
      // For arrays, check if not empty
      if (Array.isArray(value) && value.length === 0) {
        return false;
      }
      
      // For objects, check if has properties (except Date objects)
      if (typeof value === 'object' && !(value instanceof Date) && Object.keys(value).length === 0) {
        return false;
      }
      
      return true;
    });

    // Calculate percentage
    const filledCount = filledFields.length;
    const totalFields = fields.length;
    const percentage = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;
    
    setProgress(percentage);
  }, [formData, fields]);

  return progress;
}
