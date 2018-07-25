import * as cn from "classnames";
import * as React from "react";
import * as styles from "./Collapse.css";

type Color = "light";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	isExpanded?: boolean;
	labelCollapsed?: Label;
	labelExpanded: Label;
	labelExpandedClassName?: string;
	labelCollapsedClassName?: string;
	labelPosition?: LabelPosition;
	onExpandedChange?: (e: onExpandedChangeEvent) => void;
	contentClassName?: string;
	labelBorderBottom?: boolean;
	labelBorderBottomColor?: Color;
}

export type LabelPosition = "top" | "bottom";

export interface LabelProps {
	className: string;
	onClick: (e: React.SyntheticEvent) => void;
}

export type Label = React.SFC<LabelProps>;

export interface onExpandedChangeEvent {
	isExpanded: boolean;
}

export const LABEL_POSITION = {
	top: "top" as LabelPosition,
	bottom: "bottom" as LabelPosition
};

export const COLOR = {
	light: "light" as Color
};

export interface State {
	isExpanded: boolean;
}

class Collapse extends React.PureComponent<Props, State> {
	public static defaultProps: Partial<Props> = {
		labelPosition: LABEL_POSITION.top,
		labelBorderBottom: true,
		labelBorderBottomColor: COLOR.light
	};

	public constructor(props: Props) {
		super(props);

		const { isExpanded = false } = props;

		this.state = {
			isExpanded
		};
	}

	private onExpandedChange = () => {
		const { onExpandedChange } = this.props;
		const isExpanded = !this.state.isExpanded;

		console.log("onExpandedChange");

		this.setState({ isExpanded }, () => {
			if (typeof onExpandedChange !== "undefined") {
				onExpandedChange({ isExpanded });
			}
		});
	};

	private getLabel = () => {
		const { labelCollapsed, labelExpanded } = this.props;
		const { isExpanded } = this.state;

		if (isExpanded && labelCollapsed) {
			return labelCollapsed;
		}

		if (!isExpanded && labelExpanded) {
			return labelExpanded;
		}

		return labelCollapsed || labelExpanded;
	};

	private getLabelTemplate = () => {
		const {
			labelCollapsedClassName,
			labelExpandedClassName,
			labelBorderBottom,
			labelBorderBottomColor
		} = this.props;
		const { isExpanded } = this.state;
		const labelClassName = isExpanded
			? labelExpandedClassName
			: labelCollapsedClassName;

		const Label = this.getLabel();

		const labelClasses = cn(styles.label, labelClassName, {
			[styles.labelBorderBottom]: labelBorderBottom,
			[styles.labelBorderBottomColorLight]:
				labelBorderBottomColor === COLOR.light
		});

		return <Label className={labelClasses} onClick={this.onExpandedChange} />;
	};

	public render() {
		const { children, className, labelPosition, contentClassName } = this.props;
		const { isExpanded } = this.state;
		const label = this.getLabelTemplate();

		return (
			<div className={cn(className, styles.root)}>
				{labelPosition === LABEL_POSITION.top ? label : null}
				{!isExpanded ? null : (
					<div className={cn(contentClassName, styles.content)}>{children}</div>
				)}
				{labelPosition === LABEL_POSITION.bottom ? label : null}
			</div>
		);
	}
}

export default Collapse;
