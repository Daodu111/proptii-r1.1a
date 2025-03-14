import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * A reusable form field component with label and error handling
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  children,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {children}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField; 