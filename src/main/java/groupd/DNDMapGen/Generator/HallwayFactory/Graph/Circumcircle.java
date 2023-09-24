package groupd.DNDMapGen.Generator.HallwayFactory.Graph;

public class Circumcircle {
    private final double x;
    private final double y;
    private final double r;

    public Circumcircle(Triangle triangle) {
        Point p1 = triangle.p1();
        Point p2 = triangle.p2();
        Point p3 = triangle.p3();

        // Calculate denominator of the circumcenter formula
        double denominator = 2 * (p1.x() * (p2.y() - p3.y()) + p2.x() * (p3.y() - p1.y()) + p3.x() * (p1.y() - p2.y()));

        this.x = ((Math.pow(p1.x(), 2) + Math.pow(p1.y(), 2)) * (p2.y() - p3.y()) +
                (Math.pow(p2.x(), 2) + Math.pow(p2.y(), 2)) * (p3.y() - p1.y()) +
                (Math.pow(p3.x(), 2) + Math.pow(p3.y(), 2)) * (p1.y() - p2.y())) / denominator;

        this.y = ((Math.pow(p1.x(), 2) + Math.pow(p1.y(), 2)) * (p3.x() - p2.x()) +
                (Math.pow(p2.x(), 2) + Math.pow(p2.y(), 2)) * (p1.x() - p3.x()) +
                (Math.pow(p3.x(), 2) + Math.pow(p3.y(), 2)) * (p2.x() - p1.x())) / denominator;

        // Calculate side lengths of the triangle
        double a = Math.hypot(p2.x() - p1.x(), p2.y() - p1.y());
        double b = Math.hypot(p3.x() - p1.x(), p3.y() - p1.y());
        double c = Math.hypot(p3.x() - p2.x(), p3.y() - p2.y());

        // Calculate semi-perimeter
        double s = (a + b + c) / 2;

        // Calculate circumradius
        this.r = (a * b * c) / (4 * Math.sqrt(s * (s - a) * (s - b) * (s - c)));
    }

    public boolean contains(Point point) {
        double dx = x - point.x();
        double dy = y - point.y();
        double d = Math.sqrt(dx * dx + dy * dy);
        return d <= r;
    }

    public double x() {
        return x;
    }

    public double y() {
        return y;
    }

    public double r() {
        return r;
    }
}
