const list = (usernames: string[]) =>
	fetch(`/api/commonGames?users=${usernames.join()}`);
