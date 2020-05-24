import React, { FunctionComponent, Fragment, ChangeEvent, useMemo } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import { useStore } from 'src/hooks/useStore';
import { EditorMode } from 'src/types/editor';
import AddButton from 'src/components/AddButton';
import Icon from 'src/components/Icon';
import cursor from 'static/icons/cursor.svg';
import addVertex from 'static/icons/add_vertex.svg';
import BlockM from 'src/models/Block';
import { buttonCss, primaryButtonCss } from 'src/utils/buttons';

const RadioGroup = styled.fieldset`
	display: flex;
	list-style-type: none;
	position: absolute;
	top: 0;
	left: 0;
	border: none;
	background-color: white;
	margin: 0;
	padding: 0;
`;

const Label = styled.label`
	${buttonCss}
	cursor: pointer;
	display: flex;
	align-items: center;
`;

const RadioButton = styled.input`
	display: none;
	&:checked + label {
		${primaryButtonCss}
	}
`;

const SelectButton: FunctionComponent = () => (
	<Icon src={cursor}/>
);
const AddVertexButton: FunctionComponent = () => (
	<Icon src={addVertex}/>
);

const icons = {
	[EditorMode.select]: SelectButton,
	[EditorMode.addBlock]: AddButton,
	[EditorMode.addVertex]: AddVertexButton,
};

const ModeBar: FunctionComponent = () => {
	const { editor } = useStore();
	const availableModes: Array<EditorMode> = useMemo(() => (
		editor.selectedEntity === undefined || !BlockM.is(editor.selectedEntity)
			? Object.values(EditorMode).filter((mode) => mode !== EditorMode.addVertex)
			: Object.values(EditorMode)
	), [editor.selectedEntity]);

	function onChange(ev: ChangeEvent<HTMLInputElement>): void {
		if (!availableModes.some((allowedMode) => allowedMode === ev.target.value)) {
			throw new TypeError('Incorrect editor mode');
		}
		const newMode: EditorMode = EditorMode[ev.target.value as keyof typeof EditorMode];
		editor.setMode(newMode);
	}

	return (
		<RadioGroup>
			{availableModes.map((availableMode: EditorMode) => {
				const selected = availableMode === editor.mode;
				const Component = icons[availableMode];
				return (
					<Fragment key={availableMode}>
						<RadioButton
							id={`editor-mode-${availableMode}`}
							type="radio"
							name="editor-mode"
							key={availableMode}
							value={availableMode}
							checked={selected}
							onChange={onChange}
						/>
						<Label
							htmlFor={`editor-mode-${availableMode}`}
							title={availableMode}
						>
							<Component selected={selected}/>
						</Label>
					</Fragment>
				);
			})}
		</RadioGroup>
	);
};

export default observer(ModeBar);
