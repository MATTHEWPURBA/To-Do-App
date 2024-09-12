'use client';

import React from 'react';
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaQuestionCircle,
} from 'react-icons/fa';

type IconPickerProps = {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
};

const icons = [
  { name: 'FaCheckCircle', icon: FaCheckCircle },
  { name: 'FaHourglassHalf', icon: FaHourglassHalf },
  { name: 'FaTimesCircle', icon: FaTimesCircle },
  { name: 'FaQuestionCircle', icon: FaQuestionCircle },
];

const IconPicker = ({ selectedIcon, onSelectIcon }: IconPickerProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {icons.map(({ name, icon: Icon }) => (
        <div
          key={name}
          className={`p-2 cursor-pointer ${
            selectedIcon === name ? 'border-2 border-blue-500' : ''
          }`}
          onClick={() => onSelectIcon(name)}
        >
          <Icon className="text-3xl" />
        </div>
      ))}
    </div>
  );
};

export default IconPicker;
