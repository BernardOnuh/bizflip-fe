import React, { useEffect, useState } from 'react';
import Footer from '../Footer/footer';
import styles from './styles.module.scss';

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_SERVER + '/contactus/sendMessage';

const ContactUsPage = () => {
  const [status, setStatus] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const injectedData = {
      DYNAMIC_DATA_EXAMPLE: 123,
    };
    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    Object.assign(data, injectedData);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 422) {
        Object.keys(injectedData).forEach((key) => {
          const el = document.createElement('input');
          el.type = 'hidden';
          el.name = key;
          el.value = injectedData[key];
          e.target.appendChild(el);
        });

        e.target.submit();
        throw new Error('Please finish the captcha challenge');
      }

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      await response.json();
      setStatus("We'll be in touch soon.");
    } catch (err) {
      setStatus(err.toString());
    }
  };

  useEffect(() => {
    // Any additional useEffect code specific to Next.js or needed for the component
  }, []);

  useEffect(() => {
    if (status) {
      alert("It's submitted successfully!");
      document.getElementById('contactus').reset();
    }
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div className={styles.title} style={{ color: '#FFF' }}>
              Contact Us
            </div>
            <form
              action={FORM_ENDPOINT}
              onSubmit={handleSubmit}
              method="POST"
              target="_blank"
              id="contactus"
            >
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Your name"
                  name="name"
                  className={styles.formInput}
                  required
                />
              </div>
              <div className="mb-3 pt-0">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className={styles.formInput}
                  required
                />
              </div>
              <div className="mt-3 pt-0">
                <textarea
                  placeholder="Your message"
                  name="message"
                  className={`${styles.formInput} ${styles.longInput}`}
                  required
                />
              </div>
              <div className="mb-3 pt-0">
                <button className={styles.button} type="submit">
                  Send a message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
