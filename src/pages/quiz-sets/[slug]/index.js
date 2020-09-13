import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../../components/AppProvider";
import axios from "axios";
import getConfig from "next/config";
import "../../../styles/questions.scss";

const randomInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Questions = () => {
	const { API_TOKEN, API_ENDPOINT } = getConfig().publicRuntimeConfig;
	const { slug } = useRouter().query;
	const [id, setId] = useState("");
	const router = useRouter();
	const { questionType, answers, setAnswers } = useContext(AppContext);
	const [listQuestion, setListQuestion] = useState([]);
	const [question, setQuestion] = useState([]);
	const [selectAns, setSelectAns] = useState([]);

	const getQuestion = (quesId) => {
		axios
			.get(`${API_ENDPOINT}/questions/${quesId}`, {
				headers: {
					Authorization: `Bearer ${API_TOKEN}`,
				},
			})
			.then((res) => {
				setQuestion([res.data]);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (listQuestion.length) {
			if (id) {
				const indexQuestion = listQuestion[0].questions.findIndex(
					(item) => item.uuid === id
				);
				if (indexQuestion != -1) {
					getQuestion(listQuestion[0].questions[indexQuestion]._id);
				}
			}
		}
	}, [listQuestion, id]);

	useEffect(() => {
		if (slug) {
			if (questionType.length) {
				const questions = questionType.filter((item) => item.uuid === slug);
				setListQuestion(questions);
				setId(
					questions[0].questions[
						randomInteger(0, questions[0].questions.length - 1)
					].uuid
				);
			}
		}
	}, [slug, questionType]);

	useEffect(() => {
		setSelectAns([]);
		if (id && answers.length) {
			const indexAnswers = answers.findIndex((item) => item.uuid === id);
			if (indexAnswers != -1) {
				setSelectAns(
					answers[indexAnswers].answers.map((item) => ({
						value: item.value,
						next: item.next,
					}))
				);
			}
		}
	}, [answers, id]);

	const handleNextQues = () => {
		const indexEndQuestion = selectAns.findIndex((item) => item.next === "end");
		if (indexEndQuestion != -1) {
			router.push(`/quiz-sets/result`, "/");
		} else {
			setId(selectAns[0].next);
		}
	};
	const handlePrevQues = () => {
		if (answers.length) {
			const indexAnswers = answers.findIndex((item) => item.uuid === id);
			if (indexAnswers === -1) {
				setId(answers[answers.length - 1].uuid);
			} else {
				indexAnswers ? setId(answers[indexAnswers - 1].uuid) : router.back();
			}
		} else {
			router.back();
		}
	};

	const handleSelectAns = (e) => {
		const newSelectAns = [...selectAns];
		if (e.target.type === "checkbox") {
			if (e.target.checked) {
				newSelectAns.push(JSON.parse(e.target.value));
			} else {
				const indexSelectAns = newSelectAns.findIndex(
					(item) => item.value === JSON.parse(e.target.value).value
				);
				newSelectAns.splice(indexSelectAns, 1);
			}
		} else {
			newSelectAns.splice(0, 1, JSON.parse(e.target.value));
		}

		const listNewValueSelectAns = newSelectAns.map((item) => item.value);
		const listDetailAns = question[0].answers
			.filter((item) => listNewValueSelectAns.includes(item.value))
			.map((ans) => ({
				value: ans.value,
				id: ans.id,
				next: ans.next,
				icon: { url: ans.icon.url, id: ans.icon.id },
			}));
		setSelectAns(newSelectAns);
		const newAnswers = [...answers];
		const indexAnswers = answers.findIndex((item) => item.uuid === id);
		if (indexAnswers != -1) {
			newAnswers[indexAnswers] = {
				id: question[0].id,
				multiple: question[0].multiple,
				question: question[0].question,
				uuid: question[0].uuid,
				quiz_set: {
					id: question[0].quiz_set.id,
					name: question[0].quiz_set.name,
					uui: question[0].quiz_set.uuid,
					icon: {
						url: question[0].quiz_set.icon.url,
						id: question[0].quiz_set.icon.id,
					},
				},
				answers: listDetailAns,
			};
			setAnswers(newAnswers);
		} else {
			setAnswers([
				...answers,
				{
					id: question[0].id,
					multiple: question[0].multiple,
					question: question[0].question,
					uuid: question[0].uuid,
					quiz_set: {
						id: question[0].quiz_set.id,
						name: question[0].quiz_set.name,
						uui: question[0].quiz_set.uuid,
						icon: {
							url: question[0].quiz_set.icon.url,
							id: question[0].quiz_set.icon.id,
						},
					},
					answers: listDetailAns,
				},
			]);
		}
	};

	return (
		<div style={{ backgroundColor: "#efeeed", minHeight: "100vh" }}>
			<div className="container">
				{question.length ? (
					<div className="row">
						<div className="col-12">
							<div className="question-number"></div>
							<div className="question-header">
								<h2>{question.length ? question[0].question : ""}</h2>
								<p>
									{question[0].multiple
										? "( Multiple choice )"
										: ""}
								</p>
							</div>
							<div className="question-answers">
								{question[0].answers.map((ans) => (
									<div key={ans.id} className="answer answer-not-selected">
										<div style={{ textAlign: "center" }}>
											<div className="icon-button">
												<input
													type={question[0].multiple ? "checkbox" : "radio"}
													id={ans.id}
													name="answer"
													value={JSON.stringify({
														value: ans.value,
														next: ans.next,
													})}
													defaultChecked={
														selectAns.findIndex(
															(item) => item.value === ans.value
														) != -1
													}
													onChange={handleSelectAns}
												/>
												<label htmlFor={ans.id}>
													<img src={ans.icon.url} alt={ans.value} />
													<p>{ans.value}</p>
												</label>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="question-control">
								<button className="btn btn-start" onClick={handlePrevQues}>
									Previous
								</button>
								&nbsp;&nbsp;&nbsp;
								<button
									className="btn btn-start"
									onClick={handleNextQues}
									disabled={!selectAns.length}
								>
									Next
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="row" style={{ textAlign: "center" }}>
						<div className="loader"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Questions;
