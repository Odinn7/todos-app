import React, { useState } from 'react';
import { List } from "../List/List";
import axios from "axios";
import { BASE_URL, PLUS_ICON_URL } from "../../urls";

import './styles.css'


export const AddList = (props: any) => {
	
	const [isVisible, setIsVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	
	const onCloseBtn = () => {
		setIsVisible(false)
		setInputValue('')
	}
	
	const AddButton = () => {
		if (!inputValue) {
			alert('Введите название списка')
			return;
		}
		// props.onAdd()
		axios
			.post(BASE_URL, {name: inputValue})
			.then(
				({data}) => props.onAdd(data)
			)
		onCloseBtn()
	}
	
	return (
		<div className="add-list">
			<List
				onClick={() => setIsVisible(!isVisible)}
				items={[
					{
						icon: <img src={PLUS_ICON_URL}/>,
						name: "Добавить список",
					},
				]}
			/>
			{
				isVisible && <div className="add-list__popup">
                    <input
                        onChange={
							(event) => {
								setInputValue(event.target.value)
							}
						}
                        type="text"
                        placeholder="Введите название списка"
                    />
                    <button onClick={() => AddButton()} className="button">Добавить</button>
                    <button onClick={() => onCloseBtn()} className="button">Закрыть</button>
                </div>
			}
		</div>
	)
}

