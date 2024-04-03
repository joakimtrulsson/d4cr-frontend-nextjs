// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import nodemailer from 'nodemailer';

// export default async function handler(req, res) {
 
//   const { contactEmail, name, message } = req.body;
//   let errors = {};

//   if (!contactEmail) errors.contactEmail = "Email is required.";
//   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( contactEmail))
//       errors.contactEmail = "Invalid email address.";

//   if (!name) errors.name = "Name is required.";

//   if (!message) errors.message = "Feedback is required.";

//   // If there are any errors, return them
//   if (Object.keys(errors).length > 0) {
//       return res.status(400).json({ errors });
//   }

//   const mailData = {
//     from: `${contactEmail}`,
//     to: 'test@example.com',  //ändra till riktiga email sen
//     subject: `New feedback from ${name}`,
//     text: `${message}`,
//     html: `<p>${message}</p>`,
//   };

//   // SMTP transport setup and email sending logic...

//   const transport = nodemailer.createTransport({
//     host: 'sandbox.smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//       user: process.env.MAILTRAP_USER,
//       pass: process.env.MAILTRAP_PASS,
//     },
//   });

  
//   try {
//     await transport.sendMail(mailData);
//     res.status(200).json({ message: "Email sent successfully." });
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to send email." });
//   }

// }