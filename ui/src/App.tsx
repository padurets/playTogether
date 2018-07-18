import "./assets/styles";
import * as React from "react";
import { render } from "react-dom";
import * as styles from "./App.css";
import Logo from "./components/Logo/Logo";
import UserSelect from "./components/UserSelect/UserSelect";

const generateRootNode = () => {
	const node = document.createElement("div");
	document.body.appendChild(node);
	return node;
};

console.log("object");

class App extends React.PureComponent {
	public render() {
		return (
			<div className={styles.root}>
				<div className={styles.leftColumn}>
					<Logo />
					<UserSelect />
				</div>
				<div className={styles.rightColumn}>123</div>
			</div>
		);
	}
}

render(<App />, generateRootNode());
