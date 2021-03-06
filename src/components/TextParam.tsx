import React, { FunctionComponent, ChangeEvent, Fragment, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import languages from 'iso-639-1';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';

import { useStore } from 'src/hooks/useStore';
import Text from 'src/models/Text';
import DangerButton from 'src/components/DangerButton';

const LanguageList = styled.div`
	display: table;
`;
const LanguageRow = styled.div`
	display: table-row;

	* {
		display: table-cell;
		vertical-align: middle;
	}
`;

const LangLabel = styled.label`
	text-align: right;
`;

const ParamsBox: FunctionComponent = () => {
	const { editor: { selectedEntity } } = useStore();
	const selectRef = useRef(null);

	if (!Text.is(selectedEntity)) return null;

	const onChangeText = (ev: ChangeEvent<HTMLTextAreaElement>, code: string): void => {
		selectedEntity.setCopy(code, ev.target.value);
	};

	const onAddLanguage = (): void => {
		if (selectRef.current === null) return;

		// why is typescript being dumb?
		// @ts-ignore
		selectedEntity.setCopy(selectRef.current.value, '');
	};

	const onRemoveLanguage = (code: string): void => {
		if (selectRef.current === null) return;

		selectedEntity.removeLang(code);
	};

	const unusedLanguages = Object.entries(selectedEntity.params.copy)
		.filter(([, copy]) => copy === undefined)
		.map(([code]) => code);

	return (
		<Fragment>
			<LanguageList>
				{Object.entries(selectedEntity.params.copy)
					.filter(([, copy]) => copy !== undefined)
					.map(([code, copy]) => (
						<LanguageRow key={code}>
							<div>
								<LangLabel htmlFor={`text-param-${code}`}>{languages.getNativeName(code)}:</LangLabel>
								{code !== 'en' && (
									<DangerButton
										onClick={(): void => onRemoveLanguage(code)}
										confirmationMessage="Are you sure you want to remove this language?"
										title="Remove language"
									>
										<FontAwesomeIcon icon={faTrashAlt}/>
									</DangerButton>
								)}
							</div>
							<textarea
								id={`text-param-${code}`}
								rows={3}
								cols={40}
								wrap="off"
								value={copy}
								onChange={(ev): void => onChangeText(ev, code)}
								minLength={1}
							/>
						</LanguageRow>
					))}
			</LanguageList>
			<div>
				<select ref={selectRef}>
					{unusedLanguages.map((code) => (
						<option key={code} value={code}>{languages.getNativeName(code)}</option>
					))}
				</select>
				<button onClick={onAddLanguage}>
					<FontAwesomeIcon icon={faLanguage}/>
					&#32;
					Add language
				</button>
			</div>
		</Fragment>
	);
};

export default observer(ParamsBox);
