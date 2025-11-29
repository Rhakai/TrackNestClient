import React from 'react';

export default function NotImplemented() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400">
            {/* Monochromatic Sad Icon */}
            <i 
                className="pi pi-face-frown" 
                style={{ fontSize: '5rem' }} 
                aria-hidden="true"
            ></i>

            {/* Bold Message */}
            <h2 className="text-2xl font-bold mt-4 text-gray-600">
                Not Yet Implemented, sorry
            </h2>
            
            <p className="mt-2 text-gray-400">
                We are working hard to bring this feature to life.
            </p>
        </div>
    );
}