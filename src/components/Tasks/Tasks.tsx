import React from 'react';
import { AddNewtaskForm } from "../AddNewTaskForm/AddNewtaskForm";
import { BASE_URL, REMOVE_ICON_URL } from "../../urls";
import axios from "axios";

import './styles.css'
import { TasksInterface } from "../../Interfaces/TasksInterface";


const PEN_URL = "https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/344/external-pen-user-interface-tanah-basah-detailed-outline-tanah-basah.png"
const CHECK_ICON_URL = "https://cdn-icons-png.flaticon.com/512/7065/7065849.png"

export const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, onEditTask}: TasksInterface) => {
	const editTitle = () => {
		const newTitle = prompt('New title', list.name)
		if (newTitle) {
			onEditTitle(list.id, newTitle)
			axios.patch(BASE_URL + list.id, {
				name: newTitle
			});
		}
	}
	
	return (
		<div className="tasks">
			<h2 className="tasks__title">
				{list.name}
				<img
					alt="name"
					className="tasks__title-editIcon"
					src={PEN_URL}
					onClick={editTitle}
				/>
			</h2>
			<div className="tasks__items">
				{
					!list.tasks?.length && <h2>Задачи отсутствуют</h2>
				}
				{
					list && list.tasks.map(
						(task: any) =>
							<div className="tasks__items-row">
								<div className="checkbox">
									<input id={`task-${task.id}`} type="checkbox"/>
									<label htmlFor={`task-${task.id}`}>
										<img className="checkImg" src={CHECK_ICON_URL}/>
									</label>
								</div>
								<div className="tasks__items-row-task">
									<p>{task.text}</p>
									<div onClick={() => onEditTask(list.id, task)}>
										<img className="penIcon" src={PEN_URL}/>
									</div>
									<div onClick={() => onRemoveTask(list.id, task.id)}>
										<img className="removeIcon" src={REMOVE_ICON_URL}/>
									</div>
								
								</div>
							
							</div>
					)
				}
				<AddNewtaskForm list={list} onAddTask={onAddTask}/>
			</div>
		</div>
	)
}

