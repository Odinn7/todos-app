import React, { useState } from 'react';
import axios from "axios";
import { PLUS_ICON_URL, TASKS_BASE_URL } from '../../urls'
import { TasksInterface } from "../../Interfaces/TasksInterface";

import './styles.css'


export const AddNewtaskForm = ({list, onAddTask}: TasksInterface) => {
	const [isVisibleForm, setIsVisibleForm] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	
	const visibilityToggle = () => {
		setIsVisibleForm(!isVisibleForm)
	}
	
	const addNewTask = () => {
		const tasksObj = {
			"listId": list.id,
			"text": inputValue,
			"completed": false
		}
		axios
			.post(TASKS_BASE_URL, tasksObj).then(({data}) => {
			console.log(data)
			onAddTask(list.id, tasksObj)
			visibilityToggle()
			setInputValue('')
		})
	}
	
	return (
		<div className="form">
			{!isVisibleForm ?
			 <div className="form__new"
				  onClick={visibilityToggle}>
				 <img alt="addIcon" src={PLUS_ICON_URL}/>
				 <span>Новая задача</span>
			 </div>
							:
			 <div className="form__block">
				 <input value={inputValue} type="text" placeholder="New Task"
						onChange={event => setInputValue(event.target.value)}/>
				 <div className="button__wrapper">
					 <button disabled={isLoading} onClick={addNewTask}
							 className="button__wrapper-button">
						 {isLoading ? "Добавление задачи" : "Добавить "}
					 </button>
					 <button className="button__wrapper-button"
							 onClick={visibilityToggle}>Cancel
					 </button>
				 </div>
			 </div>
			}
		</div>
	)
}

