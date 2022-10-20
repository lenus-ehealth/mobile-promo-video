import React, {HTMLAttributes} from 'react';
import {Img} from 'remotion';
import styled from 'styled-components';

export const PhoneWidth = 100;
export const PhoneHeight = 150;

const Container = styled.div`
	width: ${PhoneWidth}px;
	height: ${PhoneHeight}px;
	position: absolute;
`;

export const Phone: React.FC<
	HTMLAttributes<HTMLDivElement> & {
		phoneScale: number;
		src: HTMLImageElement['src'];
	}
> = (props) => {
	const {phoneScale, src, ...otherProps} = props;
	return (
		<Container {...otherProps}>
			<Img
				src={src}
				style={{
					top: 12,
					paddingRight: 50,
					paddingLeft: 50,
					height: PhoneHeight,
					marginLeft: -PhoneWidth / 2,
					position: 'absolute',
					transform: `scale(${phoneScale})`,
				}}
			/>
			<Img
				src={require("../assets/frame.png")}
				style={{
					position: 'absolute',
					paddingRight: 50,
					paddingLeft: 50,
					height: PhoneHeight + 33,
					marginLeft: -PhoneWidth * 1.78,
					transform: `scale(${phoneScale})`,
				}}
			/>
		</Container>
	);
};
