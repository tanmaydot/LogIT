import React, { ChangeEvent } from 'react';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  total: number;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateChange, total }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select a date';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const selectedDate = new Date(value);
    const today = new Date();

    // Check if the selected date is in the future, and if so, ignore the change
    if (selectedDate > today) {
      alert('future dates are not selectable')
      return;
    }

    onDateChange(value);
  };

  return (
    <div className="mb-4 flex items-center">
      <label htmlFor="datePicker" className="mr-2 text-green-700">
        Select Date:
      </label>
      <input
        id="datePicker"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="p-2 border border-green-800 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
      />
      <div className="ml-4 p-2 border bg-green-400 rounded-lg">
        <p>Date: {formatDate(selectedDate)}</p>
        <p>Total: ₹ {total.toFixed(0)}</p>
      </div>
    </div>
  );
};

export default DateSelector;
