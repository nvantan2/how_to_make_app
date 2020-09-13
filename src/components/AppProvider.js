import React, { useState, useEffect } from "react";
import axios from "axios";
import getConfig from "next/config";

export const AppContext = React.createContext({
	isLoading: true,
	questionType: [],
	questions: [],
	answers: [],
});

const serializeQuesType = (quesType) => {
	if (quesType.length) {
		return quesType.map((ques) => ({
			name: ques.name,
			uuid: ques.uuid,
			desc: `Here is Decsciption ${ques.name}`,
			urlIcon: ques.icon.url,
			id: ques._id,
			questions: ques.questions,
		}));
	} else return [];
};

const AppProvider = (props) => {
	const { API_TOKEN, API_ENDPOINT } = getConfig().publicRuntimeConfig;
	const [questionType, setQuestionType] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	const getQuestionType = () => {
		axios
			.get(`${API_ENDPOINT}/quiz-sets`, {
				headers: {
					Authorization: `Bearer ${API_TOKEN}`,
				},
			})
			.then((res) => {
				setQuestionType(serializeQuesType(res.data));
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => getQuestionType(), []);
	return (
		<AppContext.Provider
			value={{
				questionType,
				isLoading: true,
				questions,
				answers,
				setAnswers,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppProvider;
