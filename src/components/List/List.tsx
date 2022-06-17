import React from 'react';
import { ListInterface } from "../../Interfaces/ListInterface";
import classNames from 'classnames';
import axios from "axios";
import { BASE_URL, REMOVE_ICON_URL } from "../../urls";

import './styles.css'


export const List = (props: ListInterface) => {
	
	const removeList = (list: any) => {
		axios.delete(BASE_URL + list.id)
			 .then(() => {
				 props.onRemove?.(list.id)
			 })
		
	}
	return (
		<ul onClick={props.onClick} className="list">
			{
				props.items.map(
					(item) =>
						<li
							key={item.id}
							className={classNames(item.className, {
								active: props.activeList && props.activeList === item
							})}
							onClick={() => props.onChooseList?.(item)}
						>
							<i>{item.icon}
							</i>
							
							<span>
							{item.name}
								{
									item.tasks && ` (${item.tasks.length})`
								}
						</span>
							{props.isRemovable &&
                                <img
                                    alt="removeIcon"
                                    onClick={() => removeList(item)}
                                    className="list__removeIcon"
                                    src={REMOVE_ICON_URL}
                                />
							}
						</li>
				)
			}
		
		</ul>
	)
	
}

