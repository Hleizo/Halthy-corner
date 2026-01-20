import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 text-neutral-800 bg-white border rounded-xl transition-all duration-200',
            'placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-neutral-200 hover:border-neutral-300',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          className={cn(
            'mt-1.5 text-sm',
            error ? 'text-red-500' : 'text-neutral-500'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full px-4 py-2.5 text-neutral-800 bg-white border rounded-xl transition-all duration-200',
          'placeholder:text-neutral-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
          'resize-none',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-neutral-200 hover:border-neutral-300',
          className
        )}
        {...props}
      />
      {(error || helperText) && (
        <p
          className={cn(
            'mt-1.5 text-sm',
            error ? 'text-red-500' : 'text-neutral-500'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  helperText,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full px-4 py-2.5 text-neutral-800 bg-white border rounded-xl transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-neutral-200 hover:border-neutral-300',
          className
        )}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <p
          className={cn(
            'mt-1.5 text-sm',
            error ? 'text-red-500' : 'text-neutral-500'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
