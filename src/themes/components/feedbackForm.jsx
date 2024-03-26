
import React, { useContext, useState } from 'react';

import { AppContext } from '../../pages/_app';
export default function FeedbackForm() {
    const {submitted, setSubmitted } = useContext(AppContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        feedback: "",

    });
//dubbelkolla om  {submitted ? "Thank you" : null} funkar
    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data)
    }

    async function handleSubmit(e) {
        e.preventDefault();
      
        try {
          await fetch('api/mailtrap', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then(() => setSubmitted(true));
        } catch (error) {
          console.error(error);
        }
      }
    return (
        <div >
            <div >

            </div>
            <div className="">
                <div >
                    <h1 >
                        We'd love to hear back from you
                    </h1>
                    <p className="">
                        Fill out the form below and we'll be in touch as soon as possible
                    </p>
                </div>
                <form className="" onSubmit={handleSubmit}
                    onChange={handleChange}>
                    <div className="">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your name"

                        />
                    </div>
                    <div >
                        <textarea
                            name="email"
                            id="email"
                            placeholder="Your email"
                            type="email"
                            className=""
                        ></textarea>
                    </div>
                    <div >
                        <textarea
                            name="feedback"
                            id="feedback"
                            placeholder="Your feedback"
                            className=""
                        ></textarea>
                    </div>
                    
                    <div className="mx-auto">
                        <button
                            type="submit"
                            className=""
                        >
                            Submit feedback
                        </button>
                    </div>
                    {submitted ? "Thank you" : null}
                </form>
            </div>
        </div>
    );
}