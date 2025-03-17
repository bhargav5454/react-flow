import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlow,
} from "@xyflow/react";
import React, { useCallback, useState } from "react";

// Initial nodes and edges
const initialNodes = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 250, y: 250 },
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 500, y: 0 },
  },
];

const initialEdges = [];

const App = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Handle node changes (e.g., dragging)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle connecting nodes
  const onConnect = useCallback(
    (params) => {
      const edge = {
        ...params,
        label: `${params.source} to ${params.target}`,
        labelStyle: { 
          fill: '#fff',
          fontSize: 12,
          fontWeight: 500,
        },
        labelBgStyle: { 
          fill: '#1e1e1e',
          fillOpacity: 0.7,
          rx: 4,
          ry: 4
        },
        style: {
          strokeWidth: 2,
          stroke: '#ec003f',
          border: '1px solid #fff'
        }
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    []
  );

  // Add a new node
  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`, // Generate a unique ID
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 500, y: Math.random() * 500 }, // Random position
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Delete a node
  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  // Delete an edge
  const deleteEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }} className="bg-gray-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode="dark"
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* Control Panel */}
      <div className="absolute top-4 right-4 bg-[#1e1e1e] p-6 rounded-lg shadow-xl border border-[#393939] w-80 backdrop-blur-lg bg-opacity-90">
        <div className="mb-6">
          <h3 className="text-white text-xl font-bold mb-4">Flow Controls</h3>
          <div className="flex gap-3">
            <button
              className="flex-1 bg-[#0400ff59] border border-[#0400ffa9] text-white font-semibold py-2 px-4 rounded transition-colors"
              onClick={addNode}
            >
              Add Node
            </button>
            <button
              className="flex-1 bg-[#ff000059] border border-[#ff0000a9] text-white font-semibold py-2 px-4 rounded transition-colors"
              onClick={() => deleteNode(nodes[nodes.length - 1]?.id)}
            >
              Delete Last
            </button>
          </div>
        </div>

        {/* Nodes List */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Nodes</h4>
          <div className="max-h-[300px] overflow-y-auto">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="flex items-center justify-between bg-[#1e1e1e] border border-[#393939] rounded p-2 mb-2"
              >
                <span className="text-white">{node.data.label}</span>
                <button
                  className="bg-[#ff000059] border border-[#ff0000a9] text-white px-3 py-1 rounded text-sm transition-colors"
                  onClick={() => deleteNode(node.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Edges List */}
        <div>
          {edges.length > 0 && (
            <>
              <h4 className="text-white font-semibold mb-3">Edges</h4>
              <div className="max-h-[300px] overflow-y-auto">
                {edges.map((edge) => (
                  <div
                    key={edge.id}
                    className="flex items-center justify-between bg-[#1e1e1e] border border-[#393939] rounded p-2 mb-2"
                  >
                    <span className="text-white">
                      {edge.source} → {edge.target}
                    </span>
                    <button
                      className="bg-[#ff000059] border border-[#ff0000a9] text-white px-3 py-1 rounded text-sm transition-colors"
                      onClick={() => deleteEdge(edge.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
