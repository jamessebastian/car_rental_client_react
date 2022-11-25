import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [err, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = 'http://localhost:5000/api/password-reset';
			const { data } = await axios.post(url, { email });
			setMsg(data);
			console.log(data);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data);
				console.log(error.response.data);
				console.log(err)
				setMsg("");
			}
		}
	};

	return (
        
		<div className="inner">
        				<h3>Forgot Password</h3>

			<form className="form-control" onSubmit={handleSubmit}>
				<div>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className="form-control"
				/>
				</div>
				{err&& <div  className='alert alert-danger'>{err}</div>}
				{msg && <div  className='alert alert-success'>{msg}</div>}
                <input type='submit' className="btn btn-dark btn-lg btn-block" value='Submit' />

			</form>
		</div>
	);
};

export default ForgotPassword;