
import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import AnimationLeft from '../../themes/sources/assets/graphics/buttons/left-gif-turqouise.gif'
import AnimationRight from '../../themes/sources/assets/graphics/buttons/right-gif-turqouise.gif'
// och ändra feedback namn
export default function FeedbackForm() {

    const [successMessage, setSuccessMessage] = useState('');
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
        setSubmissionError('')
        setSuccessMessage('')
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
            const firstErrorKey = Object.keys(errorMessages)[0];
            document.getElementsByName(firstErrorKey)[0].focus();
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('api/mailtrap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw error;
            }
            const result = await response.json();
            setSuccessMessage('Message sent. We’ll get back to you within a couple of days.');
            setData(initialFormData);
            setErrorMessage({});
            console.log(result)
        } catch (error) {
            console.error("Submission error:", error);
            if (error.errors) {
                setErrorMessage(error.errors);
            } else {
                setSubmissionError("There was an issue submitting the form. Please try again later.");

            }
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="contact-us-form-container">
            <Image src={AnimationLeft} alt="Animated GIF" className="left-absolute"
            />
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
                        placeholder="Name"
                        value={data.name} // Bind input value to state
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={errorMessage.name ? "true" : "false"}
                        aria-describedby="name-error"
                    />
                    <p id="name-error">{errorMessage.name && errorMessage.name}</p>
                </div>
                <div >
                    <input
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        type="email"

                        className=""
                        value={data.email} // Bind input value to state
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={errorMessage.email ? "true" : "false"}
                        aria-describedby="email-error"
                    />
                    <p id="email-error">{errorMessage.email && errorMessage.email}</p>
                </div>
                <div >
                    <textarea
                        name="feedback"
                        id="feedback"
                        placeholder="Message"
                        className=""
                        value={data.feedback} // Bind input value to state
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={errorMessage.feedback ? "true" : "false"}
                        aria-describedby="feedback-error"
                    />
                    <p id="feedback-error">{errorMessage.feedback && errorMessage.feedback}</p>
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

            </form>
            {successMessage && <p role="alert">{successMessage}</p>}
            {(submissionError && !successMessage) ? <p role="alert" className="submission-error">{submissionError}</p> : null}
            <Image src={AnimationRight} alt="Animated GIF" className="right-absolute"
            />
        </div>

    );
}