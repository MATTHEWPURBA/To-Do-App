'use client';

import React from 'react';

type IconPickerProps = {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
};

const icons = [
  { name: 'alarm_clock', imgSrc: '/img/alarm_clock.png' },
  { name: 'books', imgSrc: '/img/books.png' },
  { name: 'coffee', imgSrc: '/img/coffee.png' },
  { name: 'speech_balloon', imgSrc: '/img/speech_balloon.png' },
  { name: 'weight_lifter', imgSrc: '/img/weight_lifter.png' },
];

const IconPicker = ({ selectedIcon, onSelectIcon }: IconPickerProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {icons.map(({ name, imgSrc }) => (
        <div
          key={name}
          className={`p-2 cursor-pointer ${
            selectedIcon === name ? 'border-2 border-blue-500' : ''
          }`}
          onClick={() => onSelectIcon(name)}
        >
          <img src={imgSrc} alt={name} className="w-12 h-12" />
        </div>
      ))}
    </div>
  );
};

export default IconPicker;
