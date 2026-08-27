import React, { useRef, useEffect, useState } from 'react';

type PillSliderProps = {
	value: number;
	min: number;
	max: number;
	onChange: (value: number) => void;
	label?: string;
	divisor?: number;
	unit?: string;
	padLength?: number;
	disabled?: boolean;
};

const PillSlider = ({ value, min, max, onChange, label = 'Animation speed', divisor = 1000, unit = 's', padLength, disabled }: PillSliderProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const onChangeRef = useRef(onChange);
	const dragValueRef = useRef(value);
	const isDragging = useRef(false);

	onChangeRef.current = onChange;

	const [displayValue, setDisplayValue] = useState(value);

	const pct = Math.max(0, Math.min(100, ((displayValue - min) / (max - min)) * 100));

	const valueText = divisor === 1 ? String(displayValue) : (displayValue / divisor).toFixed(1);

	const calcValue = (clientX: number, rect: DOMRect) => {
		const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
		return Math.round(min + x * (max - min));
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (disabled) return;
		isDragging.current = true;
		const rect = e.currentTarget.getBoundingClientRect();
		const v = calcValue(e.clientX, rect);
		dragValueRef.current = v;
		setDisplayValue(v);
	};

	useEffect(() => {
		if (!isDragging.current) {
			setDisplayValue(value);
		}
	}, [value]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging.current || !containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const v = calcValue(e.clientX, rect);
			dragValueRef.current = v;
			setDisplayValue(v);
		};
		const handleMouseUp = () => {
			if (isDragging.current) {
				isDragging.current = false;
				onChangeRef.current(dragValueRef.current);
			}
		};
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={`pill-slider${disabled ? ' pill-slider-disabled' : ''}`}
			onMouseDown={handleMouseDown}
			role="slider"
			tabIndex={disabled ? -1 : 0}
			aria-disabled={disabled}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
		>
			<div className="pill-slider-fill" style={{ width: `${pct}%` }} />
			<span className="pill-slider-label">
				{label}: <span className="pill-slider-value" style={padLength ? { minWidth: `${padLength}ch` } : undefined}>{valueText}</span>{unit}
			</span>
			<span className="pill-slider-label-fill" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }} aria-hidden="true">
				{label}: <span className="pill-slider-value" style={padLength ? { minWidth: `${padLength}ch` } : undefined}>{valueText}</span>{unit}
			</span>
		</div>
	);
};

export default PillSlider;
