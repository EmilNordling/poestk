import React, { Fragment, useMemo } from 'react';
import style from './style';
import { StatsComponent } from './types';
import Paragraph from '../../../../ui/common/Paragraph';

const Stat: React.FC<{ description: string, value: string }> = ({ description, value }) => {
	return (
		<style.StatsDisplayStyle>
			<style.Description>
				<Paragraph align='right'>{description}:</Paragraph>
			</style.Description>
			<style.Value>
				<Paragraph color='#1fb6ff'>{value}</Paragraph>
			</style.Value>
		</style.StatsDisplayStyle>
	);
};

const Stats: React.FC<StatsComponent.Props> = ({ character }) => {
	const attributes = Object.entries(character.getStats()).map(([tag, stats]) => {
		const jsxStatList = stats.map((stat) => {
			return useMemo(() => <Stat key={stat.raw.hash} description={stat.raw.property} value={stat.transpiled} />, []);
		});

		return (
			<style.StatItem key={tag}>
				{jsxStatList}
			</style.StatItem>
		);
	});

	return (
		<Fragment>
			{attributes}
		</Fragment>
	);
};

export default Stats;
