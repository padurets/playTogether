declare module "array-flatten";
declare module "fast-sort";

declare type Diff<T extends string, U extends string> = ({ [P in T]: P } &
	{ [P in U]: never } & { [x: string]: never })[T];
declare type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
