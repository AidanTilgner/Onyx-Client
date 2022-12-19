import { ONYX_CORE_INSTANCE_HOST } from "$env/static/private";
import axios from "axios";

export const onyxCore = axios.create({
	baseURL: ONYX_CORE_INSTANCE_HOST,
	headers: {
		"Content-Type": "application/json"
	}
});

export const useOnyxCore = () => {
	return onyxCore;
};

export const onyxPeople = axios.create({
	baseURL: `${ONYX_CORE_INSTANCE_HOST}/people/api`
});

export const useOnyxPeople = () => {
	return onyxPeople;
};

export const onyxInterpretation = axios.create({
	baseURL: `${ONYX_CORE_INSTANCE_HOST}/interpretation/api`
});
