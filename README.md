# Neo4j Visualization Project

This project is a web-based tool that allows users to visualize and interact with graph data stored in a Neo4j database. The application is built using HTML, CSS, JavaScript, and Neovis.js, and it provides features for filtering nodes and relationships, searching for specific nodes, and stabilizing the graph's layout.
#### Database:
neo4j-graph-examples / recommendations version 5.22.0 or 5.23.0

## Features

- **Interactive Graph Visualization**: Displays nodes and relationships from a Neo4j database in an interactive, visual format.
- **Node and Relationship Filtering**: Easily filter the visualization to show specific node labels (e.g., Person, Movie, User) and relationship types (e.g., ACTED_IN, DIRECTED, RATED).
- **Search Functionality**: Search for nodes by name or title and visualize their connections.
- **Graph Stabilization**: Stop the movement of nodes in the graph to stabilize the layout.
- **Responsive Design**: The interface is designed to be responsive, working seamlessly across devices of different sizes.
- **Reset Functionality**: Quickly reset the graph to its initial state after applying filters or performing a search.

## Algorithms used

- **Community Detection (Louvain community)**.
- **PageRank**.
- **Betweenness**.

To add these algorithms to your Neo4j dataset, you'll need to use the Neo4j Graph Data Science (GDS) library. Below are the steps to apply PageRank, Louvain (Community Detection), Betweenness Centrality, and Jaccard Similarity to your dataset. I'll guide you through how to project your data into a graph, run these algorithms, and store the results in your Neo4j database.

#### Step 1: Ensure the GDS Library is Installed: 
```
CALL gds.version()
```
#### Step 2: Project Your Data into an In-Memory Graph:
```
CALL gds.graph.project(
    'movieGraph',  // The name of the in-memory graph
    ['Person', 'Movie', 'Actor', 'Director', 'User', 'Genre'],  // The node labels to include
    {
        ACTED_IN: {orientation: 'NATURAL'},
        DIRECTED: {orientation: 'NATURAL'},
        IN_GENRE: {orientation: 'NATURAL'},
        RATED: {orientation: 'NATURAL'}
    }
)
YIELD graphName, nodeCount, relationshipCount;
```
This command creates an in-memory graph called `movieGraph` with your specified nodes and relationships.
#### Step 3: Run PageRank:
```
CALL gds.pageRank.write(
    'movieGraph',  // The name of the in-memory graph
    {
        writeProperty: 'pagerank'  // The property where PageRank values will be stored
    }
)
YIELD nodePropertiesWritten;
```
#### Step 3: Run Louvain (Community Detection):
```
CALL gds.louvain.write(
   'movieGraph',
   {
    writeProperty: 'community'
   }
)
YIELD communityCount, nodePropertiesWritten;
```
#### Step 5: Run Betweenness Centrality:
```
CALL gds.betweenness.write(
   'movieGraph',
   {
    writeProperty: 'betweenness'
   }
)
YIELD centralityDistribution;
```
#### Step 6: Verify the Results:
```
MATCH (n)
WHERE n.pagerank IS NOT NULL OR n.community IS NOT NULL OR n.betweenness IS NOT NULL
RETURN n.name, n.pagerank, n.community, n.betweenness
ORDER BY n.pagerank DESC
LIMIT 10;
```
#### Step 7: Visualize the Results with Neovis.js:
Now that you have these properties stored in your database, you can use them in your Neovis.js visualizations. For example, you might use the `pagerank` score to size your nodes, or color nodes based on their `community`.
## Technologies Used

- **HTML5**: For structuring the application.
- **CSS3**: This styles the application and ensure responsiveness.
- **JavaScript (ES6)**: For dynamic interaction and controlling the visualization.
- **Neovis.js**: Integrates Neo4j with Vis.js to visualize graph data directly from the database.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository** to your local machine:
   ```bash
   git@github.com:gunthertresor/Neo4j-Data-Visualization-Dashborad.git
  
