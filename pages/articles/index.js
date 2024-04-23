import { useRouter } from "next/router";
import axios from "axios";

import Head from "next/head";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.API_ENDPOINT}/posts`);

  return {
    props: {
      data: data || {},
    },
  };
}

export default function ArticleIndex({ data }) {
  const router = useRouter();

  const [articles, setArticles] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  const deleteArticle = async (articleId) => {
    if (window.confirm("Are you sure delete this item ?")) {
      setIsLoading(true);
      const { res } = await axios.delete(
        `${process.env.API_ENDPOINT}/posts/${articleId}`
      );
      const newArticles = await articles.filter((item) => item.id != articleId);
      setArticles(newArticles);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Article</title>
        <meta name="description" content="Article App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>Article Web With Next js</h3>

        {isLoading && <div className={styles.mt2}>Loading...</div>}

        <div className={`${styles.actions} ${styles.left}`}>
          <button onClick={() => router.push(`/articles/create`)}>
            CREATE ARTICLE
          </button>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.id}</td>
                    <td>{article.userId}</td>
                    <td>{article.title}</td>
                    <td>{article.body}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          onClick={() => router.push(`/articles/${article.id}`)}
                        >
                          UPDATE
                        </button>
                        <button onClick={() => deleteArticle(article.id)}>
                          DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
