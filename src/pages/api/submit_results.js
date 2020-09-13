import * as yup from "yup";
import { sendEmail, submitResult } from "../../helper";

const bodySchema = yup.object().shape({
	quiz_set: yup.object(),
	user: yup.object({
		email: yup.string().email(),
		is_get_result_via_email: yup.boolean(),
	}),
});

export default async (req, res) => {
	if (req.method !== "POST" && req.method !== "OPTIONS") {
		return res.status(405).json({
			isError: true,
			payload: "Method is not allowed",
		});
	}
	try {
		await bodySchema.validate(req.body);
		const {
			user: { email, is_get_result_via_email },
			quiz_set,
		} = req.body;
		console.log(email);
		if (is_get_result_via_email) {
			sendEmail({
				to: email,
				data: quiz_set,
			});
		}
		await submitResult(req.body);
		return res.json({
			isError: false,
			payload: "Successfully",
		});
	} catch (err) {
		return res.status(400).json({
			isError: true,
			payload: err.toString(),
		});
	}
};
