import * as classNames from "classnames";
import * as React from "react";
import * as ButtonType from "./types";
import * as styles from "./Button.css";
import * as Component from "../Component";

const { COLORS, SIZES, TEXT_ALIGN } = Component;

class Button extends React.PureComponent<ButtonType.Props> {
	public static defaultProps: Partial<ButtonType.Props> = {
		textAlign: TEXT_ALIGN.center
	};

	public render() {
		const {
			children,
			label,
			color = COLORS.primary,
			className,
			padding = SIZES.m,
			fluid = false,
			textAlign,
			...props
		} = this.props;
		const classes = classNames(
			styles.button,
			{
				[styles.primary]: color === COLORS.primary,
				[styles.light]: color === COLORS.light,
				[styles.regular]: color === COLORS.regular,
				[styles.warning]: color === COLORS.warning,
				[styles.danger]: color === COLORS.danger,
				[styles.paddingRegular]: padding === SIZES.m,
				[styles.paddingSmall]: padding === SIZES.s
			},
			className
		);

		return (
			<button {...props} aria-label={label} className={classes}>
				{children}
			</button>
		);
	}
}

export default Component.BaseComponent<ButtonType.Props>(Button);
