import React, { useEffect, useState } from "react";
import { BsTelephoneFill, BsFillClockFill } from "react-icons/bs";
import { FaMailBulk, FaMapMarkerAlt } from "react-icons/fa";
import Head from "next/head";
import { validateEmail, validateMessage, validateName, validatePhone } from "../util/function";


interface ContactForm {
  name: string;
  errorName: string;
  email: string;
  errorEmail: string;
  phone: string;
  errorPhone: string;
  message: string;
  errorMessage: string;
}

export default function Contact() {

  const [form, setForm] = React.useState<ContactForm>(resetForm());


  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact";
  }, []);



  return (
    <>
      <Head>


        <title>Contact</title>
        <meta
          name="description"
          content="Page pour la prise de contact avec l'entreprise"
        />
        <meta name="og:title" content="Contact" />
        <meta
          property="og:description"
          content="Page pour la prise de contact avec l'entreprise"
        />
      </Head>
      <section className="contact">
        <div className="contact__content max-w padding">
          <h1 className="title title-medium">Contactez-nous</h1>
          <div className="contact__form">
            <form action="" className="form" onSubmit={
              (e) => {
                const newForm = submitForm(form, e);
                console.log(newForm);
                setForm(newForm);
              }
            }>
              <div className="contact__formInput">
                <label htmlFor="name" className="title form__label">
                  Nom *
                </label>
                <input
                  className="form__input"
                  type="text"
                  name="name"
                  value={form.name}

                  onChange={(e) => {

                    setForm({
                      ...form,
                      name: e.target.value,
                      errorName: validateName(e.target.value)
                    })
                  }}
                  id="name"
                  placeholder="Votre nom"
                />
                <FormError errorMessage={form.errorName} />
              </div>

              <div className="contact__formInput">
                <label htmlFor="email" className="title form__label">
                  Email *
                </label>
                <input
                  className="form__input"
                  value={form.email}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      email: e.target.value,
                      errorEmail: validateEmail(e.target.value)
                    })
                  }}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Votre email"
                />
                <FormError errorMessage={form.errorEmail} />

              </div>

              <div className="contact__formInput">
                <label htmlFor="phone" className="title form__label">
                  Tel (facultatif)
                </label>
                <input
                  className="form__input"
                  value={form.phone}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      phone: e.target.value,
                      errorPhone: validatePhone(e.target.value)
                    })
                  }}
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Votre numéro de téléphone"
                />
                <FormError errorMessage={form.errorPhone} />
              </div>

              <div className="contact__formInput">
                <label htmlFor="message" className="title form__label">
                  Message *{" "}
                </label>
                <textarea
                  className="form__input"
                  value={form.message}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      message: e.target.value,
                      errorMessage: validateMessage(e.target.value)
                    })
                  }}
                  name="message"
                  id="message"
                  cols={30}
                  rows={10}
                  placeholder="Votre message"
                />
                <FormError errorMessage={form.errorMessage} />
              </div>
              <button className="btn">Envoyer</button>
            </form>
          </div>

          <div className="contact__info">
            <h2 className="title title-small">Informations</h2>

            <div className="contact__infoItem">
              <FaMapMarkerAlt />
              <span className="title">
                273 CHE EDWARD SAVIGNY CYTISES N7 97432 SAINT-PIERRE Réunion
              </span>
            </div>
            <div className="contact__infoItem">
              <BsTelephoneFill />
              <a href="tel:06 93 81 53 03" title="Le numéro de téléphone de l'entreprise">
                <span className="title">06 93 81 53 03</span>
              </a>
            </div>

            <div className="contact__infoItem">
              <FaMailBulk />
              <a href="mailto:jvitry3@gmail.com" title="l'adresse mail de l'entreprise">
                <span className="title "> jvitry3@gmail.com</span>
              </a>
            </div>
            <div className="contact__infoItem">
              <BsFillClockFill />
              <span className="title">
                Du lundi au vendredi de 8h30 à 18h00
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export const FormError = ({ errorMessage }: { errorMessage: string }) => {

  const [error, setError] = useState(errorMessage);
  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage])
  return (
    <div className="formulaire__error">
      {error !== "" && <p>{error}</p>}
    </div>
  )
}

function resetForm(): ContactForm {
  return {
    name: "",
    errorName: "",
    email: "",
    errorEmail: "",
    phone: "",
    errorPhone: "",
    message: "",
    errorMessage: "",
  }
}


function submitForm(_form: ContactForm, event: React.FormEvent<HTMLFormElement>) {

  event.preventDefault();

  if (_form.name === "") {
    _form.errorName = "Le nom est obligatoire";

    return _form;

  }

  if (_form.email === "") {
    _form.errorEmail = "L'email est obligatoire";

    return _form;
  }

  if (_form.message === "") {
    _form.errorMessage = "Le message est obligatoire";
    return _form;
  }

  if (_form.phone === "") {
    _form.errorPhone = "Le numéro de téléphone est obligatoire";
    return _form;
  }




  /* TODO: Add submit form logic */
  const newFormData = { ..._form, errorName: "", errorEmail: "", errorPhone: "", errorMessage: "" };

  const formData = new FormData();
  formData.append("email", newFormData.email);
  formData.append("message", `message venant du formulaire de contact de ${newFormData.name} 
  qui a pour numéro de téléphone ${newFormData.phone} 
  et qui a pour message : ${newFormData.message}`);

  fetch("https://formspree.io/f/mbjejwdo", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }

  }).then((response) => {

    if (response.status === 200) {
      alert("Votre message a bien été envoyé");
    }
  }).catch((error) => {

    alert("Une erreur est survenue lors de l'envoi du message");
  });

  return resetForm();

}

