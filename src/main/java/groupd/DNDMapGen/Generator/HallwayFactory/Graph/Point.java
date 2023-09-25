package groupd.DNDMapGen.Generator.HallwayFactory.Graph;

public record Point(int x, int y) {
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Point other) {
            return x == other.x && y == other.y;
        }
        return false;
    }
}
