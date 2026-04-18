import dynamicIconImports from 'lucide-react/dynamicIconImports';

export const isValidIcon = (name: string): name is IconName => {
	return name in dynamicIconImports;
};

export const getValidIcon = (name: string): IconName => {
	return isValidIcon(name) ? name : "user";
};

export type IconName = keyof typeof dynamicIconImports;
