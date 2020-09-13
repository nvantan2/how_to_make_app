import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Breakdown from "../../components/breakdown";
import { AppContext } from "../../components/AppProvider";
import "../../styles/result.scss";

const Result = () => {
	const router = useRouter();
	const { answers } = useContext(AppContext);
	const [isGetResultViaEmail, setIsGetResultViaEmail] = useState(false);
	const [showBreakdown, setShowBreakdown] = useState(false);
	const [successForm, setSuccessForm] = useState(false);
	const [loading, setLoading] = useState(false);

	const [form, setFrom] = useState({
		name: "",
		email: "",
		description: "",
	});
	const sendMail = (e) => {
		e.preventDefault();
		if (answers.length) {
			setLoading(true);
			const dataAnsPost = {
				quiz_set: {
					name: answers[0].quiz_set.name,
					id: answers[0].quiz_set.id,
					uuid: answers[0].quiz_set.uuid,
					icon: {
						id: answers[0].quiz_set.icon.id,
						url: answers[0].quiz_set.icon.url,
					},
					questions: answers.map((item) => ({
						id: item.id,
						multiple: item.multiple,
						uuid: item.uuid,
						question: item.question,
						answers: item.answers,
					})),
				},
				user: {
					email: form.email,
					is_get_result_via_email: isGetResultViaEmail,
					firstname: form.firstname,
					description: form.description,
				},
			};
			axios
				.post(`/api/submit_results`, dataAnsPost, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(() => {
					setSuccessForm(true);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
				});
		}
	};
	const onChange = (e) => {
		setFrom({ ...form, [e.target.name]: e.target.value });
	};
	const onChangeCheckbox = (e) => {
		if (e.target.checked) {
			setIsGetResultViaEmail(true);
		} else {
			setIsGetResultViaEmail(false);
		}
	};
	return (
		<div className="result_wrapper fadeIn">
			<div className="container">
				<div className="row">
					<div className="estimate  col-lg-7 col-md-10 col-sm-10 col-centered">
						<div className="go-home">
							<button type="button" onClick={() => router.push("/")}>
								Go Home
							</button>
						</div>
						<div className="price-container">
							<h4 className="name">
								{answers.length ? answers[0].quiz_set.name : ""}
							</h4>
							<h1>Quizz app</h1>
							<button
								className="breakdown-link"
								onClick={() => setShowBreakdown(!showBreakdown)}
							>
								Show Breakdown
							</button>
						</div>
						{/* Estimate Breakdown */}
						<Breakdown open={showBreakdown} />
						{/* #breakdown end*/}
						<div className="pick-crew">
							<h2 id="answer" />
							{!successForm ? (
								<>
									<form
										id="myForm"
										className="contact-form-how-much"
										name="contact_how_much"
										onSubmit={sendMail}
									>
										<input type="hidden" name="honey" />
										<input
											onChange={onChange}
											className="form-input"
											type="text"
											name="firstname"
											required
											placeholder="Your name"
										/>
										<input
											onChange={onChange}
											className="form-input"
											type="email"
											name="email"
											required
											placeholder="Your email"
										/>
										<textarea
											required
											onChange={onChange}
											className="form-text-area"
											name="description"
											placeholder="Describe your APP"
											defaultValue={""}
										/>
										<div>
											<input
												type="checkbox"
												id="checkBox"
												name="checkBox"
												onChange={onChangeCheckbox}
											/>
											<label htmlFor="checkBox">Get result via email</label>
										</div>
										<button
											id="send-button"
											type="submit"
											className="js-start-on-crew btn btn-start"
											style={{ minHeight: "50px" }}
											disabled={loading}
										>
											{loading ? (
												<p
													className="loader"
													style={{ width: 30, height: 30, margin: "5px 60px" }}
												></p>
											) : (
												<>
													<span className="final-cta-content final-cta-content-mobile">
														Get your project started
													</span>
													<span className="do-not-remove-the-span-tbear">
														→
													</span>
												</>
											)}
										</button>
									</form>
								</>
							) : (
								<h2 id="answer">
									Thanks you! Our team will analyze your request and we will
									contact you soon.
								</h2>
							)}
							<br />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Result;
