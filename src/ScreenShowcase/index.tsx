import React from 'react';
import {
	Img,
	interpolate,
	spring,
	SpringConfig,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

type Props = {
	title: string;
	getImage: (frame: number) => string;
	animateIn: boolean;
};

const ScreenShowcase: React.FC<Props> = ({
	title = 'Hi',
	getImage,
	animateIn = true,
}) => {
	const frame = useCurrentFrame();

	const {fps} = useVideoConfig();
	const src = getImage(frame);

	const springConfig: SpringConfig = {
		damping: 100,
		mass: 0.2,
		stiffness: 100,
		overshootClamping: false,
	};

	const base = animateIn
		? spring({
				config: springConfig,
				from: 0,
				to: 1,
				fps,
				frame,
		  })
		: 1;

	const progress = interpolate(base, [0, 1], [0.8, 1]);

	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<div
				style={{
					fontSize: 80,
					fontFamily: 'Comfortaa',
					fontWeight: 'bold',
					width: '100%',
					position: 'absolute',
					textAlign: 'center',
					top: 230,
					color: 'white',
					transform: `scale(${progress}) translateY(${(1 - base) * 50}px)`,
				}}
			>
				{title}
			</div>
			<Img
				src={src}
				style={{
					position: 'absolute',
					transform: `scale(${1.5 * progress})`,
					top: 700,
					width: 1080/3,
					marginLeft:1080 /3,
				}}
			/>
			<Img
				src={require("../assets/frame.png")}
				style={{
					position: 'absolute',
					top: 623,
					width: 1080 * 1.55,
					marginLeft:-1080 * 0.276 ,
					transform: `scale(${1.5 * progress})`,
				}}
			/>
		</div>
	);
};

export default ScreenShowcase;
