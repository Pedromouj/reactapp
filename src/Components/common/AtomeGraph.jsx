import {
  LinkIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  PauseIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import Viva from "vivagraphjs";
import useHttpPrivate from "../../hooks/useHttpPrivate";
import AtomeAtomeData from "../../pages/Atomes/AtomeAtomeData";
import Modal from "./Modal";

const AtomeGraph = ({ atome, children, moleculeLienId = "0" }) => {
  const http = useHttpPrivate();
  const [selectedAtome, setSelectedAtome] = useState(null);
  let graph = null;
  let rendered = false;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  /* eslint-disable */
  let graphics = null;
  let renderer = null;
  let pause = false;
  let defs = null;
  let hideLinks = true;
  let nodeInfoPopUp = null;
  let backUrl = "https://api.primcheck.com/";
  let imagesUrl = import.meta.env.VITE_IMG_BASE_URL + "/uploadFiles/";

  const hideShowLinks = () => {
    // setHideLinks((prev) => !prev);
    hideLinks = !hideLinks;
    let linksLabel = document.querySelectorAll("text[id^=label_]");
    for (const box of linksLabel) {
      if (hideLinks) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    }
  };
  const zoomOut = () => {
    renderer.zoomOut();
  };
  const zoomIn = () => {
    renderer.zoomIn();
  };
  const pausePlay = () => {
    if (pause) renderer.resume();
    else renderer.pause();
    pause = !pause;
  };

  const loadMoreNodes = (id) => {
    // if ($route.params.entity_id === id) return;
    // api.get("kyc-searches/" + id + "/load-more-entities").then((response) => {
    //   let data = response.data.data;
    //   addAffectationsNode(data);
    //   addRelationshipInNode(data);
    //   addRelationshipOutNode(data);
    // });
    // cleanGraph();
  };

  const addAffectationsNode = (data) => {
    data.data.affectations?.map((person) => {
      graph.addNode(person.id, {
        datatype: `${person.PEP ? "(PEP)" : ""}`,
        InsideStrokeColor: "#EEE",
        InsideStrokeWidth: 1,
        OutsideStrokeColor: "#EEE",
        OutsideStrokeWidth: 8,
        width: 0,
        height: 8,
        OuterStrokeColor: "#1051c4",
        OutterStrokeWidth: 1,
        form: "circle",
        text: person.name,
        countryFlag: `${
          person.countries?.length > 0
            ? backUrl + "images/countries/rounded/" + person.countries + ".png"
            : null
        }`,
        countryName: `${person.countries?.length > 0 ? person.countries : null}`,
        fontfamily: "Verdana",
        fontsize: "12",
        color: "#000",
        IconFill: "#FFF",
        IconStrokeWidth: "1",
        IconStrokeColor: "#FFF",
        IconTransform: "scale(0.03 0.03)",
        IconPathD: "M224 64l64 64h224v302h-568v-416z",
        image: `${
          person.image
            ? imagesUrl + person.image
            : person.id.includes("ent")
            ? "/img/fallback_entity.png"
            : "/img/fallback_avatar.png"
        }`,
      });
      graph.addLink(data.id, person.id, {
        id: person.id + data.id,
        label: person.function,
        connectionStrength: 10,
      });
    });
  };
  const addRelationshipOutNode = (data) => {
    data.data.relationships_in?.map((person) => {
      graph.addNode(person.id, {
        datatype: person.datatype,
        InsideStrokeColor: "#FFF",
        InsideStrokeWidth: 1,
        OutsideStrokeColor: "#FFF",
        OutsideStrokeWidth: 8,
        width: 0,
        height: 8,
        OuterStrokeColor: "#d23190",
        OutterStrokeWidth: 1,
        form: "circle",
        text: person.entity_name,
        countryFlag: `${
          person.countries?.length > 0
            ? backUrl + "images/countries/rounded/" + person.countries[0] + ".png"
            : null
        }`,
        countryName: `${person.countries?.length > 0 ? person.countries : null}`,
        fontfamily: "Verdana",
        fontsize: "12",
        color: "#000",
        IconFill: "#FFF",
        IconStrokeWidth: "1",
        IconStrokeColor: "#FFF",
        IconTransform: "scale(0.03 0.03)",
        IconPathD: "M224 64l64 64h224v302h-568v-416z",
        image: `${
          person.image
            ? imagesUrl + person.image
            : person.id.includes("ent")
            ? "/img/fallback_entity.png"
            : "/img/fallback_avatar.png"
        }`,
      });
      graph.addLink(person.id, data.id, {
        id: person.id + data.id,
        label: `${person.relation_name ? person.relation_name : ""}`,
        connectionStrength: 10,
      });
    });
  };

  const addRelationshipInNode = (data) => {
    data.data.relationships_out?.map((person) => {
      graph.addNode(person.id, {
        datatype: person.datatype,
        InsideStrokeColor: "#FFF",
        InsideStrokeWidth: 1,
        OutsideStrokeColor: "#FFF",
        OutsideStrokeWidth: 8,
        width: 0,
        height: 8,
        OuterStrokeColor: "#0556d9",
        OutterStrokeWidth: 1,
        form: "circle",
        text: person.entity_name,
        countryFlag: `${
          person.countries?.length > 0
            ? backUrl + "images/countries/rounded/" + person.countries + ".png"
            : null
        }`,
        countryName: `${person.countries?.length > 0 ? person.countries : null}`,
        fontfamily: "Verdana",
        fontsize: "12",
        color: "#000",
        IconFill: "#FFF",
        IconStrokeWidth: "1",
        IconStrokeColor: "#FFF",
        IconTransform: "scale(0.03 0.03)",
        IconPathD: "M224 64l64 64h224v302h-568v-416z",
        image: `${
          person.image
            ? imagesUrl + person.image
            : person.id.includes("ent")
            ? "/img/fallback_entity.png"
            : "/img/fallback_avatar.png"
        }`,
      });
      graph.addLink(data.id, person.id, {
        id: person.id + data.id,
        label: `${person.relation_name ? person.relation_name : ""}`,
        connectionStrength: 10,
      });
    });
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
  };

  const onLoad = () => {
    let nodeSize = 36;
    graphics.link(function (link) {
      return Viva.Graph.svg("line")
        .attr("stroke", "#FFF")
        .attr("stroke-width", Math.sqrt(link.data));
    });
    // setDefs(Viva.Graph.svg("defs"));
    defs = Viva.Graph.svg("defs");
    graphics.getSvgRoot().append(defs);

    let createMarker = function (id) {
        return Viva.Graph.svg("marker")
          .attr("id", id)
          .attr("viewBox", "0 0 10 10")
          .attr("refX", "10")
          .attr("refY", "5")
          .attr("markerUnits", "strokeWidth")
          .attr("markerWidth", "10")
          .attr("markerHeight", "5")
          .attr("orient", "auto");
      },
      marker = createMarker("Triangle");
    marker.append("path").attr("d", "M 0 0 L 10 5 L 0 10 z");
    defs.append(marker);
    let geom = Viva.Graph.geom();

    graphics
      .link(function (link) {
        let label = Viva.Graph.svg("text")
          .attr("id", "label_" + link.data.id)
          .text(link.data.label)
          .attr("font-size", "12");

        graphics.getSvgRoot().childNodes[0].append(label);

        return Viva.Graph.svg("path")
          .attr("stroke", "#bbb")
          .attr("marker-end", "url(#Triangle)")
          .attr("id", link.data.id);
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
        let txtwidth = 10;
        let label_x = document.getElementById("label_" + linkUI?.attr("id"));
        if (label_x) {
          document
            .getElementById("label_" + linkUI?.attr("id"))
            .attr("x", (from.x + to.x) / 2 - txtwidth / 2 + 20)
            .attr("y", (from.y + to.y) / 2 - 4);

          let a = to.x - from.x;
          let b = to.y - from.y;
          let alpha = (Math.atan(b / a) * 180) / Math.PI;
          document
            .getElementById("label_" + linkUI?.attr("id"))
            .attr(
              "transform",
              "rotate(" + alpha + " " + (from.x + to.x) / 2 + "," + (from.y + to.y) / 2 + ")"
            );
        }
      });
    graphics.node(createNode).placeNode(placeNodeWithTransform);
    constructGraph();
    let idealLength = 200;
    let layout = Viva.Graph.Layout.forceDirected(graph, {
      springLength: 0, //0
      springCoeff: 0.00055, //0.00055
      dragCoeff: 0.09, //0.09
      gravity: -150, //-150 is good
      springTransform: function (link, spring) {
        spring.length = idealLength + link.data.label.length * 10.2;
      },
    });
    graph.getNode(data.id);
    renderer = Viva.Graph.View.renderer(graph, {
      layout: layout,
      graphics: graphics,
      interactive: true,
      container: document.getElementById("graph"),
    });
    renderer.run();
    setTimeout(() => {
      cleanGraph();
    }, 200);
  };

  const createNode = (node) => {
    let height = 32,
      width = 32,
      form = "circle",
      fontsize = 14,
      color = "green",
      InsideStrokeWidth = 0,
      InsideStrokeColor = "#FFF",
      OutsideStrokeWidth = 6,
      OutsideStrokeColor = "#FFF",
      OuterStrokeWidth = 6,
      OuterStrokeColor = "#1051c4",
      icon = "#",
      fontfamily = "Helvetica",
      IconFill = "#FFF",
      IconStrokeWidth = "1",
      IconStrokeColor = "#FFF",
      IconTransform = "scale(0.02 0.02)",
      IconPathD = "",
      svgText,
      svgDatatype,
      icon_set,
      svgtextA,
      svgtextG;

    if (node.data.text) {
      svgtextG = Viva.Graph.svg("g");
      svgtextA = Viva.Graph.svg("a");
      svgtextA.oncontextmenu = (e) => {
        e.preventDefault();
        let id = e.target.getAttribute("id").replace("name_", "");
        loadMoreNodes(id);
      };
      svgtextA.onclick = (e) => {
        // TODO click
      };
      const htmlParser = new DOMParser().parseFromString(node.data.text, "text/html");
      svgText = Viva.Graph.svg("text")
        .attr("y", 15 + height + InsideStrokeWidth + OutsideStrokeWidth + OuterStrokeWidth)
        .attr("style", "")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .attr("id", "name_" + node.id)
        // .text(node.data.text)
        .text(htmlParser.body.textContent)
        .attr("font-family", fontfamily)
        .attr("font-size", fontsize);
    }

    if (node.data.datatype) {
      svgDatatype = Viva.Graph.svg("text")
        .attr("y", 30 + height + InsideStrokeWidth + OutsideStrokeWidth + OuterStrokeWidth)
        .attr("x", width / 2)
        .attr("id", "datatype_" + node.id)
        .text(node.data.datatype)
        .attr("font-family", fontfamily)
        .attr("font-size", fontsize - 2)
        .attr("fill", color)
        .attr("text-anchor", "middle");
    }

    let pattern = Viva.Graph.svg("pattern")
      .attr("id", "imageFor_" + node.id)
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", "32")
      .attr("height", "32");

    if (node.data.image) {
      let image = Viva.Graph.svg("image")
        .attr("x", "0")
        .attr("y", "0")
        .attr("height", "32")
        .attr("width", "32")
        .link(node.data.image);
      pattern.append(image);
    }
    defs.append(pattern);
    let ui = Viva.Graph.svg("g");
    let container = Viva.Graph.svg(form);

    if (form === "circle") {
      container.attr("cx", 16);
      container.attr("cy", 16);
      container.attr("r", width / 2 + OutsideStrokeWidth);
    } else if (form === "rect") {
      container.attr("width", width + 16);
      container.attr("height", height + 16);
      container.attr("x", "-8px");
      container.attr("y", "-8px");
    }

    container.attr("stroke", OuterStrokeColor);
    container.attr("stroke-width", OuterStrokeWidth);
    container.attr("stroke-location", "outside");
    container.attr("fill", OutsideStrokeColor);

    let elem = Viva.Graph.svg(form);

    if (form === "circle") {
      elem.attr("cx", "16");
      elem.attr("cy", "16");
      elem.attr("r", width / 2);
    } else if (form === "rect") {
      elem.attr("width", width);
      elem.attr("height", height);
    }

    elem.attr("stroke", InsideStrokeColor);
    elem.attr("stroke-width", InsideStrokeWidth);
    elem.attr("stroke-location", "outside");
    elem.attr("fill", color);

    if (node.data.image) elem.attr("fill", "url(#imageFor_" + node.id + ")");

    let icon_viewbox = Viva.Graph.svg("svg").attr("width", width).attr("height", height);

    let icon_viewbox_g = Viva.Graph.svg("g").attr("width", width).attr("height", height);

    if (IconPathD) {
      icon_set = Viva.Graph.svg("path")
        .attr("width", width)
        .attr("height", height)
        .attr("stroke", IconStrokeColor)
        .attr("stroke-width", IconStrokeWidth)
        .attr("fill", IconFill)
        .attr("d", IconPathD);
      icon_viewbox_g.attr("transform", IconTransform);
      icon_viewbox.attr("x", width / 2 - 9);
      icon_viewbox.attr("y", height / 2 - 9);
    }

    if (icon_set) icon_viewbox_g.append(icon_set);

    let hiddencontainer = Viva.Graph.svg(form);
    hiddencontainer.attr("width", width + 200);
    hiddencontainer.attr("height", height + 20);
    hiddencontainer.attr("x", "-10px");
    hiddencontainer.attr("y", "-10px");
    hiddencontainer.attr("fill", "rgba(255,255,255,.5)");

    icon_viewbox.append(icon_viewbox_g);

    ui.append(container);
    ui.append(elem);

    if (!node.data.image && icon) ui.append(icon_viewbox);

    if (node.data.text) {
      svgtextA.append(svgText);
      svgtextG.append(svgtextA);
      ui.append(svgtextG);
    }

    if (node.data.datatype) {
      ui.append(svgDatatype);
    }
    ui.style.border = "1px solid #000";
    ui.oncontextmenu = (e) => {
      e.preventDefault();
      setSelectedAtome(node);
    };

    return ui;
  };
  const placeNodeWithTransform = (nodeUI, pos) => {
    nodeUI.attr("transform", "translate(" + (pos.x - 16) + "," + (pos.y - 16) + ")");
  };
  const constructGraph = () => {
    graph = Viva.Graph.graph();
    graph.addNode(data.id, {
      datatype: data.data.datatype,
      InsideStrokeColor: "#771fc8", //line inside
      InsideStrokeWidth: 1,
      OutsideStrokeColor: "#FFF", //circle inside
      OutsideStrokeWidth: 6,
      width: 0,
      height: 8,
      OuterStrokeColor: "#761cc7", //circle outside
      OutterStrokeWidth: 1,
      form: "circle",
      text: data.data.name,
      countryFlag: `${
        data.data.countries?.length > 0
          ? backUrl + "images/countries/rounded/" + data.data.countries[0] + ".png"
          : null
      }`,
      countryName: `${data.data.countries?.length > 0 ? data.data.countries[0] : null}`,
      fontfamily: "Verdana",
      fontsize: "12",
      color: "#000",
      IconFill: "#FFF",
      IconStrokeWidth: "1",
      IconStrokeColor: "#EEE",
      IconTransform: "scale(0.03 0.03)",
      IconPathD: "M224 64l64 64h224v302h-568v-416z",
      image: `${
        data.data.image
          ? imagesUrl + data.data.image
          : backUrl + "images/placeholder/entity_placeholder.png"
      }`,
    });
    addAffectationsNode(data);
    addRelationshipInNode(data);
    addRelationshipOutNode(data);
  };

  const relation1 = () => {
    setLoading(true);
    fetch("/graph-rel1.json")
      .then((resp) => resp.json())
      .then((data) => {
        setLoading(false);
        setData(data);
      });
  };

  const relation2 = () => {
    setLoading(true);
    fetch("/graph-rel2.json")
      .then((resp) => resp.json())
      .then((data) => {
        setLoading(false);
        setData(data);
      });
  };

  const formatData = (atome, data) => {
    const formatData = {
      id: atome.id,
      data: {
        name: atome.libelle,
        image: atome.icone,
        datatype: atome.type,
        affectations: [],
        countries: [],
      },
    };

    const rel_in = data.filter((el) => atome.id !== el.idatomesource);
    const rel_out = data.filter((el) => atome.id !== el.idatomecible);

    const relationships_in = [];
    const relationships_out = [];

    // rel in
    rel_in.forEach((el) =>
      relationships_in.push({
        id: el.idatomesource,
        image: el.icone,
        entity_name: el.atomesource,
        relation_name: el.typelienatome,
        datatype: "",
      })
    );
    // rel out
    rel_out.forEach((el) =>
      relationships_out.push({
        id: el.idatomecible,
        image: el.icone,
        entity_name: el.libellecible.replaceAll("null", ""),
        relation_name: el.typelienatome,
        datatype: "",
      })
    );

    formatData.data.relationships_in = relationships_in;
    formatData.data.relationships_out = relationships_out;

    return formatData;
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await http.put("/molecules", {
        idatomesource: atome.id,
        idatomecible: atome.id,
        idtypelienatome: moleculeLienId,
        idstatut: 1,
      });

      setData(formatData(atome, data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [http, atome]);

  useEffect(() => {
    if (rendered) return;
    rendered = true;
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!data || graphics) return;
    graphics = Viva.Graph.View.svgGraphics();
    nodeInfoPopUp = document.getElementById("node-info");
    onLoad();
  }, [data]);

  if (loading) return;

  return (
    <>
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex items-center gap-1">
          {children}
          {/* <button
            className="border rounded-md py-1 px-3 bg-blue-500 text-white  hover:bg-blue-600"
            onClick={() => relation1()}
          >
            Social relations
          </button>
          <button
            className="border rounded-md py-1 px-3 bg-blue-500 text-white  hover:bg-blue-600"
            onClick={relation2}
          >
            Capital relations
          </button>
          <button
            className="border rounded-md py-1 px-3 bg-blue-500 text-white  hiover:bg-blue-600"
            onClick={relation2}
          >
            Others
          </button>
          <button
            className="border rounded-md py-1.5 px-3 bg-blue-400 text-white  hover:bg-blue-500"
            onClick={fetchData}
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button> */}
        </div>
        <div className="flex-items-center">
          <button
            className="border rounded-md py-1 px-3 bg-blue-500 text-white  hover:bg-blue-600"
            onClick={hideShowLinks}
          >
            {hideLinks ? (
              <LinkIcon className="w-5 h-5" />
            ) : (
              <LinkIcon className="text-gray-300 w-5 h-5" />
            )}
          </button>
          <button
            className="border rounded-md py-1 px-3 bg-blue-500 text-white  hover:bg-blue-600"
            onClick={pausePlay}
          >
            {pause ? <PlayCircleIcon className="w-5 h-5" /> : <PauseIcon className="w-5 h-5" />}
          </button>
          <button
            className="border rounded-md py-1 px-3 bg-blue-500 text-white  hover:bg-blue-600"
            onClick={zoomIn}
          >
            <MagnifyingGlassPlusIcon className="w-5 h-5" />
          </button>
          <button
            className="border rounded-md py-1 px-3 bg-blue-500 text-white  hover:bg-blue-600"
            onClick={zoomOut}
          >
            <MagnifyingGlassMinusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="border-b py-1" />
      {selectedAtome && (
        <Modal isOpen={!!selectedAtome} setIsOpen={setSelectedAtome}>
          <AtomeAtomeData canEdit={false} atome={selectedAtome} />
        </Modal>
      )}
      <div id="graph" className="graph w-full h-[65vh]"></div>
    </>
  );
};

export default AtomeGraph;
