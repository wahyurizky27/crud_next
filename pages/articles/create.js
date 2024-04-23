import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

export default function ArticleCreate() {
  const [userId, setUserId] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitArticle = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { data } = await axios.post(`${process.env.API_ENDPOINT}/posts`, {
      userId: userId,
      title: title,
      body: description,
    });
    await setArticle(JSON.stringify(data));
    await setIsLoading(false);
    event.target.reset();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title> NextJS Article App </title>
        <meta name="description" content="NextJS Article App Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>Create Article Web With Next js</h3>

        {article && <div className={styles.mt2}>{article}</div>}

        {isLoading && <div className={styles.mt2}>Loading...</div>}

        <div className={styles.form}>
          <form onSubmit={submitArticle}>
            <div className={styles.formGroup}>
              <label> User ID </label>
              <select
                className={styles.formControl}
                onChange={(e) => setUserId(e.target.value)}
                required
              >
                <option value={1}>User ID 1</option>
                <option value={2}>User ID 2</option>
                <option value={3}>User ID 3</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label> Title </label>
              <input
                type="text"
                className={styles.formControl}
                onKeyUp={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label> Description </label>
              <textarea
                className={styles.formControl}
                onKeyUp={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className={`${styles.formGroup} ${styles.buttonContainer}`}>
              <button>SUBMIT</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
