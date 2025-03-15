import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow } from '@xyflow/react';
import React, { useCallback, useState } from 'react';

// Initial nodes and edges
const initialNodes = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 250, y: 250 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
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
    (params) => setEdges((eds) => addEdge(params, eds)),
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
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  // Delete an edge
  const deleteEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode='dark'
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* Buttons for adding and deleting nodes/edges */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
        <button onClick={addNode} style={{ marginRight: 10 }}>
          Add Node
        </button>
        <button onClick={() => deleteNode(nodes[nodes.length - 1]?.id)}>
          Delete Last Node
        </button>
      </div>

      {/* Display nodes and edges for deletion */}
      <div style={{ position: 'absolute', top: 50, left: 10, zIndex: 1000 }}>
        <h4>Nodes:</h4>
        {nodes.map((node) => (
          <div key={node.id}>
            <span className='text-white font-serif text-xl'>{node.data.label}</span>
            <button onClick={() => deleteNode(node.id)}>Delete</button>
          </div>
        ))}
        <h4>Edges:</h4>
        {edges.map((edge) => (
          <div key={edge.id}>
            {edge.source} → {edge.target}
            <button onClick={() => deleteEdge(edge.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;