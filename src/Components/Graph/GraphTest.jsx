import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Viva from "vivagraphjs";

import personnes_entite from "/img/fallback_avatar.png";

function GraphTest({ Entie, classes, isExpanded }) {
  const ref = useRef(null);
  let i = 0;
  let height = 25;
  let width = 25;
  let OuterStrokeWidth = 20;
  let OutsideStrokeWidth = 20;
  let InsideStrokeWidth = 0;
  let renderer = null;
  const graph = Viva.Graph.graph();
  const graphics = Viva.Graph.View.svgGraphics();
  const [Node, setNode] = useState();
  const [Objects, setObjects] = useState([
    {
      id: 1,
      name: "Nizar  Braka",
      relations: [
        {
          id: 2,
          name: "radia el fassi",
          relation: "epouse",
        },
        {
          id: 3,
          name: "Leila el fassi",
          relation: "fils",
        },
        {
          id: 6,
          name: "Nizar baraka",
        },
      ],
    },
  ]);
  const [Counter, setCounter] = useState(1);
  const mappedData = Entie[0]?.personnes?.map((item) => ({
    id: item.id,
    personName: item.name,
    relations: item.relations,
    clicked: false,
  }));
  const [showRolation, setShowRelation] = useState(false);
  const removeDouble = () => {
    const element = document.querySelectorAll(".class");
    for (var i = 0; i < document.querySelectorAll(".class").length; i++) {
      if (
        !element[i].hasAttribute("x") &&
        !element[i].hasAttribute("y") &&
        element[i].hasAttribute("name")
      ) {
        element[i].style.display = "none";
      }
    }
  };

  const loadMoreNodes = async (node) => {
    console.log(node);
  };

  const CallGraph = async () => {
    if (!ref.current) return;
    // console.log(idPE, "");
    i++;

    const nodeSize = 25;

    console.log("mappedData", mappedData, Entie);

    // console.log(i);
    // Add nodes to the graph

    var circleSize = 20; // Adjust the circle size as needed
    const zoomOut = () => {
      renderer.zoomOut();
    };
    const cleanGraph = () => {
      const [set, links, labels] = [
        new Set(),
        document.querySelectorAll('#graph path[marker-end="url(#Triangle)"]'),
        document.querySelectorAll("#graph text[id^=label_]"),
      ];
      links.forEach((link) => {
        if (set.has(link.id)) link.remove();
        else set.add(link.id);
      });
      set.clear();
      labels.forEach((label) => {
        if (set.has(label.id)) label.remove();
        else set.add(label.id);
      });
      set.clear();
    };

    // const loadMoreNodes = async (node) => {
    //   try {
    //     renderer.resume();

    //     const { data: relationships } = await http.get(`/molecules2/${node.id}`);
    //     const rd = relationships.filter((el) => el[libellecible] !== node.data.text);
    //     const rel = formatData(
    //       {
    //         id: node.id,
    //         libelle: node.data.text,
    //         icone: node.data.image,
    //         type: node.data.datatype,
    //       },
    //       rd
    //     );
    //     addRelationshipOutNode(rel);
    //     addRelationshipInNode(rel);
    //     // addAffectationsNode(rel);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //     cleanGraph();
    //   }
    // };

    // mappedData?.forEach((item) => {
    //   graph.addNode(
    //     item?.personName,
    //     {
    //       label: item?.personName,
    //       url: personnes_entite,
    //     },
    //     item.personName
    //   );
    //   item?.relations?.forEach((itm, i) => {
    //     graph?.addLink(
    //       itm?.name ? itm?.name : "unkonwn",
    //       item?.personName ? item?.personName : "unkonwn",
    //       {
    //         id: i,
    //         label: itm?.name_relation ? itm?.name_relation : "unkonwn",
    //         url: personnes_entite,
    //       }
    //     );
    //   });
    // });

    // mappedData?.forEach((itm, i) => {
    //   graph?.addLink(itm?.personName ? itm?.personName : "unkonwn", itm?.personName, {
    //     id: itm?.id ? itm?.id : i,
    //     label: "unkonwn",
    //     url: personnes_entite,
    //   });
    // });

    mappedData.map((item, i) => {
      item?.relations?.map((itm, i) => {
        if (item.id === 1) {
          graph?.addLink(
            itm?.name ? itm?.name : "unkonwn",
            item?.personName ? item?.personName : "unkonwn",
            {
              id: itm.id,
              label: itm?.relation ? itm?.relation : "unkonwn",
              url: personnes_entite,
            }
          );
        }
      });
    });

    // mappedData?.forEach((item, i) => {
    //   item?.companies?.forEach((itm, i) => {
    //     graph?.addLink(
    //       itm?.name ? itm?.name : "unkonwn",
    //       item?.personName ? item?.personName : "unkonwn",
    //       {
    //         id: i,
    //         label: itm?.name ? itm?.name : "unkonwn",
    //         url: entities_url,
    //       }
    //     );
    //   });
    // });
    let ui = Viva.Graph.svg("g");

    // graphics.attr("width", "inherit").attr("height", "100%");

    graphics
      .node(function (node) {
        const nodeUI = Viva.Graph.svg("g").attr("name", node.id);
        if (!node.data && node.links[0]) {
          const image = Viva.Graph.svg("image")
            .attr("width", "45px")
            .attr("height", "45px")
            .attr("id", "node")
            .attr("class", "node")
            .attr("name", node.id)

            .link(node.links[0].data.url);
          console.log("link", node.links[0].data.url);
          nodeUI.append(image);
        } else {
          const image = Viva.Graph.svg("image")
            .attr("width", "55px")
            .attr("height", "55px")
            .link(node.data?.url);
          nodeUI.append(image);
        }

        // const circle = Viva.Graph.svg("circle")
        //   .attr("cx", 0)
        //   .attr("cy", 0)
        //   .attr("width", "55px")
        //   .attr("height", "55px")
        //   .attr("r", circleSize)
        //   .attr("fill", "#7CB9E8") // Circle fill color
        //   .attr("stroke", "#000000") // Circle border color
        //   .attr("stroke-width", 2); // Circle border width

        // nodeUI.append(circle);

        const text = Viva.Graph.svg("text")
          .attr("y", 2 + height + InsideStrokeWidth + OutsideStrokeWidth + OuterStrokeWidth)
          .attr("text-anchor", "middle")
          .attr("x", width + 2)
          .attr("stroke", "black")
          .attr("class", "class")
          .attr("font-size", 9)
          .text(node.id);
        console.log(node);
        nodeUI.append(text);

        // Each relation

        return nodeUI; // node.data holds custom object passed to graph.addNode();
      })
      .placeNode(function (nodeUI, pos) {
        // Shift image to let links go to the center:
        nodeUI
          .attr("y", "")
          .attr("x", "")
          .attr(
            "transform",
            "translate(" + (pos.x - nodeSize / 2) + "," + (pos.y - nodeSize / 2) + ")"
          );
      });

    graphics.link(function (link) {
      return Viva.Graph.svg("line")
        .attr("stroke", "#000")
        .attr("stroke-width", Math.sqrt(link.data));
    });
    let geom = Viva.Graph.geom();
    graphics
      .link(function (link) {
        let label = Viva.Graph.svg("text")
          .attr("id", "label_" + link.data.id)
          .text(link.data.label)
          .attr("stroke", "#4f535a")
          .attr("font-size", "12")
          .attr("class", "class")
          .attr("name", link.data.label);

        graphics.getSvgRoot().childNodes[0].append(label);

        return Viva.Graph.svg("path")
          .attr("stroke", "#bbb")
          .attr("marker-end", "url(#Triangle)")
          .attr("id", link.data.id)
          .attr("class", "link")
          .attr("name", link.data.soumissionaire)
          .attr("link", link.data.label);
      })
      .placeLink(function (linkUI, fromPos, toPos) {
        let toNodeSize = nodeSize,
          fromNodeSize = nodeSize;
        let from =
          geom.intersectRect(
            fromPos.x - fromNodeSize, // left
            fromPos.y - fromNodeSize, // top
            fromPos.x + fromNodeSize, // right
            fromPos.y + fromNodeSize, // bottom
            fromPos.x,
            fromPos.y,
            toPos.x,
            toPos.y
          ) || fromPos;

        let to =
          geom.intersectRect(
            toPos.x - toNodeSize, // left
            toPos.y - toNodeSize, // top
            toPos.x + toNodeSize, // right
            toPos.y + toNodeSize, // bottom
            toPos.x,
            toPos.y,
            fromPos.x,
            fromPos.y
          ) || toPos;

        let data = "M" + from.x + "," + from.y + "L" + to.x + "," + to.y;
        linkUI.attr("d", data);
        let txtwidth = 9;

        let label_x = document.getElementById("label_" + linkUI.attr("id"));
        // console.log(linkUI.attr("id"));

        if (label_x) {
          // console.log("2", label_x);

          document
            .getElementById("label_" + linkUI?.attr("id"))
            .attr("x", (from.x + to.x) / 2 - txtwidth / 2 + 20)
            .attr("y", (from.y + to.y) / 2 - 4);

          let a = to.x - from.x;
          let b = to.y - from.y;
          let alpha = (Math.atan(b / a) * 180) / Math.PI;
          document
            .getElementById("label_" + linkUI.attr("id"))
            .attr(
              "transform",
              "rotate(" + alpha + " " + (from.x + to.x) / 2 + "," + (from.y + to.y) / 2 + ")"
            );
        }
      });

    // "

    var idealLength = 250;
    var layout = Viva.Graph.Layout.forceDirected(graph, {
      springLength: 0, //0
      springCoeff: 0.00055, //0.00055
      dragCoeff: 0.09, //0.09
      gravity: -150, //-150 is good

      springTransform: function (link, spring) {
        spring.length = idealLength + link.data.label.length * 10.2;
      },
    });

    renderer = Viva.Graph.View.renderer(graph, {
      layout: layout,
      container: ref.current,
      graphics: graphics,
    });

    // Run the renderer
    renderer.run();

    for (let i = 0; i < 12; i++) zoomOut();
    setTimeout(() => {
      cleanGraph();
    }, 200);
  };

  useEffect(() => {
    // getMolecules();
    // console.log(entitepersonnes, entite, Libelle);
    CallGraph();
    removeDouble();
    const container = document?.getElementById("graph-container");
    // Use querySelector to select the child SVG element
    const svg = container?.querySelector("svg");
    const g = document?.querySelector("g");

    if (g) {
      const childrenWithAttribute = g.querySelectorAll("[name]"); // Selects all child elements with a name attribute
      console.log(childrenWithAttribute);
    }
    // Add a class to the selected SVG element
    svg?.classList?.add("width");

    const elements = container?.querySelectorAll("svg");

    const uniqueContent = new Set();

    elements?.forEach((element) => {
      const content = element?.textContent.trim();
      if (uniqueContent?.has(content)) {
        element?.remove(); // Remove the duplicate element
      } else {
        uniqueContent.add(content);
      }
    });

    graph.forEachNode((node) => {
      const nodeUI = graphics.getNodeUI(node.id);

      // Handle double-click events

      if (node.id)
        nodeUI.addEventListener("dblclick", () => {
          setCounter((prev) => prev + node?.links[0]?.data.id);
          console.log("Counter", node?.links[0]?.data.id);
          setShowRelation(true);
          setNode(node);
          console.log(`Double-clicked on node: `, node.links[0].data.id, "node", node, mappedData);
          mappedData
            ?.filter((itm) => itm?.id === node?.links[0]?.data.id)
            .map((item) => {
              item?.relations.map((itm, i) => {
                graph?.addLink(
                  itm?.name ? itm?.name : "unkonwn",
                  item?.personName ? item?.personName : "unkonwn",
                  {
                    id: itm.id,
                    label: itm?.relation ? itm?.relation : "unkonwn",
                    url: personnes_entite,
                    clicked: true,
                  }
                );
                setObjects((prev) => [...prev, itm]);
                console.log("Object", itm, Objects);
              });
            });
          // Add your double-click handling logic here
        });
    });
  }, [Entie]);

  return (
    <>
      {/* <div className="font-bold text-2xl">Graph</div> */}
      {Entie.length > 0 ? (
        <div
          ref={ref}
          id="graph-container"
          key={0}
          className={`${
            isExpanded ? "h-screen" : "border border-gray-200 w-[45rem]  shadow-md mt-5"
          }`}
        />
      ) : (
        <div className="mx-auto ml-48 text-xl font-bold"></div>
      )}
    </>
  );
}

//

export default GraphTest;
