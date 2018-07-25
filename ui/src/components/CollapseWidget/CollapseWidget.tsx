import * as React from "react";

import * as cn from "classnames";
import Title from "../Title/Title";
import * as Collapse from "../Collapse/Collapse";
import * as styles from "./CollapseWidget.css";
import * as BaseTypes from "../../../../types";

export interface Props
	extends BaseTypes.Omit<Collapse.Props, "labelExpanded" | "labelCollapsed"> {
	title: string;
}

export const CollapseWidget: React.SFC<Props> = ({
	children,
	className,
	title,
	...props
}) => {
	const rootClassnames = cn(className, styles.root);
	const Label: React.SFC<Collapse.LabelProps> = providedProps => {
		const labelClassName = cn(providedProps.className, styles.label);

		return (
			<div>
				<Title
					{...providedProps}
					className={labelClassName}
					weight="normal"
					color="light"
					type="h3"
				>
					{title}
					<span className={styles.labelIcon} />
				</Title>
			</div>
		);
	};

	return (
		<div className={rootClassnames}>
			<Collapse.default
				{...props}
				labelExpanded={Label}
				labelCollapsedClassName={styles.collapsedLabel}
				labelExpandedClassName={styles.expandedLabel}
			>
				{children}
			</Collapse.default>
		</div>
	);
};

export default CollapseWidget;
