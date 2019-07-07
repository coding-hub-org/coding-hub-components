import React, {
	FunctionComponent,
	useState,
	useEffect,
	ChangeEvent
} from 'react';

export type InputBlockType = {
	label?: string;
	id?: string;
	type: string;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	maxLength?: number;
	onChange?: Function;
	regex?: RegExp;
	validationMessage?: string;
};

const InputBlock: FunctionComponent<InputBlockType> = props => {
	const {
		label,
		id,
		type,
		className,
		placeholder,
		disabled,
		onChange,
		maxLength,
		regex,
		validationMessage
	} = props;

	const [attr, setAttr] = useState({
		value: '',
		hasChanged: false,
		displayMsg: false
	});

	useEffect(() => {
		if (regex) {
			setAttr({
				...attr,
				displayMsg: attr.value.match(regex) ? false : true
			});
		}
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAttr({ ...attr, value: e.target.value, hasChanged: true });
		if (onChange) onChange(e.target.value);
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
				className="ui-input-block-field"
			/>
			<div className="ui-input-block-vmessage">
				{attr.displayMsg && attr.hasChanged ? validationMessage : ''}
			</div>
		</div>
	);
};

export default InputBlock;
