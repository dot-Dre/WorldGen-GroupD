package groupd.DNDMapGen.Generator.HallwayFactory.Graph;

public record Edge(Point p1, Point p2){

    public int length() {
        return (int) Math.round(Math.hypot(p1.x() - p2.x(), p1.y() - p2.y()));
    }

    public boolean equals(Object o) {
        if (o == this) return true;
        if (!(o instanceof Edge e)) return false;
        return (e.p1.equals(p1) && e.p2.equals(p2)) || (e.p1.equals(p2) && e.p2.equals(p1));
    }

    public int hashCode() {
        return p1.hashCode() + p2.hashCode();
    }
}
