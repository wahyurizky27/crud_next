import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

// This function gets called at build time
export async function getStaticPaths() {
  const { data } = await axios.get(`${process.env.API_ENDPOINT}/posts`);

  const paths = await data.map((item) => ({
    params: { updateId: item.id.toString() },
  }));

  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `${process.env.API_ENDPOINT}/posts/${params.updateId}`
  );

  return {
    props: {
      data: data || {},
    },
  };
}

export default function ArticleUpdate({ data }) {
  const [id, setId] = useState(data.id);
  const [userId, setUserId] = useState(data.userId);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.body);
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateArticle = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { data } = await axios.put(
      `${process.env.API_ENDPOINT}/posts/${id}`,
      {
        userId: userId,
        title: title,
        body: description,
      }
    );
    await setArticle(JSON.stringify(data));
    await setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title> NextJS Article App </title>
        <meta name="description" content="NextJS Article App Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>Update Article Web With Next js</h3>

        {article && <div className={styles.mt2}>{article}</div>}

        {isLoading && <div className={styles.mt2}>Loading...</div>}

        <div className={styles.form}>
          <form onSubmit={updateArticle}>
            <div className={styles.formGroup}>
              <label> User ID </label>
              <select
                className={styles.formControl}
                onChange={(e) => setUserId(e.target.value)}
                defaultValue={userId}
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
                defaultValue={title}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label> Description </label>
              <textarea
                className={styles.formControl}
                onKeyUp={(e) => setDescription(e.target.value)}
                defaultValue={description}
                required
              ></textarea>
            </div>
            <div className={`${styles.formGroup} ${styles.buttonContainer}`}>
              <button> SUBMIT </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
