import * as React from "react";
import * as cn from "classnames";
import Logo from "../Logo/Logo";
import Pane from "../Pane/Pane";
import Button from "../Button/Button";
import * as styles from "./Layout.css";

const Loading = () => {
	return <div className={styles.loader} />;
};

const ErrorMessage = () => {
	return (
		<div className={styles.error}>
			<Pane type="danger">Не удалось получить данные</Pane>
			<Button onClick={() => location.reload()}>Попробовать еще раз</Button>
		</div>
	);
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	isLoading?: boolean;
	isFail?: boolean;
}

class Layout extends React.PureComponent<Props> {
	public render() {
		const { children, className, isLoading, isFail } = this.props;
		const bodyClasses = cn(className, styles.body);

		return (
			<div className={styles.root}>
				<div className={styles.header}>
					<Logo />
				</div>
				{isLoading ? (
					<Loading />
				) : isFail ? (
					<ErrorMessage />
				) : (
					<div className={bodyClasses}>{children}</div>
				)}
			</div>
		);
	}
}

export default Layout;
