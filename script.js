let neoViz;

function draw(query) {
    const config = {
        containerId: "viz",
        neo4j: {
            serverUrl: "bolt://localhost:7687",
            serverUser: "neo4j",
            serverPassword: "123456789",
        },
        visConfig: {
            nodes: {
                shape: 'dot',
                size: 20,
                font: {
                    size: 10,
                },
                scaling: {
                    min: 10,
                    max: 50
                },
                color: {
                    background: '#97C2FC',
                    borderWidth: 2
                }
            },
            edges: {
                arrows: {
                    to: { enabled: true }
                }
            },
            physics: {
                stabilization: false // Allow the network to stabilize manually
            }
        },
        labels: {
            Person: {
                label: "name",
                value: "pagerank",
                group: "community",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (node) => `${node.properties.name}`
                    }
                }
            },
            Movie: {
                label: "title",
                value: "pagerank",
                group: "community",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (node) => `${node.properties.title}`
                    }
                }
            },
            User: {
                label: "name",
                value: "pagerank",
                group: "community",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (node) => `${node.properties.name}`
                    }
                }
            },
            Director: {
                label: "name",
                value: "pagerank",
                group: "community",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (node) => `${node.properties.name}`
                    }
                }
            },
            Actor: {
                label: "name",
                value: "pagerank",
                group: "community",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (node) => `${node.properties.name}`
                    }
                }
            },
            Genre: {
                label: "name",
                value: "pagerank",
                group: "community",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (node) => `${node.properties.name}`
                    }
                }
            }
        },
        relationships: {
            ACTED_IN: {
                value: "weight",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (relationship) => `${relationship.type}`
                    }
                }
            },
            DIRECTED: {
                value: "weight",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (relationship) => `${relationship.type}`
                    }
                }
            },
            IN_GENRE: {
                value: "weight",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (relationship) => `${relationship.type}`
                    }
                }
            },
            RATED: {
                value: "weight",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        label: (relationship) => `${relationship.type}`
                    }
                }
            },
        },
        initialCypher: query
    };

    neoViz = new NeoVis.default(config);
    neoViz.render();
    console.log(neoViz);
}

function setActiveButton(button) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add active class to the clicked button
    button.classList.add('active');
}

function filterNodes(label) {
    const nodeLimit = document.getElementById("nodeLimit").value;
    const query = `MATCH (n:${label}) RETURN n LIMIT ${nodeLimit}`;
    draw(query);

    // Set the active state for the node button
    setActiveButton(event.target);
}

function filterRelationships(type) {
    const nodeLimit = document.getElementById("nodeLimit").value;
    const query = `MATCH p=()-[r:${type}]->() RETURN p LIMIT ${nodeLimit}`;
    draw(query);

    // Set the active state for the relationship button
    setActiveButton(event.target);
}

function resetVisualization() {
    // Reset the visualization to the initial state
    draw("MATCH p=()-[r:DIRECTED]->() RETURN p LIMIT 100");

    // Remove the active state from all buttons
    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(btn => btn.classList.remove('active'));
}

function searchNode() {
    const nodeLimit = document.getElementById("nodeLimit").value;
    const label = document.getElementById("searchLabel").value;
    const name = document.getElementById("searchInput").value.trim().toLowerCase();

    if (name === "") {
        alert("Please enter a name to search.");
        return;
    }

    // Construct the Cypher query
    const query = `
        MATCH (n:${label})-[r]-(m)
        WHERE toLower(n.name)  = "${name}" OR toLower(n.title) = "${name}"
        RETURN n, r, m
        LIMIT ${nodeLimit}
    `;

    draw(query);
}

function stabilizeGraph() {
    if (neoViz && neoViz.network) {
        neoViz.network.stopSimulation();  // Stop the physics simulation to stabilize the graph
    }
}

window.draw = draw;

// Initial rendering with a default query
draw("MATCH p=()-[r:DIRECTED]->() RETURN p LIMIT 100");
