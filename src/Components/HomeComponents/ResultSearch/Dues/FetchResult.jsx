import React, { useEffect, useState } from "react";
import ProgressBarByCount from "../ProgressBar/ProgressBarByCount";
import axios from "axios";
import Highlighter from "react-highlight-words";
function FetchResult({ Result, CountGlobal, category, option, word }) {
  const [KeywordsSp, setKeywordsSp] = useState([]);

  const fetchKeywords = async () => {
    if (option === "keywords") {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_AML_API_BASE_EXPLORE_URL}/${
            option === "keywords" ? "keyword" : option
          }/${category}`
        );

        const arr = [];
        data?.keywords?.map((itm) => {
          arr.push(itm?.param);
        });
        setKeywordsSp(arr);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const arrayword = [word?.trim(), KeywordsSp].flat();

  const ChangeColor = () => {
    const marks = document.querySelectorAll("mark");
    for (let i = 0; i < marks.length; i++) {
      if (marks[i]?.textContent?.toLocaleLowerCase().trim() === word?.toLocaleLowerCase().trim()) {
        if (marks[i].classList.contains("bg-red-500")) {
          marks[i].classList.remove("bg-red-500");
          marks[i].classList.add("bg-yellow-500");
        }
      }
      KeywordsSp?.map((itm) => {
        if (marks[i]?.textContent?.toLocaleLowerCase().trim() === itm.toLocaleLowerCase().trim()) {
          if (marks[i].classList.contains("bg-yellow-500")) {
            marks[i].classList.remove("bg-yellow-500");
            marks[i].classList.add("bg-red-500");
          }
        }
      });
    }
  };
  useEffect(() => {
    fetchKeywords();
  }, [Result]);

  useEffect(() => {
    ChangeColor();
  }, [KeywordsSp]);

  return (
    <ul>
      <ProgressBarByCount Count={CountGlobal} category={category} option={option} />
      {Result?.map((item, idx) => (
        <li key={idx} className="mb-2">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-bold hover:underline text-sm"
          >
            <Highlighter
              highlightClassName="bg-yellow-500 rounded-full p-0.5 text-white"
              searchWords={arrayword}
              autoEscape={true}
              textToHighlight={item.title}
            />
          </a>
          <p className="text-gray-700 text-sm">
            <Highlighter
              highlightClassName="bg-red-500 font-semibold rounded-full p-0.5 text-white"
              searchWords={arrayword}
              autoEscape={true}
              textToHighlight={item.snippet}
            />
          </p>
        </li>
      ))}
      {/* 
      {OneLoading && <Spinner />}
      {Categorie === subCat && (
        <Pagination
          currentPage={Paginations}
          totalPages={[]}
          key={53}
          onPageChange={setPaginations}
        />
      )} */}
    </ul>
  );
}

export default FetchResult;
