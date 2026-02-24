import { useState, useEffect, useMemo, useCallback } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────
const DSA_SECTIONS = [
  {
    name: "Array / String", icon: "📦", problems: [
      { name: "Merge Sorted Array", difficulty: "Easy", lc: "merge-sorted-array" },
      { name: "Remove Element", difficulty: "Easy", lc: "remove-element" },
      { name: "Remove Duplicates from Sorted Array", difficulty: "Easy", lc: "remove-duplicates-from-sorted-array" },
      { name: "Remove Duplicates from Sorted Array II", difficulty: "Medium", lc: "remove-duplicates-from-sorted-array-ii" },
      { name: "Majority Element", difficulty: "Easy", lc: "majority-element" },
      { name: "Rotate Array", difficulty: "Medium", lc: "rotate-array" },
      { name: "Best Time to Buy and Sell Stock", difficulty: "Easy", lc: "best-time-to-buy-and-sell-stock" },
      { name: "Best Time to Buy and Sell Stock II", difficulty: "Medium", lc: "best-time-to-buy-and-sell-stock-ii" },
      { name: "Jump Game", difficulty: "Medium", lc: "jump-game" },
      { name: "Jump Game II", difficulty: "Medium", lc: "jump-game-ii" },
      { name: "H-Index", difficulty: "Medium", lc: "h-index" },
      { name: "Insert Delete GetRandom O(1)", difficulty: "Medium", lc: "insert-delete-getrandom-o1" },
      { name: "Product of Array Except Self", difficulty: "Medium", lc: "product-of-array-except-self" },
      { name: "Gas Station", difficulty: "Medium", lc: "gas-station" },
      { name: "Candy", difficulty: "Hard", lc: "candy" },
      { name: "Trapping Rain Water", difficulty: "Hard", lc: "trapping-rain-water" },
      { name: "Roman to Integer", difficulty: "Easy", lc: "roman-to-integer" },
      { name: "Integer to Roman", difficulty: "Medium", lc: "integer-to-roman" },
      { name: "Length of Last Word", difficulty: "Easy", lc: "length-of-last-word" },
      { name: "Longest Common Prefix", difficulty: "Easy", lc: "longest-common-prefix" },
      { name: "Reverse Words in a String", difficulty: "Medium", lc: "reverse-words-in-a-string" },
      { name: "Zigzag Conversion", difficulty: "Medium", lc: "zigzag-conversion" },
      { name: "Find the Index of the First Occurrence in a String", difficulty: "Easy", lc: "find-the-index-of-the-first-occurrence-in-a-string" },
      { name: "Text Justification", difficulty: "Hard", lc: "text-justification" },
    ]
  },
  {
    name: "Two Pointers", icon: "👆", problems: [
      { name: "Valid Palindrome", difficulty: "Easy", lc: "valid-palindrome" },
      { name: "Is Subsequence", difficulty: "Easy", lc: "is-subsequence" },
      { name: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", lc: "two-sum-ii-input-array-is-sorted" },
      { name: "Container With Most Water", difficulty: "Medium", lc: "container-with-most-water" },
      { name: "3Sum", difficulty: "Medium", lc: "3sum" },
    ]
  },
  {
    name: "Sliding Window", icon: "🪟", problems: [
      { name: "Minimum Size Subarray Sum", difficulty: "Medium", lc: "minimum-size-subarray-sum" },
      { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", lc: "longest-substring-without-repeating-characters" },
      { name: "Substring with Concatenation of All Words", difficulty: "Hard", lc: "substring-with-concatenation-of-all-words" },
      { name: "Minimum Window Substring", difficulty: "Hard", lc: "minimum-window-substring" },
    ]
  },
  {
    name: "Matrix", icon: "🔢", problems: [
      { name: "Valid Sudoku", difficulty: "Medium", lc: "valid-sudoku" },
      { name: "Spiral Matrix", difficulty: "Medium", lc: "spiral-matrix" },
      { name: "Rotate Image", difficulty: "Medium", lc: "rotate-image" },
      { name: "Set Matrix Zeroes", difficulty: "Medium", lc: "set-matrix-zeroes" },
      { name: "Game of Life", difficulty: "Medium", lc: "game-of-life" },
    ]
  },
  {
    name: "Hashmap", icon: "🗂️", problems: [
      { name: "Ransom Note", difficulty: "Easy", lc: "ransom-note" },
      { name: "Isomorphic Strings", difficulty: "Easy", lc: "isomorphic-strings" },
      { name: "Word Pattern", difficulty: "Easy", lc: "word-pattern" },
      { name: "Valid Anagram", difficulty: "Easy", lc: "valid-anagram" },
      { name: "Group Anagrams", difficulty: "Medium", lc: "group-anagrams" },
      { name: "Two Sum", difficulty: "Easy", lc: "two-sum" },
      { name: "Happy Number", difficulty: "Easy", lc: "happy-number" },
      { name: "Contains Duplicate II", difficulty: "Easy", lc: "contains-duplicate-ii" },
      { name: "Longest Consecutive Sequence", difficulty: "Medium", lc: "longest-consecutive-sequence" },
    ]
  },
  {
    name: "Intervals", icon: "📏", problems: [
      { name: "Summary Ranges", difficulty: "Easy", lc: "summary-ranges" },
      { name: "Merge Intervals", difficulty: "Medium", lc: "merge-intervals" },
      { name: "Insert Interval", difficulty: "Medium", lc: "insert-interval" },
      { name: "Minimum Number of Arrows to Burst Balloons", difficulty: "Medium", lc: "minimum-number-of-arrows-to-burst-balloons" },
    ]
  },
  {
    name: "Stack", icon: "📚", problems: [
      { name: "Valid Parentheses", difficulty: "Easy", lc: "valid-parentheses" },
      { name: "Simplify Path", difficulty: "Medium", lc: "simplify-path" },
      { name: "Min Stack", difficulty: "Medium", lc: "min-stack" },
      { name: "Evaluate Reverse Polish Notation", difficulty: "Medium", lc: "evaluate-reverse-polish-notation" },
      { name: "Basic Calculator", difficulty: "Hard", lc: "basic-calculator" },
    ]
  },
  {
    name: "Linked List", icon: "🔗", problems: [
      { name: "Linked List Cycle", difficulty: "Easy", lc: "linked-list-cycle" },
      { name: "Add Two Numbers", difficulty: "Medium", lc: "add-two-numbers" },
      { name: "Merge Two Sorted Lists", difficulty: "Easy", lc: "merge-two-sorted-lists" },
      { name: "Copy List with Random Pointer", difficulty: "Medium", lc: "copy-list-with-random-pointer" },
      { name: "Reverse Linked List II", difficulty: "Medium", lc: "reverse-linked-list-ii" },
      { name: "Reverse Nodes in k-Group", difficulty: "Hard", lc: "reverse-nodes-in-k-group" },
      { name: "Remove Nth Node From End of List", difficulty: "Medium", lc: "remove-nth-node-from-end-of-list" },
      { name: "Remove Duplicates from Sorted List II", difficulty: "Medium", lc: "remove-duplicates-from-sorted-list-ii" },
      { name: "Rotate List", difficulty: "Medium", lc: "rotate-list" },
      { name: "Partition List", difficulty: "Medium", lc: "partition-list" },
      { name: "LRU Cache", difficulty: "Medium", lc: "lru-cache" },
    ]
  },
  {
    name: "Binary Tree", icon: "🌳", problems: [
      { name: "Maximum Depth of Binary Tree", difficulty: "Easy", lc: "maximum-depth-of-binary-tree" },
      { name: "Same Tree", difficulty: "Easy", lc: "same-tree" },
      { name: "Invert Binary Tree", difficulty: "Easy", lc: "invert-binary-tree" },
      { name: "Symmetric Tree", difficulty: "Easy", lc: "symmetric-tree" },
      { name: "Construct Binary Tree from Preorder and Inorder", difficulty: "Medium", lc: "construct-binary-tree-from-preorder-and-inorder-traversal" },
      { name: "Construct Binary Tree from Inorder and Postorder", difficulty: "Medium", lc: "construct-binary-tree-from-inorder-and-postorder-traversal" },
      { name: "Populating Next Right Pointers in Each Node II", difficulty: "Medium", lc: "populating-next-right-pointers-in-each-node-ii" },
      { name: "Flatten Binary Tree to Linked List", difficulty: "Medium", lc: "flatten-binary-tree-to-linked-list" },
      { name: "Path Sum", difficulty: "Easy", lc: "path-sum" },
      { name: "Sum Root to Leaf Numbers", difficulty: "Medium", lc: "sum-root-to-leaf-numbers" },
      { name: "Binary Tree Maximum Path Sum", difficulty: "Hard", lc: "binary-tree-maximum-path-sum" },
      { name: "Binary Search Tree Iterator", difficulty: "Medium", lc: "binary-search-tree-iterator" },
      { name: "Count Complete Tree Nodes", difficulty: "Easy", lc: "count-complete-tree-nodes" },
      { name: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", lc: "lowest-common-ancestor-of-a-binary-tree" },
    ]
  },
  {
    name: "Binary Tree BFS", icon: "🌊", problems: [
      { name: "Binary Tree Right Side View", difficulty: "Medium", lc: "binary-tree-right-side-view" },
      { name: "Average of Levels in Binary Tree", difficulty: "Easy", lc: "average-of-levels-in-binary-tree" },
      { name: "Binary Tree Level Order Traversal", difficulty: "Medium", lc: "binary-tree-level-order-traversal" },
      { name: "Binary Tree Zigzag Level Order Traversal", difficulty: "Medium", lc: "binary-tree-zigzag-level-order-traversal" },
    ]
  },
  {
    name: "BST", icon: "🔍", problems: [
      { name: "Minimum Absolute Difference in BST", difficulty: "Easy", lc: "minimum-absolute-difference-in-bst" },
      { name: "Kth Smallest Element in a BST", difficulty: "Medium", lc: "kth-smallest-element-in-a-bst" },
      { name: "Validate Binary Search Tree", difficulty: "Medium", lc: "validate-binary-search-tree" },
    ]
  },
  {
    name: "Graph", icon: "🕸️", problems: [
      { name: "Number of Islands", difficulty: "Medium", lc: "number-of-islands" },
      { name: "Surrounded Regions", difficulty: "Medium", lc: "surrounded-regions" },
      { name: "Clone Graph", difficulty: "Medium", lc: "clone-graph" },
      { name: "Evaluate Division", difficulty: "Medium", lc: "evaluate-division" },
      { name: "Course Schedule", difficulty: "Medium", lc: "course-schedule" },
      { name: "Course Schedule II", difficulty: "Medium", lc: "course-schedule-ii" },
    ]
  },
  {
    name: "Graph BFS", icon: "📡", problems: [
      { name: "Snakes and Ladders", difficulty: "Medium", lc: "snakes-and-ladders" },
      { name: "Minimum Genetic Mutation", difficulty: "Medium", lc: "minimum-genetic-mutation" },
      { name: "Word Ladder", difficulty: "Hard", lc: "word-ladder" },
    ]
  },
  {
    name: "Trie", icon: "🔤", problems: [
      { name: "Implement Trie (Prefix Tree)", difficulty: "Medium", lc: "implement-trie-prefix-tree" },
      { name: "Design Add and Search Words Data Structure", difficulty: "Medium", lc: "design-add-and-search-words-data-structure" },
      { name: "Word Search II", difficulty: "Hard", lc: "word-search-ii" },
    ]
  },
  {
    name: "Backtracking", icon: "↩️", problems: [
      { name: "Letter Combinations of a Phone Number", difficulty: "Medium", lc: "letter-combinations-of-a-phone-number" },
      { name: "Combinations", difficulty: "Medium", lc: "combinations" },
      { name: "Permutations", difficulty: "Medium", lc: "permutations" },
      { name: "Combination Sum", difficulty: "Medium", lc: "combination-sum" },
      { name: "N-Queens II", difficulty: "Hard", lc: "n-queens-ii" },
      { name: "Generate Parentheses", difficulty: "Medium", lc: "generate-parentheses" },
      { name: "Word Search", difficulty: "Medium", lc: "word-search" },
    ]
  },
  {
    name: "Divide & Conquer", icon: "✂️", problems: [
      { name: "Convert Sorted Array to Binary Search Tree", difficulty: "Easy", lc: "convert-sorted-array-to-binary-search-tree" },
      { name: "Sort List", difficulty: "Medium", lc: "sort-list" },
      { name: "Construct Quad Tree", difficulty: "Medium", lc: "construct-quad-tree" },
      { name: "Merge k Sorted Lists", difficulty: "Hard", lc: "merge-k-sorted-lists" },
    ]
  },
  {
    name: "Kadane's Algorithm", icon: "📈", problems: [
      { name: "Maximum Subarray", difficulty: "Medium", lc: "maximum-subarray" },
      { name: "Maximum Sum Circular Subarray", difficulty: "Medium", lc: "maximum-sum-circular-subarray" },
    ]
  },
  {
    name: "Binary Search", icon: "🎯", problems: [
      { name: "Search Insert Position", difficulty: "Easy", lc: "search-insert-position" },
      { name: "Search a 2D Matrix", difficulty: "Medium", lc: "search-a-2d-matrix" },
      { name: "Find Peak Element", difficulty: "Medium", lc: "find-peak-element" },
      { name: "Search in Rotated Sorted Array", difficulty: "Medium", lc: "search-in-rotated-sorted-array" },
      { name: "Find First and Last Position of Element in Sorted Array", difficulty: "Medium", lc: "find-first-and-last-position-of-element-in-sorted-array" },
      { name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", lc: "find-minimum-in-rotated-sorted-array" },
      { name: "Median of Two Sorted Arrays", difficulty: "Hard", lc: "median-of-two-sorted-arrays" },
    ]
  },
  {
    name: "Heap", icon: "⛰️", problems: [
      { name: "Kth Largest Element in an Array", difficulty: "Medium", lc: "kth-largest-element-in-an-array" },
      { name: "IPO", difficulty: "Hard", lc: "ipo" },
      { name: "Find K Pairs with Smallest Sums", difficulty: "Medium", lc: "find-k-pairs-with-smallest-sums" },
      { name: "Find Median from Data Stream", difficulty: "Hard", lc: "find-median-from-data-stream" },
    ]
  },
  {
    name: "Bit Manipulation", icon: "🔧", problems: [
      { name: "Add Binary", difficulty: "Easy", lc: "add-binary" },
      { name: "Reverse Bits", difficulty: "Easy", lc: "reverse-bits" },
      { name: "Number of 1 Bits", difficulty: "Easy", lc: "number-of-1-bits" },
      { name: "Single Number", difficulty: "Easy", lc: "single-number" },
      { name: "Single Number II", difficulty: "Medium", lc: "single-number-ii" },
      { name: "Bitwise AND of Numbers Range", difficulty: "Medium", lc: "bitwise-and-of-numbers-range" },
    ]
  },
  {
    name: "Math", icon: "🧮", problems: [
      { name: "Palindrome Number", difficulty: "Easy", lc: "palindrome-number" },
      { name: "Plus One", difficulty: "Easy", lc: "plus-one" },
      { name: "Factorial Trailing Zeroes", difficulty: "Medium", lc: "factorial-trailing-zeroes" },
      { name: "Sqrt(x)", difficulty: "Easy", lc: "sqrtx" },
      { name: "Pow(x, n)", difficulty: "Medium", lc: "powx-n" },
      { name: "Max Points on a Line", difficulty: "Hard", lc: "max-points-on-a-line" },
    ]
  },
  {
    name: "1D DP", icon: "🧩", problems: [
      { name: "Climbing Stairs", difficulty: "Easy", lc: "climbing-stairs" },
      { name: "House Robber", difficulty: "Medium", lc: "house-robber" },
      { name: "Word Break", difficulty: "Medium", lc: "word-break" },
      { name: "Coin Change", difficulty: "Medium", lc: "coin-change" },
      { name: "Longest Increasing Subsequence", difficulty: "Medium", lc: "longest-increasing-subsequence" },
    ]
  },
  {
    name: "Multi-D DP", icon: "🧊", problems: [
      { name: "Triangle", difficulty: "Medium", lc: "triangle" },
      { name: "Minimum Path Sum", difficulty: "Medium", lc: "minimum-path-sum" },
      { name: "Unique Paths II", difficulty: "Medium", lc: "unique-paths-ii" },
      { name: "Longest Palindromic Substring", difficulty: "Medium", lc: "longest-palindromic-substring" },
      { name: "Interleaving String", difficulty: "Medium", lc: "interleaving-string" },
      { name: "Edit Distance", difficulty: "Medium", lc: "edit-distance" },
      { name: "Best Time to Buy and Sell Stock III", difficulty: "Hard", lc: "best-time-to-buy-and-sell-stock-iii" },
      { name: "Best Time to Buy and Sell Stock IV", difficulty: "Hard", lc: "best-time-to-buy-and-sell-stock-iv" },
      { name: "Maximal Square", difficulty: "Medium", lc: "maximal-square" },
    ]
  },
];

const WEEKLY_PLAN = [
  { week: 1, phase: 1, title: "Arrays & Node Internals", tasks: [
    { area: "DSA", task: "Arrays & Strings — Two Pointers" },
    { area: "DSA", task: "HashMaps & Sets practice (5 problems)" },
    { area: "Backend", task: "Node.js Event Loop deep dive" },
    { area: "Backend", task: "Streams — readable, writable, transform" },
    { area: "System Design", task: "Client-Server & REST API principles" },
  ]},
  { week: 2, phase: 1, title: "Linked Lists & Error Handling", tasks: [
    { area: "DSA", task: "Linked Lists (singly & doubly)" },
    { area: "DSA", task: "Stacks & Queues (5 problems)" },
    { area: "Backend", task: "Error handling patterns (async/await)" },
    { area: "Backend", task: "Module system — CJS vs ESM" },
    { area: "System Design", task: "Monolith vs Microservices tradeoffs" },
  ]},
  { week: 3, phase: 1, title: "Binary Search & TypeScript", tasks: [
    { area: "DSA", task: "Binary Search (on arrays & on answer)" },
    { area: "DSA", task: "Sliding Window pattern (5 problems)" },
    { area: "Backend", task: "TypeScript Generics & Utility types" },
    { area: "Backend", task: "Discriminated unions & type guards" },
    { area: "System Design", task: "Database fundamentals: ACID, indexes" },
  ]},
  { week: 4, phase: 1, title: "Recursion & Caching", tasks: [
    { area: "DSA", task: "Recursion & basic Backtracking" },
    { area: "DSA", task: "Sorting algorithms (merge, quick)" },
    { area: "Backend", task: "🛠️ Mini Project: CSV Stream CLI Tool" },
    { area: "System Design", task: "Caching & Load Balancing basics" },
    { area: "System Design", task: "🎯 Design: URL Shortener" },
  ]},
  { week: 5, phase: 2, title: "Trees & Prisma", tasks: [
    { area: "DSA", task: "Binary Trees — all traversals" },
    { area: "DSA", task: "BST operations (5 problems)" },
    { area: "Backend", task: "Prisma Relations (1:1, 1:N, M:N)" },
    { area: "Backend", task: "Prisma Transactions & Middleware" },
    { area: "System Design", task: "Horizontal vs Vertical scaling" },
  ]},
  { week: 6, phase: 2, title: "Graphs & PostgreSQL", tasks: [
    { area: "DSA", task: "BFS & DFS on Graphs" },
    { area: "DSA", task: "Graph representations (5 problems)" },
    { area: "Backend", task: "Prisma Migrate & Raw queries" },
    { area: "Backend", task: "PostgreSQL EXPLAIN ANALYZE" },
    { area: "System Design", task: "DB replication & sharding concepts" },
  ]},
  { week: 7, phase: 2, title: "DP & Indexes", tasks: [
    { area: "DSA", task: "Dynamic Programming — Memoization" },
    { area: "DSA", task: "Classic DP: coin change, climbing stairs" },
    { area: "Backend", task: "PostgreSQL Indexes (B-tree, GIN, GiST)" },
    { area: "Backend", task: "Connection pooling (PgBouncer)" },
    { area: "System Design", task: "Message queues & event-driven arch" },
  ]},
  { week: 8, phase: 2, title: "Greedy & Webhooks", tasks: [
    { area: "DSA", task: "DP Tabulation & Greedy algorithms" },
    { area: "DSA", task: "LCS, Knapsack, Interval scheduling" },
    { area: "Backend", task: "🛠️ Optimize a Modelia endpoint" },
    { area: "System Design", task: "Webhooks, Circuit Breaker, Rate Limiting" },
    { area: "System Design", task: "🎯 Design: Shopify webhook processor" },
  ]},
  { week: 9, phase: 3, title: "Heaps & Auth", tasks: [
    { area: "DSA", task: "Heap / Priority Queue problems" },
    { area: "DSA", task: "Trie & advanced string algorithms" },
    { area: "Backend", task: "Auth: JWT, refresh tokens, OAuth 2.0" },
    { area: "Backend", task: "RBAC/ABAC authorization patterns" },
    { area: "System Design", task: "🎯 Design: Shopify App Backend" },
  ]},
  { week: 10, phase: 3, title: "Union-Find & Validation", tasks: [
    { area: "DSA", task: "Union-Find & Bit manipulation" },
    { area: "DSA", task: "Mixed timed practice (45 min/problem)" },
    { area: "Backend", task: "Zod validation + structured logging" },
    { area: "Backend", task: "Graceful shutdown & health checks" },
    { area: "System Design", task: "🎯 Design: Notification System" },
  ]},
  { week: 11, phase: 3, title: "Mock Interviews & Testing", tasks: [
    { area: "DSA", task: "Mock interview practice #1" },
    { area: "DSA", task: "Review all patterns & weak areas" },
    { area: "Backend", task: "Testing: Vitest + Supertest + Prisma" },
    { area: "Backend", task: "CI/CD pipeline understanding" },
    { area: "System Design", task: "🎯 Design: Real-Time Dashboard" },
  ]},
  { week: 12, phase: 3, title: "Capstone & Review", tasks: [
    { area: "DSA", task: "Mock interview practice #2" },
    { area: "DSA", task: "Final review & categorize all problems" },
    { area: "Backend", task: "🛠️ Capstone: Multi-tenant SaaS API" },
    { area: "System Design", task: "🎯 Design: File Upload & Processing" },
    { area: "System Design", task: "Review all designs & tradeoffs" },
  ]},
];

const BACKEND_TOPICS = [
  { id: "b1", category: "Node.js Internals", topic: "Event Loop — phases, microtasks vs macrotasks", week: 1 },
  { id: "b2", category: "Node.js Internals", topic: "Streams — readable, writable, transform, backpressure", week: 1 },
  { id: "b3", category: "Node.js Internals", topic: "Error handling patterns — async/await try-catch", week: 2 },
  { id: "b4", category: "Node.js Internals", topic: "Module system — CommonJS vs ESM", week: 2 },
  { id: "b5", category: "TypeScript", topic: "Generics & Utility types (Partial, Pick, Omit, Record)", week: 3 },
  { id: "b6", category: "TypeScript", topic: "Discriminated unions & type guards", week: 3 },
  { id: "b7", category: "Prisma", topic: "Relations: one-to-one, one-to-many, many-to-many", week: 5 },
  { id: "b8", category: "Prisma", topic: "Transactions & Middleware", week: 5 },
  { id: "b9", category: "Prisma", topic: "Migrate & Raw queries ($queryRaw)", week: 6 },
  { id: "b10", category: "PostgreSQL", topic: "EXPLAIN ANALYZE — query execution plans", week: 6 },
  { id: "b11", category: "PostgreSQL", topic: "Indexes: B-tree, GIN, GiST", week: 7 },
  { id: "b12", category: "PostgreSQL", topic: "Connection pooling (PgBouncer)", week: 7 },
  { id: "b13", category: "Auth & Security", topic: "JWT, refresh tokens, OAuth 2.0 flows", week: 9 },
  { id: "b14", category: "Auth & Security", topic: "RBAC/ABAC authorization patterns", week: 9 },
  { id: "b15", category: "Production", topic: "Zod validation + structured logging", week: 10 },
  { id: "b16", category: "Production", topic: "Graceful shutdown & health checks", week: 10 },
  { id: "b17", category: "Testing", topic: "Vitest + Supertest + Prisma integration", week: 11 },
  { id: "b18", category: "Testing", topic: "CI/CD pipeline understanding", week: 11 },
];

const SYSTEM_DESIGN_TOPICS = [
  { id: "s1", category: "Foundations", topic: "Client-Server architecture & REST API design", week: 1 },
  { id: "s2", category: "Foundations", topic: "Monolith vs Microservices tradeoffs", week: 2 },
  { id: "s3", category: "Foundations", topic: "Database fundamentals: ACID, indexes, normalization", week: 3 },
  { id: "s4", category: "Foundations", topic: "Caching & Load Balancing basics", week: 4 },
  { id: "s5", category: "Scalability", topic: "Horizontal vs Vertical scaling", week: 5 },
  { id: "s6", category: "Scalability", topic: "DB replication & sharding concepts", week: 6 },
  { id: "s7", category: "Scalability", topic: "Message queues & event-driven architecture", week: 7 },
  { id: "s8", category: "Patterns", topic: "Webhooks, Circuit Breaker, Rate Limiting", week: 8 },
  { id: "s9", category: "Designs", topic: "🎯 URL Shortener", week: 4 },
  { id: "s10", category: "Designs", topic: "🎯 Shopify Webhook Processor", week: 8 },
  { id: "s11", category: "Designs", topic: "🎯 Shopify App Backend", week: 9 },
  { id: "s12", category: "Designs", topic: "🎯 Notification System", week: 10 },
  { id: "s13", category: "Designs", topic: "🎯 Real-Time Dashboard", week: 11 },
  { id: "s14", category: "Designs", topic: "🎯 File Upload & Processing Service", week: 12 },
];

// ─── Storage ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "modelia-skill-tracker-v1";

const defaultState = () => ({
  dsaStatus: {},
  weeklyStatus: {},
  backendStatus: {},
  sysdesignStatus: {},
  editMode: false,
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState(), ...JSON.parse(raw) };
  } catch {}
  return defaultState();
}

function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

// ─── Util ───────────────────────────────────────────────────────────────────
const diffColors = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" };
const diffBg = { Easy: "rgba(34,197,94,0.12)", Medium: "rgba(245,158,11,0.12)", Hard: "rgba(239,68,68,0.12)" };
const areaColors = { DSA: "#8b5cf6", Backend: "#3b82f6", "System Design": "#f59e0b" };
const phaseNames = { 1: "Foundations", 2: "Intermediate", 3: "Advanced" };
const phaseColors = { 1: "#22c55e", 2: "#f59e0b", 3: "#ef4444" };

function ProgressRing({ pct, size = 56, stroke = 5, color = "#8b5cf6" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}/>
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize={size*0.24} fontWeight="700"
        style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>{Math.round(pct)}%</text>
    </svg>
  );
}

function ProgressBar({ pct, color = "#8b5cf6", h = 8 }) {
  return (
    <div style={{ width: "100%", height: h, borderRadius: h, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", borderRadius: h,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`, transition: "width 0.5s ease" }}/>
    </div>
  );
}

const statusIcon = (s) => s === "solved" || s === "done" ? "✅" : s === "attempted" || s === "in-progress" ? "🔄" : s === "review" ? "🔁" : "⬜";

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [state, setState] = useState(loadState);
  const [activeTab, setActiveTab] = useState("overview");
  const [dsaFilter, setDsaFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAuth, setShowAuth] = useState(false);
  const [pw, setPw] = useState("");
  const PASS = "modelia2026";

  const save = useCallback((next) => { setState(next); saveState(next); }, []);

  // Stats
  const allProblems = useMemo(() => DSA_SECTIONS.flatMap(s => s.problems), []);
  const solved = useMemo(() => Object.values(state.dsaStatus).filter(s => s === "solved").length, [state.dsaStatus]);
  const dsaPct = allProblems.length > 0 ? (solved / allProblems.length) * 100 : 0;
  const totalWeekly = WEEKLY_PLAN.flatMap(w => w.tasks).length;
  const doneWeekly = Object.values(state.weeklyStatus).filter(s => s === "done").length;
  const weeklyPct = totalWeekly > 0 ? (doneWeekly / totalWeekly) * 100 : 0;
  const doneBackend = Object.values(state.backendStatus).filter(s => s === "done").length;
  const backendPct = BACKEND_TOPICS.length > 0 ? (doneBackend / BACKEND_TOPICS.length) * 100 : 0;
  const doneSys = Object.values(state.sysdesignStatus).filter(s => s === "done").length;
  const sysPct = SYSTEM_DESIGN_TOPICS.length > 0 ? (doneSys / SYSTEM_DESIGN_TOPICS.length) * 100 : 0;
  const total = allProblems.length + totalWeekly + BACKEND_TOPICS.length + SYSTEM_DESIGN_TOPICS.length;
  const totalDone = solved + doneWeekly + doneBackend + doneSys;
  const overallPct = total > 0 ? (totalDone / total) * 100 : 0;

  const dsaDiffStats = useMemo(() => {
    const s = { Easy: { t: 0, d: 0 }, Medium: { t: 0, d: 0 }, Hard: { t: 0, d: 0 } };
    let idx = 0;
    DSA_SECTIONS.forEach(sec => sec.problems.forEach(p => {
      s[p.difficulty].t++;
      if (state.dsaStatus[idx] === "solved") s[p.difficulty].d++;
      idx++;
    }));
    return s;
  }, [state.dsaStatus]);

  const cycle = (type, key) => {
    const lists = type === "dsa" ? [undefined, "solved", "attempted", "review"] : [undefined, "done", "in-progress"];
    const field = type === "dsa" ? "dsaStatus" : type === "weekly" ? "weeklyStatus" : type === "backend" ? "backendStatus" : "sysdesignStatus";
    const cur = state[field][key];
    const next = lists[(lists.indexOf(cur) + 1) % lists.length];
    const ns = { ...state[field] };
    if (next === undefined) delete ns[key]; else ns[key] = next;
    save({ ...state, [field]: ns });
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "dsa", label: "DSA 150", icon: "🧠" },
    { id: "weekly", label: "Weekly Plan", icon: "📅" },
    { id: "backend", label: "Backend", icon: "⚙️" },
    { id: "sysdesign", label: "System Design", icon: "🏗️" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 50%, #0a0f0a 100%)",
      color: "#e2e8f0", fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 3px; }
        .hover-row:hover { background: rgba(255,255,255,0.03) !important; }
        @media (max-width: 640px) {
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
          .diff-grid { grid-template-columns: 1fr !important; }
          .sec-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{
        background: "rgba(10,10,15,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139,92,246,0.15)",
        padding: "14px 20px", position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #8b5cf6, #6366f1)", fontSize: 16, fontWeight: 800, color: "#fff",
          }}>M</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc", letterSpacing: "0.04em" }}>Mission 2026</div>
            <div style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.08em" }}>SKILL TRACKER</div>
          </div>
        </div>
        <button onClick={() => state.editMode ? save({ ...state, editMode: false }) : setShowAuth(true)} style={{
          padding: "7px 14px", borderRadius: 7, border: "1px solid",
          borderColor: state.editMode ? "#22c55e" : "rgba(139,92,246,0.3)",
          background: state.editMode ? "rgba(34,197,94,0.15)" : "rgba(139,92,246,0.1)",
          color: state.editMode ? "#22c55e" : "#8b5cf6",
          cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit",
        }}>
          {state.editMode ? "🔓 Editing" : "🔒 View Only"}
        </button>
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowAuth(false)}>
          <div style={{ background: "#14141f", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 14, padding: 28, width: 320 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: "#f8fafc" }}>🔐 Enter Password</div>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === "Enter" && pw === PASS && (save({ ...state, editMode: true }), setShowAuth(false), setPw(""))}
              placeholder="Password..." style={{
                width: "100%", padding: "9px 12px", borderRadius: 7, border: "1px solid rgba(139,92,246,0.3)",
                background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: 13, fontFamily: "inherit",
                outline: "none", boxSizing: "border-box", marginBottom: 10,
              }}/>
            <button onClick={() => { if (pw === PASS) { save({ ...state, editMode: true }); setShowAuth(false); setPw(""); }}}
              style={{ width: "100%", padding: "9px", borderRadius: 7, border: "none",
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)", color: "#fff",
                cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>
              Unlock
            </button>
            <div style={{ fontSize: 9, color: "#64748b", marginTop: 6, textAlign: "center" }}>Hint: modelia2026</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <nav style={{ display: "flex", gap: 2, padding: "10px 20px", overflowX: "auto",
        borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "9px 16px", borderRadius: 8, border: "none",
            background: activeTab === t.id ? "rgba(139,92,246,0.15)" : "transparent",
            color: activeTab === t.id ? "#a78bfa" : "#64748b",
            cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit",
            whiteSpace: "nowrap", borderBottom: activeTab === t.id ? "2px solid #8b5cf6" : "2px solid transparent",
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </nav>

      <main style={{ padding: "18px 20px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ═══ OVERVIEW ═══ */}
        {activeTab === "overview" && (<div>
          <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
            {[
              { label: "OVERALL", pct: overallPct, color: "#8b5cf6", sub: `${totalDone} / ${total}` },
              { label: "DSA", pct: dsaPct, color: "#22c55e", sub: `${solved} / ${allProblems.length}` },
              { label: "WEEKLY", pct: weeklyPct, color: "#3b82f6", sub: `${doneWeekly} / ${totalWeekly}` },
              { label: "BACKEND", pct: backendPct, color: "#f59e0b", sub: `${doneBackend} / ${BACKEND_TOPICS.length}` },
            ].map((c, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
                <ProgressRing pct={c.pct} color={c.color}/>
                <div>
                  <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, letterSpacing: "0.06em" }}>{c.label}</div>
                  <div style={{ fontSize: 14, color: "#cbd5e1", marginTop: 2 }}>{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Difficulty */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 18, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#f8fafc" }}>DSA by Difficulty</div>
            <div className="diff-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {["Easy", "Medium", "Hard"].map(d => (
                <div key={d} style={{ padding: 14, borderRadius: 10, background: diffBg[d], textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: diffColors[d] }}>{dsaDiffStats[d].d}/{dsaDiffStats[d].t}</div>
                  <div style={{ fontSize: 12, color: diffColors[d], opacity: 0.8, marginTop: 2 }}>{d}</div>
                  <div style={{ marginTop: 6 }}><ProgressBar pct={dsaDiffStats[d].t > 0 ? (dsaDiffStats[d].d / dsaDiffStats[d].t) * 100 : 0} color={diffColors[d]} h={4}/></div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase Progress */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 18, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#f8fafc" }}>Phase Progress</div>
            {[1, 2, 3].map(phase => {
              const weeks = WEEKLY_PLAN.filter(w => w.phase === phase);
              const keys = weeks.flatMap(w => w.tasks.map((_, i) => `${w.week}-${i}`));
              const done = keys.filter(k => state.weeklyStatus[k] === "done").length;
              const pct = keys.length > 0 ? (done / keys.length) * 100 : 0;
              return (
                <div key={phase} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#cbd5e1" }}>
                      <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: phaseColors[phase], marginRight: 6 }}/>
                      Phase {phase}: {phaseNames[phase]}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: phaseColors[phase] }}>{Math.round(pct)}%</span>
                  </div>
                  <ProgressBar pct={pct} color={phaseColors[phase]}/>
                </div>
              );
            })}
          </div>

          {/* Section Grid */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#f8fafc" }}>DSA Sections</div>
            <div className="sec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
              {(() => { let gi = 0; return DSA_SECTIONS.map(sec => {
                const si = gi; const t = sec.problems.length;
                const d = sec.problems.filter((_, i) => state.dsaStatus[si + i] === "solved").length;
                gi += t; const pct = t > 0 ? (d / t) * 100 : 0;
                return (
                  <div key={sec.name} onClick={() => { setActiveTab("dsa"); setDsaFilter("all"); setStatusFilter("all"); }}
                    style={{ padding: 10, borderRadius: 8, cursor: "pointer",
                      background: pct === 100 ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${pct === 100 ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.04)"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span>{sec.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: pct === 100 ? "#22c55e" : "#64748b" }}>{d}/{t}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#cbd5e1", marginBottom: 4 }}>{sec.name}</div>
                    <ProgressBar pct={pct} color={pct === 100 ? "#22c55e" : "#8b5cf6"} h={3}/>
                  </div>
                );
              }); })()}
            </div>
          </div>
        </div>)}

        {/* ═══ DSA 150 ═══ */}
        {activeTab === "dsa" && (<div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            {["all", "Easy", "Medium", "Hard"].map(f => (
              <button key={f} onClick={() => setDsaFilter(f)} style={{
                padding: "5px 12px", borderRadius: 6, border: "1px solid",
                borderColor: dsaFilter === f ? (diffColors[f] || "#8b5cf6") : "rgba(255,255,255,0.08)",
                background: dsaFilter === f ? (diffBg[f] || "rgba(139,92,246,0.12)") : "transparent",
                color: dsaFilter === f ? (diffColors[f] || "#a78bfa") : "#64748b",
                cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit",
              }}>{f === "all" ? `All (${allProblems.length})` : `${f} (${dsaDiffStats[f].t})`}</button>
            ))}
            <div style={{ flex: 1 }}/>
            {["all", "unsolved", "solved"].map(f => (
              <button key={f} onClick={() => setStatusFilter(f)} style={{
                padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)",
                background: statusFilter === f ? "rgba(139,92,246,0.12)" : "transparent",
                color: statusFilter === f ? "#a78bfa" : "#64748b",
                cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit",
              }}>{f === "all" ? "All" : f === "unsolved" ? "⬜ Todo" : "✅ Done"}</button>
            ))}
          </div>
          {(() => { let gi = 0; return DSA_SECTIONS.map(sec => {
            const si = gi;
            const filtered = sec.problems.map((p, i) => ({ ...p, idx: si + i })).filter(p => {
              if (dsaFilter !== "all" && p.difficulty !== dsaFilter) return false;
              if (statusFilter === "solved" && state.dsaStatus[p.idx] !== "solved") return false;
              if (statusFilter === "unsolved" && state.dsaStatus[p.idx] === "solved") return false;
              return true;
            });
            gi += sec.problems.length;
            if (!filtered.length) return null;
            const secDone = sec.problems.filter((_, i) => state.dsaStatus[si + i] === "solved").length;
            return (
              <div key={sec.name} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "8px 12px",
                  borderRadius: 8, background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.1)" }}>
                  <span style={{ fontSize: 16 }}>{sec.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{sec.name}</span>
                  <span style={{ fontSize: 12, color: "#64748b", marginLeft: "auto" }}>{secDone}/{sec.problems.length}</span>
                  <div style={{ width: 50 }}><ProgressBar pct={sec.problems.length > 0 ? (secDone / sec.problems.length) * 100 : 0} color="#8b5cf6" h={3}/></div>
                </div>
                {filtered.map(p => {
                  const st = state.dsaStatus[p.idx];
                  return (
                    <div key={p.idx} className="hover-row" style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 6, marginBottom: 1,
                      cursor: "pointer",
                      background: st === "solved" ? "rgba(34,197,94,0.04)" : "transparent",
                    }} onClick={() => cycle("dsa", p.idx)}>
                      <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{statusIcon(st)}</span>
                      <span style={{ fontSize: 12, color: "#475569", width: 28, textAlign: "right" }}>#{p.idx + 1}</span>
                      <a href={`https://leetcode.com/problems/${p.lc}/`} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{
                          flex: 1, fontSize: 13, fontWeight: 500, textDecoration: "none",
                          color: st === "solved" ? "#4ade80" : "#cbd5e1", opacity: st === "solved" ? 0.7 : 1,
                        }}>
                        {p.name}
                        <span style={{ fontSize: 11, marginLeft: 4, opacity: 0.4 }}>↗</span>
                      </a>
                      <span style={{ padding: "2px 8px", borderRadius: 5, fontSize: 11, fontWeight: 700,
                        background: diffBg[p.difficulty], color: diffColors[p.difficulty] }}>{p.difficulty}</span>
                    </div>
                  );
                })}
              </div>
            );
          }); })()}
        </div>)}

        {/* ═══ WEEKLY ═══ */}
        {activeTab === "weekly" && (<div>
          {WEEKLY_PLAN.map(week => {
            const wd = week.tasks.filter((_, i) => state.weeklyStatus[`${week.week}-${i}`] === "done").length;
            const wp = (wd / week.tasks.length) * 100;
            return (
              <div key={week.week} style={{ marginBottom: 14, background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
                <div style={{
                  padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background: `rgba(${phaseColors[week.phase] === "#22c55e" ? "34,197,94" : phaseColors[week.phase] === "#f59e0b" ? "245,158,11" : "239,68,68"},0.06)`,
                }}>
                  <div style={{ width: 30, height: 30, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center",
                    background: phaseColors[week.phase], color: "#fff", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>W{week.week}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>{week.title}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>Phase {week.phase}: {phaseNames[week.phase]}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: phaseColors[week.phase] }}>{wd}/{week.tasks.length}</div>
                    <div style={{ width: 50, marginTop: 3 }}><ProgressBar pct={wp} color={phaseColors[week.phase]} h={3}/></div>
                  </div>
                </div>
                {week.tasks.map((task, i) => {
                  const key = `${week.week}-${i}`;
                  const st = state.weeklyStatus[key];
                  return (
                    <div key={key} className="hover-row" style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "9px 16px",
                      borderBottom: i < week.tasks.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                      cursor: "pointer",
                    }} onClick={() => cycle("weekly", key)}>
                      <span style={{ fontSize: 15 }}>{statusIcon(st)}</span>
                      <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700,
                        background: `${areaColors[task.area]}18`, color: areaColors[task.area] }}>{task.area}</span>
                      <span style={{ flex: 1, fontSize: 13, color: st === "done" ? "#4ade80" : "#cbd5e1",
                        opacity: st === "done" ? 0.7 : 1 }}>{task.task}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>)}

        {/* ═══ BACKEND ═══ */}
        {activeTab === "backend" && (<div>
          <div style={{ display: "flex", gap: 14, marginBottom: 18, padding: 14, borderRadius: 12,
            background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
            <ProgressRing pct={backendPct} color="#3b82f6"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc", marginBottom: 3 }}>Backend Mastery</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>Node.js · TypeScript · Prisma · Postgres · Auth · Testing</div>
              <ProgressBar pct={backendPct} color="#3b82f6"/>
            </div>
          </div>
          {["Node.js Internals", "TypeScript", "Prisma", "PostgreSQL", "Auth & Security", "Production", "Testing"].map(cat => {
            const items = BACKEND_TOPICS.filter(t => t.category === cat);
            if (!items.length) return null;
            const cd = items.filter(t => state.backendStatus[t.id] === "done").length;
            return (
              <div key={cat} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, padding: "7px 12px",
                  borderRadius: 7, background: "rgba(59,130,246,0.06)" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#93c5fd" }}>{cat}</span>
                  <span style={{ marginLeft: "auto", fontSize: 12, color: "#64748b" }}>{cd}/{items.length}</span>
                </div>
                {items.map(t => {
                  const st = state.backendStatus[t.id];
                  return (
                    <div key={t.id} className="hover-row" style={{ display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 12px", marginBottom: 1, borderRadius: 5, cursor: "pointer",
                    }} onClick={() => cycle("backend", t.id)}>
                      <span style={{ fontSize: 15 }}>{statusIcon(st)}</span>
                      <span style={{ fontSize: 13, color: st === "done" ? "#4ade80" : "#cbd5e1", flex: 1 }}>{t.topic}</span>
                      <span style={{ fontSize: 11, color: "#64748b" }}>W{t.week}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>)}

        {/* ═══ SYSTEM DESIGN ═══ */}
        {activeTab === "sysdesign" && (<div>
          <div style={{ display: "flex", gap: 14, marginBottom: 18, padding: 14, borderRadius: 12,
            background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.12)" }}>
            <ProgressRing pct={sysPct} color="#f59e0b"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc", marginBottom: 3 }}>System Design</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>Foundations · Scalability · Patterns · Real Designs</div>
              <ProgressBar pct={sysPct} color="#f59e0b"/>
            </div>
          </div>
          {["Foundations", "Scalability", "Patterns", "Designs"].map(cat => {
            const items = SYSTEM_DESIGN_TOPICS.filter(t => t.category === cat);
            if (!items.length) return null;
            const cd = items.filter(t => state.sysdesignStatus[t.id] === "done").length;
            return (
              <div key={cat} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, padding: "7px 12px",
                  borderRadius: 7, background: "rgba(245,158,11,0.06)" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24" }}>{cat}</span>
                  <span style={{ marginLeft: "auto", fontSize: 12, color: "#64748b" }}>{cd}/{items.length}</span>
                </div>
                {items.map(t => {
                  const st = state.sysdesignStatus[t.id];
                  return (
                    <div key={t.id} className="hover-row" style={{ display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 12px", marginBottom: 1, borderRadius: 5, cursor: "pointer",
                    }} onClick={() => cycle("sysdesign", t.id)}>
                      <span style={{ fontSize: 15 }}>{statusIcon(st)}</span>
                      <span style={{ fontSize: 13, color: st === "done" ? "#4ade80" : "#cbd5e1", flex: 1 }}>{t.topic}</span>
                      <span style={{ fontSize: 11, color: "#64748b" }}>W{t.week}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>)}
      </main>

      <footer style={{ padding: "18px 20px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: 30 }}>
        <div style={{ fontSize: 11, color: "#475569" }}>
          Mission 2026 Skill Tracker · Click items to toggle status · Built with Claude
        </div>
      </footer>
    </div>
  );
}
