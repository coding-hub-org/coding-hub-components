import { storiesOf } from '@storybook/react';
import * as React from 'react';
import InputBlock, { ValidationMessageType } from './InputBlock';
import '../../../styles/components/Inputs/InputBlock.scss';

const backgroundStyle = {
	width: '100%',
	height: '70vh',
	backgroundColor: 'black'
};

const inputBlockContainer = {
	width: '300px',
	padding: '50px'
};

const vMsg: ValidationMessageType = {
	message: 'Please enter a valid email',
	regex: /.+\@.+\..+/
};

storiesOf('InputBlock', module)
	.add('without regex', () => (
		<div style={backgroundStyle}>
			<div style={inputBlockContainer}>
				<InputBlock
					type="text"
					onChange={(val: string) => console.log(val)}
					label="Email"
					placeholder="Insert Email Here"
				/>
			</div>
		</div>
	))
	.add('with regex', () => (
		<div style={backgroundStyle}>
			<div style={inputBlockContainer}>
				<InputBlock
					type="text"
					onChange={(val: string) => console.log(val)}
					label="Email"
					placeholder="Insert Email Here"
					validationMessage={vMsg}
				/>
			</div>
		</div>
	));
