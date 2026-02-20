import React from "react";

/**
 * Honeypot component to prevent bot submissions.
 * This field is hidden from real users but bots will likely fill it.
 */
export function Honeypot({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
                id="website"
                name="website"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
            />
        </div>
    );
}
