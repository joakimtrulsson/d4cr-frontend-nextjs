
import React, { useContext, useState } from 'react';
import Link from 'next/link'
import { AppContext } from '../../pages/_app';

export default function FeedbackForm() {
    const { submitted, setSubmitted } = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const initialFormData = {
        name: "",
        email: "",
        feedback: "",
    };
    const [data, setData] = useState(initialFormData);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function handleChange(e) {
        // timout istället setSubmitted(false);
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));

        // Check and remove the error message for the field if it exists.
        if (errorMessage.hasOwnProperty(name)) {
            setErrorMessage(prevMessages => {
                const newMessages = { ...prevMessages };
                delete newMessages[name]; // Remove the key entirely
                return newMessages;
            });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { name, email, feedback } = data;
        let errorMessages = {};
        if (!name.trim()) errorMessages.name = "Name is required.";
        if (!email.trim() || !emailPattern.test(email)) errorMessages.email = "Valid email is required.";
        if (!feedback.trim()) errorMessages.feedback = "Feedback is required.";
        if (Object.keys(errorMessages).length) {
            // Handle and display error messages
            setErrorMessage(errorMessages);

            return;
        }
        setIsSubmitting(true);
        try {
            await fetch('api/mailtrap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then(() => {
                    setSubmitted(true);
                    setData(initialFormData);
                    setErrorMessage({});
                })
        } catch (error) {
            console.error(error);
            setSubmissionError("There was an issue submitting the form. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div >
            <div >

            </div>
            <div className="">
                <div >
                    <h1 >
                        Contact us
                    </h1>
                    <p className="">
                        Please fill out the following form and we’ll get in touch with you within a couple of days. If you want to join us, use <Link href="">this form</Link> instead.
                    </p>
                </div>
                <form className="" onSubmit={handleSubmit} noValidate
                >
                    <div className="">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your name"
                            value={data.name} // Bind input value to state
                            onChange={handleChange}
                        />
                        <p>{errorMessage.name && errorMessage.name}</p>
                    </div>
                    <div >
                        <input
                            name="email"
                            id="email"
                            placeholder="Your email"
                            type="email"
                            
                            className=""
                            value={data.email} // Bind input value to state
                            onChange={handleChange}
                        ></input>
                        <p>{errorMessage.email && errorMessage.email}</p>
                    </div>
                    <div >
                        <textarea
                            name="feedback"
                            id="feedback"
                            placeholder="Your feedback"
                            className=""
                            value={data.feedback} // Bind input value to state
                            onChange={handleChange}
                        ></textarea>
                        <p>{errorMessage.feedback && errorMessage.feedback}</p>
                    </div>

                    {!isSubmitting ? <div className="mx-auto">
                        <button
                            type="submit"
                            className=""
                            disabled={Object.keys(errorMessage).length > 0}
                        >
                            SEND MESSAGE
                        </button>
                    </div> : <p>Sending</p>}
                    {submitted ? <p>Message sent. We’ll get back to you within a couple of days.</p> : null}
                    {(!submitted & submissionError) ? <p className="submission-error">{submissionError}</p>:null}
                </form>
            </div>
        </div>
    );
}