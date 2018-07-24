// import * as classNames from "classnames";
import * as React from "react";
// import * as queryString from "query-string";
import Layout from "../../components/Layout/Layout";
import Text from "../../components/Text/Text";
import UserSelect from "../../components/UserSelect/UserSelect";
import * as styles from "./Home.css";

class HomePage extends React.PureComponent {
	public render() {
		return (
			<Layout className={styles.root}>
				<Text className={styles.note}>
					Найдите общие мультиплеерные игры в Steam у вас и ваших друзей!
					<br />
					Для этого введите ссылки на профили, разделив их пробелом или новой
					стройкой:
				</Text>
				<UserSelect submitButtonText="Выбрать" />
			</Layout>
		);
	}
}

export default HomePage;
