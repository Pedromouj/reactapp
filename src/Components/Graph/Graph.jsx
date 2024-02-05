import axios from "axios";
import { useEffect, useState } from "react";
import GraphTest from "./GraphTest";
import GraphViewer from "./GraphTesto";

function Graph() {
  const [GraphData, setGraphData] = useState([]);

  const fetchDataGraph = async () => {
    const { data } = await axios.get("/json/graph-test.json");
    setGraphData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchDataGraph();
  }, []);

  const isPrime = (number) => {
    var test = 0;
    var i = 2;
    while (i < number) {
      if (number % i === 0) {
        test = 1;
        console.log(number, "is not a prime number");
      }
      i++;
    }

    if (test === 0) {
      console.log("is a prime number");
    }
  };

  const SumPositive = () => {
    const arr = [2, -3, 8, -5, 10];
    var total = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        total.push(arr[i]);
      }
    }
    var tot = 0;
    total.map((itm) => {
      tot = tot + itm;
    });
    console.log(tot);
  };

  const ReverseString = (phrase) => {
    const arr = phrase.split("").reverse();
    const fullphraphse = [];
    arr.map((itm) => {
      fullphraphse.push(itm);
    });

    var string = "";

    fullphraphse.map((itm) => (string += itm));

    console.log(string);
  };

  const urlscheck = (url) => {
    const Url = new URL(url).hostname;

    console.log(Url);
  };

  // "!dlroW ,olleH"

  return (
    <div className="container mx-auto p-8 mt-8 w-full">
      <div className="flex flex-col md:flex-row items-center mb-4">
        <div className="grid grid-cols-3 gap-8 mx-auto">
          <GraphTest Entie={GraphData} />

          {/* <GraphViewer /> */}
        </div>
      </div>
    </div>
  );
}

export default Graph;
