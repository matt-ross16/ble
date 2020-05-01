import { observer } from 'mobx-react-lite';
import React, { FunctionComponent } from 'react';
import { BitmapText } from 'react-pixi-fiber';

import { useStore } from 'src/hooks/useStore';
import { fontSize } from 'src/config';

type Props = {
	color: number;
	[index: string]: unknown;
};

const PixiApp: FunctionComponent<Props> = ({ color, ...props }) => {
	const { editor: { fontLoaded } } = useStore();

	if (!fontLoaded) return null;

	return (
		<BitmapText
			{...props}
			font={`${fontSize} Press Start 2P`}
			tint={color}
		/>
	);
};
export default observer(PixiApp);
