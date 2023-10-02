package groupd.DNDMapGen.Generator.HallwayFactory.Graph;

import java.util.Collection;

import java.util.*;

public class MinimumSpanningTree {

    private static class UnionFind {
        private final int[] parent;
        private final int[] rank;

        public UnionFind(int size) {
            parent = new int[size];
            rank = new int[size];
            for (int i = 0; i < size; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        public int find(int point) {
            if (parent[point] != point) {
                parent[point] = find(parent[point]);
            }
            return parent[point];
        }

        public boolean union(int point1, int point2) {
            int root1 = find(point1);
            int root2 = find(point2);

            if (root1 == root2) {
                return false;
            }

            if (rank[root1] > rank[root2]) {
                parent[root2] = root1;
            } else if (rank[root1] < rank[root2]) {
                parent[root1] = root2;
            } else {
                parent[root2] = root1;
                rank[root1]++;
            }

            return true;
        }
    }

    public static Collection<Edge> buildTree(Collection<Edge> edges) {
        List<Edge> result = new ArrayList<>();
        List<Edge> sortedEdges = new ArrayList<>(edges);
        sortedEdges.sort(Comparator.comparingInt(Edge::length));

        // Map each point to a unique integer ID
        Map<Point, Integer> pointToId = new HashMap<>();
        int idCounter = 0;
        for (Edge edge : edges) {
            if (!pointToId.containsKey(edge.p1())) {
                pointToId.put(edge.p1(), idCounter++);
            }
            if (!pointToId.containsKey(edge.p2())) {
                pointToId.put(edge.p2(), idCounter++);
            }
        }

        UnionFind uf = new UnionFind(pointToId.size());

        for (Edge edge : sortedEdges) {
            int point1 = pointToId.get(edge.p1());
            int point2 = pointToId.get(edge.p2());

            if (uf.union(point1, point2)) {
                result.add(edge);
            }
        }

        return result;
    }
}
