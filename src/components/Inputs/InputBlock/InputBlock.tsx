import React, {
	FunctionComponent,
	useState,
	ChangeEvent,
	FocusEvent
} from 'react';

export interface ValidationMessageType {
	message: string;
	regex: RegExp;
}

export type InputBlockType = {
	label?: string;
	id?: string;
	type: string;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	maxLength?: number;
	onChange?: Function;
	validationMessage?: ValidationMessageType;
};

const InputBlock: FunctionComponent<InputBlockType> = ({
	label,
	id,
	type,
	className,
	placeholder,
	disabled,
	onChange,
	maxLength,
	validationMessage
}) => {
	const [attr, setAttr] = useState({
		value: '',
		hasChanged: false,
		wasBlurred: false
	});

	const displayMsg = validationMessage
		? attr.value.match(validationMessage.regex)
			? false
			: true
		: true;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAttr({ ...attr, value: e.target.value, hasChanged: true });
		if (onChange) onChange(e.target.value);
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		e.preventDefault();
		setAttr({ ...attr, wasBlurred: true });
	};

	return (
		<div className={`ui-input-block-wrapper ${className}`}>
			<label htmlFor={id} className="ui-input-block-label">
				{label}
			</label>
			<input
				type={type}
				maxLength={maxLength}
				onChange={e => handleChange(e)}
				placeholder={placeholder}
				disabled={disabled ? disabled : false}
				onBlur={e => handleBlur(e)}
				className="ui-input-block-field"
			/>
			<div className="ui-input-block-vmessage">
				{displayMsg && attr.hasChanged && attr.wasBlurred
					? validationMessage
						? validationMessage.message
						: ''
					: ''}
			</div>
		</div>
	);
};

export default InputBlock;
