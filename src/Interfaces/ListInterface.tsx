export interface ListInterface {
	items: Array<{ id?: number, icon?: any, name: string, tasks?: any[], active?: boolean, className?: string }>,
	active?: boolean,
	isRemovable?: boolean,
	onClick?: () => void,
	onRemove?: (items: any) => void,
	onChooseList?: (item: any) => void,
	activeList?: null
}