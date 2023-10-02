package groupd.DNDMapGen.Generator.HallwayFactory.Graph;

import java.util.Collection;
import java.util.Objects;

public final class Triangle {
    private final Point p1;
    private final Point p2;
    private final Point p3;
    private final Circumcircle circumCircle;

    public Triangle(Point p1, Point p2, Point p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.circumCircle = new Circumcircle(this);
    }

    public static Triangle superTriangle(Collection<Point> vertices) {
        int minX = Integer.MAX_VALUE;
        int minY = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;
        int maxY = Integer.MIN_VALUE;

        for(Point point : vertices) {
            minX = Math.min(minX, point.x());
            minY = Math.min(minY, point.y());
            maxX = Math.max(maxX, point.x());
            maxY = Math.max(maxY, point.y());
        }

        int dx = (maxX - minX) * 10;
        int dy = (maxY - minY) * 10;

        Point p1 = new Point(minX - dx, minY - dy * 3);
        Point p2 = new Point(minX - dx, maxY + dy);
        Point p3 = new Point(maxX + dx * 3, maxY + dy);

        return new Triangle(p1, p2, p3);
    }

    public Point p1() {
        return p1;
    }

    public Point p2() {
        return p2;
    }

    public Point p3() {
        return p3;
    }

    public Circumcircle circumCircle() {
        return circumCircle;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (Triangle) obj;
        return Objects.equals(this.p1, that.p1) &&
                Objects.equals(this.p2, that.p2) &&
                Objects.equals(this.p3, that.p3);
    }

    @Override
    public int hashCode() {
        return Objects.hash(p1, p2, p3);
    }

    public boolean sharesPoint(Triangle otherTriangle) {
        return this.p1.equals(otherTriangle.p1) ||
                this.p1.equals(otherTriangle.p2) ||
                this.p1.equals(otherTriangle.p3) ||
                this.p2.equals(otherTriangle.p1) ||
                this.p2.equals(otherTriangle.p2) ||
                this.p2.equals(otherTriangle.p3) ||
                this.p3.equals(otherTriangle.p1) ||
                this.p3.equals(otherTriangle.p2) ||
                this.p3.equals(otherTriangle.p3);
    }
}
