import React, { useContext } from "react";
import "../styles/breakDown.scss";
import { AppContext } from "./AppProvider";

const Breakdown = ({ open }) => {
	const { answers } = useContext(AppContext);
	return (
		<div
			id="breakdown"
			className={!open ? "js-breakdown  " : "js-breakdown  open"}
			style={{}}
		>
			<ul className="" style={{paddingLeft: 0}}>
				{answers.length
					? answers.map((item) => (
							<li key={item.id} className="">
								<div className="">
									<p className="bd-question">{item.question}</p>
									<div className="bd-answer">
										{item.answers.map((ans) => (
											<div key={ans.id}>
												<div>
													<div className="bd-answer__img">
														<img src={ans.icon.url} alt="answer" />
													</div>
													<p className="bd-answer__text" style={{marginTop: 5}}>{ans.value}</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</li>
					  ))
					: ""}
			</ul>
		</div>
	);
};

export default Breakdown;
