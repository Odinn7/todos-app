import React, { useEffect, useState } from 'react';
import { AddList, List, Tasks } from "./imports";
import axios from "axios";
import { BASE_URL, LIST_ICON, TASKS_BASE_URL } from "./urls";

import './App.css';


export const App = () => {
	const [list, setList] = useState<any[]>([])
	const [activeList, setActiveList] = useState(null)
	
	useEffect(() => {
		axios
			.get(BASE_URL + "?_embed=tasks")
			.then(({data}) => setList(data))
	}, [])
	
	const onAddList = (obj: any) => {
		const newList: any = [...list, obj]
		setList(newList)
	}
	
	const onAddTask = (listId: number, taskObj: any) => {
		const newList = list.map(item => {
			if (item.id === listId) {
				item.tasks = [...item.tasks, taskObj]
			}
			return item
		})
		setList(newList)
	}
	
	const onRemoveTask = (listId: any, taskId: any) => {
		if (window.confirm("Are u sure?")) {
			const newTasksList = list.map(items => {
				if (items.id === listId) {
					items.tasks = items.tasks.filter((task: any) => task.id !== taskId)
				}
				return items;
			})
			setList(newTasksList)
			axios.delete(TASKS_BASE_URL + taskId);
		}
	}
	
	const onRemoveList = (id: number) => {
		const listAfterRemove = list.filter(item => item.id !== id)
		setList(listAfterRemove)
	}
	
	const onEditTitle = (id: number, title: string) => {
		const newList: any = list.map(item => {
			if (item.id === id) {
				item.name = title;
			}
			return item
		})
		setList(newList)
	}
	
	const onEditTask = (listId: any, taskJSON: any) => {
		{console.log(taskJSON.id, taskJSON.text, "taskId")}
		const newTaskText = prompt('Сменить текст задачи');
		if (!newTaskText) {
			return;
		}
		
		const newList = list.map(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.map((task: any) => {
					if (task.id === taskJSON.id) {
						task.text = newTaskText;
					}
					return task;
				});
			}
			return list;
		});
		setList(newList);
		axios
			.patch(TASKS_BASE_URL + taskJSON.id, {
				text: newTaskText
			})
			.catch(error => console.log(error, "error"))
	};
	
	return (
		<div className="todo">
			<div className="todo__sidebar">
				<List items={[
					{
						icon: <img alt="icon" src={LIST_ICON}/>,
						name: "Список задач",
					},
				]}
				/>
				{list ? <List onChooseList={item => setActiveList(item)} items={list}
							  activeList={activeList}
							  onRemove={(id) => onRemoveList(id)} isRemovable/>
					  :
				 "Загрузка"}
				<AddList onAdd={onAddList}/>
			</div>
			{list && activeList &&
                <Tasks
                    list={activeList}
                    onRemoveTask={onRemoveTask}
                    onAddTask={onAddTask}
                    onEditTitle={onEditTitle}
                    onEditTask={onEditTask}
                />
			}
		</div>
	);
}
