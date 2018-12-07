import React from 'react';

export function Search({ defaultValue, onChange }) {
    return (
        <div className="Search">
            <input
                type         = "text"
                placeholder  = "Search for a beer"
                defaultValue = {defaultValue}
                onChange     = {(evt) => onChange(evt.target.value)}
            />
        </div>
    );
}