import React from 'react';
import {Audio, Series, Video} from 'remotion';
import EndLogo from '../Circle';
import Layout from '../Layout';
import RealStickers from '../RealStickers';
import ScreenShowcase from '../ScreenShowcase';
import {Title} from '../Title';
import {Transition} from '../Transition';
import audio from './audio.mp4';


export const Welcome: React.FC<{
	phoneScale: number;
}> = ({phoneScale}) => {

	const objectGetImages = (name:string) =>  (f: number) =>
		require(`./${name}/` + (f + 1) + '.png');

	return (
		<div style={{flex: 1, display: 'flex', backgroundColor: '#72986d'}}>
			<Series>
				<Series.Sequence durationInFrames={70}>
					<Title line1="Welcome to" line2="Coach Ducky Duck" />
				</Series.Sequence>
				
				<Series.Sequence durationInFrames={174}>
					<Transition type="out">
						<ScreenShowcase
							animateIn
							title="Chat with coach"
							getImage={objectGetImages("chat")}
						/>
					</Transition>
				</Series.Sequence>
				<Series.Sequence durationInFrames={110}>
					<Transition type="in">
						<Transition type="out">
							<ScreenShowcase
								title="Customize Workout"
								getImage={objectGetImages("workout")}
								animateIn={false}
							/>
						</Transition>
					</Transition>
				</Series.Sequence>
				<Series.Sequence durationInFrames={240}>
					<Transition type="in">
						<Transition type="out">
							<ScreenShowcase
								title="Get meal plan"
								getImage={objectGetImages("meals")}
								animateIn={false}
							/>
						</Transition>
					</Transition>
				</Series.Sequence>
				
				<Series.Sequence durationInFrames={99}>
					<Transition type="in">
						<Transition type="out">
							<ScreenShowcase
								title="Join the community"
								getImage={objectGetImages("groups")}
								animateIn={false}
							/>
						</Transition>
					</Transition>
				</Series.Sequence>

				<Series.Sequence durationInFrames={70}>
					<Title line1="All You Need" line2="In One Place" />
				</Series.Sequence>

				<Series.Sequence durationInFrames={70}>
					<Layout />
				</Series.Sequence>
				
				<Series.Sequence durationInFrames={90}>
					<RealStickers phoneScale={phoneScale} />
				</Series.Sequence>

				<Series.Sequence durationInFrames={90}>
					<Title line1="Your Health Revolution" line2="Starts here." />
				</Series.Sequence>
				{/* <Series.Sequence durationInFrames={75}>
					<EndLogo />
				</Series.Sequence> */}
			</Series>
			
			<Audio src={audio} />
		</div>
	);
};
