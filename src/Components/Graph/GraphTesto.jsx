import React, { useEffect, useRef, useState } from "react";
import Viva from "vivagraphjs";

const GraphViewer = () => {
  const graphContainerRef = useRef(null);
  const [graph, setGraph] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [loadedChildren, setLoadedChildren] = useState([]);
  const initialGraphData = {
    nodes: [
      { id: 1, name: "Aziz Akhannouch" },
      { id: 2, name: "salwa akhannouch" },
      { id: 3, name: "karim akhannouch" },
      { id: 4, name: "Rochdan akhannouch" },
    ],
    edges: [
      { source: 1, target: 2, relation: "epouse" },
      { source: 1, target: 3, relation: "fils" },
    ],
  };
  useEffect(() => {
    const initializeGraph = () => {
      const graphics = Viva.Graph.View.svgGraphics();
      const layout = Viva.Graph.Layout.forceDirected(graphData);

      const renderer = Viva.Graph.View.renderer(graphData, {
        graphics,
        layout,
        container: graphContainerRef.current,
      });

      renderer.run();

      // Handle double-click events
      graphData.forEachNode((node) => {
        const nodeUI = graphics.getNodeUI(node.id);
        if (nodeUI) {
          nodeUI.addEventListener("dblclick", () => {
            console.log(`Double-clicked on node: `, node);
            const additionalChildren = getAdditionalChildren(node.id);
            setLoadedChildren([...loadedChildren, ...additionalChildren]);
          });
        }
      });

      // Handle edge events if needed

      setGraph(graphData);
    };

    const graphData = new Viva.Graph.graph();
    initialGraphData.nodes.forEach((node) => graphData.addNode(node.id, { name: node.name }));
    initialGraphData.edges.forEach((edge) => graphData.addLink(edge.source, edge.target));

    initializeGraph();
  }, []);

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
    console.log(nodeId);
  };

  const getChildren = (parentId) => {
    return initialGraphData.edges
      .filter((edge) => edge.source === parentId)
      .map((edge) => initialGraphData.nodes.find((node) => node.id === edge.target));
  };

  const loadMoreChildren = () => {
    // Implement logic to load more children based on your requirements
    // For now, let's just load the next child in the list
    const remainingChildren = getChildren(selectedNodeId).filter(
      (child) => !loadedChildren.find((loadedChild) => loadedChild.id === child.id)
    );
    const nextChild = remainingChildren[0];
    if (nextChild) {
      setLoadedChildren([...loadedChildren, nextChild]);
    }
  };

  const getAdditionalChildren = (parentId) => {
    // Implement logic to load additional children based on your requirements
    // For now, let's just load the next child in the list
    const remainingChildren = getChildren(parentId).filter(
      (child) => !loadedChildren.find((loadedChild) => loadedChild.id === child.id)
    );
    return remainingChildren.slice(0, 1); // Load only the next child
  };
  return (
    <div>
      <div
        ref={graphContainerRef}
        style={{ width: "600px", height: "400px", border: "1px solid #ccc" }}
      >
        {selectedNodeId && (
          <div>
            <h3>Children of Node {selectedNodeId}</h3>
            <ul>
              {loadedChildren.map((child) => (
                <li key={child.id}>{child.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphViewer;
