export const ButtonTypeToAction: { [type: string]: (props: unknown) => unknown | void } = {
	contact_me: () => {
		window.location.href = "/contact";
	}
};
