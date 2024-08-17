// Calculate the edge weight based on the originally provided weight, use this in your implementation of findShortestPath.
  function calculateEdgeWeight(weight){
    return weight + sumOfDigits(weight) * countPrimeFactors(weight);
  }
 
 // Determine the sum of the digits of a number.
  function sumOfDigits(n) {
    // TODO: Your answer goes here.
    
    var n, rem, sum = 0;
    while (n!=0) {
        rem = n % 10;
        sum= sum+rem;
        n = (n - rem) / 10;
    }
    return sum;

  }


// Test cases for sumOfDigits
const testCases = [123,24, 456, 789, 100];

testCases.forEach(testCase => {
  console.log(`sumOfDigits(${testCase}) = ${sumOfDigits(testCase)}`);
//   console.log(`countPrimeFactors(${testCase}) = ${countPrimeFactors(testCase)}`);

});

  // Determine the number of distinct prime factors of a number.
/*
  // Function to check if a number is prime
  function is_prime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false; // If the number is divisible by any number other than 1 and itself, it's not a prime
    }
    return true; // Return true if the number is prime

}
  function countPrimeFactors(n) {
    // TODO: Your answer goes here.


    let count = 0;
    while (n % 2 == 0) {
        n = n / 2;
        count++;
    }
    for (let i = 3; i <= Math.sqrt(n); i = i + 2) {
        while (n % i == 0) {
            n = n / i;
            count++;
        }
    }
    if (n > 2) count++;
    return (count);
  }
*/


// Determine the number of distinct prime factors of a number.
function countPrimeFactors(n) {
    if (n <= 1) return 0;
    
    let count = 0;
  
    // Check for the number of 2s
    if (n % 2 === 0) {
      count++;
      while (n % 2 === 0) {
        n /= 2;
      }
    }
  
    // Check for other odd factors
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) {
        count++;
        while (n % i === 0) {
          n /= i;
        }
      }
    }
  
    // If n is still greater than 2, then it must be a prime number
    if (n > 2) count++;
  
    return count;
  }
  
  // Example test cases
  console.log(countPrimeFactors(24)); // Expected output: 2 (2 and 3)
  console.log(countPrimeFactors(30)); // Expected output: 3 (2, 3, and 5)
  console.log(countPrimeFactors(1));  // Expected output: 0 (no prime factors)
  console.log(countPrimeFactors(2));  // Expected output: 1 (2)
  console.log(countPrimeFactors(97)); // Expected output: 1 (97 is a prime number)
  
/* // Find the shortest path based on the custom edge weights.
  function findShortestPath(graph, startNode, endNode) {
    // TODO: Your answer goes here.
  }



const shortestDistanceNode = (distances, visited) => {
	let shortest = null;

	for (let node in distances) {
		let currentIsShortest =
			shortest === null || distances[node] < distances[shortest];
		if (currentIsShortest && !visited.includes(node)) {
			shortest = node;
		}
	}
	return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
	// establish object for recording distances from the start node
	let distances = {};
	distances[endNode] = "Infinity";
	distances = Object.assign(distances, graph[startNode]);

	// track paths
	let parents = { endNode: null };
	for (let child in graph[startNode]) {
		parents[child] = startNode;
	}

	// track nodes that have already been visited
	let visited = [];

	// find the nearest node
	let node = shortestDistanceNode(distances, visited);

	// for that node
	while (node) {
		// find its distance from the start node & its child nodes
		let distance = distances[node];
		let children = graph[node];
		// for each of those child nodes
		for (let child in children) {
			// make sure each child node is not the start node
			if (String(child) === String(startNode)) {
				continue;
			} else {
				// save the distance from the start node to the child node
				let newdistance = distance + children[child];
				// if there's no recorded distance from the start node to the child node in the distances object
				// or if the recorded distance is shorter than the previously stored distance from the start node to the child node
				// save the distance to the object
				// record the path
				if (!distances[child] || distances[child] > newdistance) {
					distances[child] = newdistance;
					parents[child] = node;
				}
			}
		}
		// move the node to the visited set
		visited.push(node);
		// move to the nearest neighbor node
		node = shortestDistanceNode(distances, visited);
	}

	// using the stored paths from start node to end node
	// record the shortest path
	let shortestPath = [endNode];
	let parent = parents[endNode];
	while (parent) {
		shortestPath.push(parent);
		parent = parents[parent];
	}
	shortestPath.reverse();

	// return the shortest path from start node to end node & its distance
	let results = {
		distance: distances[endNode],
		path: shortestPath,
	};

	return results;
};

// Example graph
const graph1 = {
  A: [{ node: 'B', weight: 26 }, { node: 'C', weight: 38 }],
  B: [{ node: 'A', weight: 26 }, { node: 'D', weight: 14 }],
  C: [{ node: 'A', weight: 38 }, { node: 'D', weight: 45 }],
  D: [{ node: 'B', weight: 14 }, { node: 'C', weight: 45 }]
};

// Test the function
console.log(findShortestPath(graph1, 'A', 'D')); // Expected output: { distance: 40, path: ['A', 'B', 'D'] }

*/


// Find the shortest path based on the custom edge weights
function findShortestPath(graph, startNode, endNode) {
  // Initialize distances and parents
  let distances = {};
  let parents = {};
  let visited = [];
  
  // Set all distances to Infinity except the start node
  for (let node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    parents[node] = null;
  }

  // Start Dijkstra's algorithm
  let node = shortestDistanceNode(distances, visited);

  while (node) {
    let distance = distances[node];
    let children = graph[node];

    for (let child of children) {
      let newDistance = distance + calculateEdgeWeight(child.weight);
      if (distances[child.node] > newDistance) {
        distances[child.node] = newDistance;
        parents[child.node] = node;
      }
    }

    visited.push(node);
    node = shortestDistanceNode(distances, visited);
  }

  // Build the shortest path
  let shortestPath = [];
  let current = endNode;
  while (current) {
    shortestPath.push(current);
    current = parents[current];
  }
  shortestPath.reverse();

  // Return the result
  return distances[endNode] === Infinity ? -1 : distances[endNode];
}

// Shortest distance node selection
function shortestDistanceNode(distances, visited) {
  let shortest = null;

  for (let node in distances) {
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];
    if (currentIsShortest && !visited.includes(node)) {
      shortest = node;
    }
  }
  return shortest;
}

// Example graph
const graph1 = {
  A: [{ node: 'B', weight: 26 }, { node: 'C', weight: 38 }],
  B: [{ node: 'A', weight: 26 }, { node: 'D', weight: 14 }],
  C: [{ node: 'A', weight: 38 }, { node: 'D', weight: 45 }],
  D: [{ node: 'B', weight: 14 }, { node: 'C', weight: 45 }]
};

// Test the function
console.log(findShortestPath(graph1, 'A', 'D')); // Expected output: 66 (A->B->D)

  module.exports = { sumOfDigits, countPrimeFactors, findShortestPath };
