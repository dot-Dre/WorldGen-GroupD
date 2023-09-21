package groupd.DNDMapGen.Generator.HallwayFactory.Graph;

import java.util.*;

public class Triangulator {

    public static Collection<Triangle> triangulate(Collection<Point> points) {
        Triangle superTriangle = Triangle.superTriangle(points);

        List<Triangle> triangles = new ArrayList<>();

        triangles.add(superTriangle);

        for(Point point : points){
            Collection<Triangle> newTriangles = addPoint(point, triangles);
            triangles.addAll(newTriangles);
        }

        triangles.removeIf(triangle -> triangle.sharesPoint(superTriangle));

        return triangles;
    }

    public static Collection<Edge> extractEdges(Collection<Triangle> triangles) {
        Set<Edge> edges = new HashSet<>();

        for(Triangle triangle: triangles) {
            edges.add(new Edge(triangle.p1(), triangle.p2()));
            edges.add(new Edge(triangle.p2(), triangle.p3()));
            edges.add(new Edge(triangle.p3(), triangle.p1()));
        }

        return edges;
    }

    private static Collection<Triangle> addPoint(Point point, List<Triangle> triangles) {
        Set<Edge> edges = new HashSet<>();

        // Remove 'bad-triangles' that break the Delaunay property
        triangles.removeIf(triangle -> {
            if(triangle.circumCircle().contains(point)) {
                // Save edges of bad triangle
                edges.add(new Edge(triangle.p1(), triangle.p2()));
                edges.add(new Edge(triangle.p2(), triangle.p3()));
                edges.add(new Edge(triangle.p3(), triangle.p1()));
                return true;
            }
            return false;
        });

        Collection<Triangle> newTriangles = new ArrayList<>();

        // Create new triangles from the edges of the bad triangles
        for(Edge edge: edges) {
            newTriangles.add(new Triangle(edge.p1(), edge.p2(), point));
        }

        return newTriangles;
    }

}
