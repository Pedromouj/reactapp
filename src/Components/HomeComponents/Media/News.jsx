import { useEffect, useCallback, useState } from "react";
import http from "../../Tools/HttpAxios";
import axios from "axios";
import Token from "../../Tools/Token";

function News({ searchTerm }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    if (!searchTerm) return;
    try {
      setLoading(true);
      setData([]);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL_USERS}/explore/news/${searchTerm}`,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      setData(response.data.news || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (!data) return null;
  return (
    <section className="bg-white h-full overflow-auto print:overflow-visible">
      <Results data={data} searchTerm={searchTerm} loading={loading} />
    </section>
  );
}

const Results = ({ data, loading }) => {
  return (
    <div className="p-1 print:!overflow-visible">
      {data?.length > 0 ? (
        <div className="grid lg:grid-cols-2 print:flex print:flex-col gap-2 h-full overflow-y-auto   overflow-x-hidden ">
          {data.map((article, index) => (
            <div
              key={article.link + index}
              className="p-1 border print:border-0 rounded flex items-start gap-2"
            >
              <div className="w-2/12">
                {article.imageUrl && (
                  <img
                    src={article?.imageUrl}
                    className="object-cover rounded"
                    width="100%"
                    alt=""
                  />
                )}
              </div>
              <div className="w-10/12 flex flex-col">
                <div className="flex flex-col">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noreferrer"
                    className="max-w-full text-ellipsis overflow-hidden whitespace-nowrap font-bold text-blue-800 text-sm"
                    title={article.title}
                  >
                    {article.title}
                  </a>
                  <span className="text-sm text-gray-500">
                    {article?.source}, {article?.date}
                  </span>
                  <div
                    className="text-xs max-width-full overflow-hidden text-ellipsis whitespace-nowrap"
                    title={article?.snippet}
                  >
                    {article?.snippet}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="px-4 py-2 text-center rounded-md border bg-gray-300">
            Google News: There are no results at this moment!
          </div>
        )
      )}
    </div>
  );
};

export default News;
