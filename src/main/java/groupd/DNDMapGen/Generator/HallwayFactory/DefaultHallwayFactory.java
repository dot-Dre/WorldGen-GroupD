package groupd.DNDMapGen.Generator.HallwayFactory;

import groupd.DNDMapGen.Generator.Hallway;
import groupd.DNDMapGen.Generator.HallwayFactory.Graph.*;
import groupd.DNDMapGen.Generator.Room;

import java.util.*;

public class DefaultHallwayFactory extends AbstractHallwayFactory {

    Map<Point, Room> roomsPoints;
    private int hallwayWidth = 1;

    public DefaultHallwayFactory(){}

    public DefaultHallwayFactory(int maxWidth){
        this.hallwayWidth = maxWidth;
    }

    @Override
    public Collection<Hallway> generate(Collection<Room> rooms) {
        roomsPoints = new HashMap<>();

        for (Room room : rooms) {
            roomsPoints.put(new Point(room.centerX(), room.centerY()), room);
        }

        // Use delaunay triangulation to generate collection of edges
        Collection<Triangle> dungeonGraph = Triangulator.triangulate(roomsPoints.keySet());
        Collection<Edge> dungeonEdges = Triangulator.extractEdges(dungeonGraph);

        // Turn the edges into a minimum spanning tree
        Collection<Edge> minimumSpanningTree = MinimumSpanningTree.buildTree(dungeonEdges);

        // Turn the edges into hallways
        Collection<Hallway> hallways = new ArrayList<>();
        for (Edge edge : minimumSpanningTree) {
            hallways.add(createHallway(edge));
        }

        return hallways;
    }

    /**
     * Connects two rooms through a hallway
     * This can be done in 3 different ways:
     *      - A horizontal hallway
     *      - A vertical hallway
     *      - A 'L' shaped hallway
     *
     * @param edge
     * @return
     */
    private Hallway createHallway(Edge edge) {
        Hallway hallway = new Hallway();
        Room r1 = roomsPoints.get(edge.p1());
        Room r2 = roomsPoints.get(edge.p2());

        // Calculate midpoints
        int minX = Math.min(r1.centerX(), r2.centerX());
        int minY = Math.min(r1.centerY(), r2.centerY());

        // Check if midpoints are within the y-boundaries of either room for a horizontal line
        boolean isMidPointYInR1 = minY >= r1.y() && minY <= (r1.y() + r1.height());
        boolean isMidPointYInR2 = minY >= r2.y() && minY <= (r2.y() + r2.height());

        // Check if midpoints are within the x-boundaries of either room for a vertical line
        boolean isMidPointXInR1 = minX >= r1.x() && minX <= (r1.x() + r1.width());
        boolean isMidPointXInR2 = minX >= r2.x() && minX <= (r2.x() + r2.width());

        if (isMidPointYInR1 && isMidPointYInR2) {
            // Create a horizontal line from minY
            hallway.addRoom(
                    new Room(Math.min(r1.centerX(), r2.centerX()), minY,
                            Math.abs(r1.centerX() - r2.centerX()), 1)
            );
        } else if (isMidPointXInR1 && isMidPointXInR2) {
            // Create a vertical line from minX
            hallway.addRoom(
                    new Room(minX, Math.min(r1.centerY(), r2.centerY()),
                            1, Math.abs(r1.centerY() - r2.centerY()))
            );
        } else {
            // Create a horizontal line
            hallway.addRoom(
                    new Room(Math.min(r1.centerX(), r2.centerX()),
                            minY, Math.abs(r1.centerX() - r2.centerX()), 1)
            );

            Room topRoom = r1.centerY() < r2.centerY() ? r1 : r2;
            Room bottomRoom = r1.centerY() < r2.centerY() ? r2 : r1;
            boolean topOnLeft = topRoom.centerX() == minX;

            // Create a vertical line
            if (topOnLeft) {
                hallway.addRoom(
                        new Room(bottomRoom.centerX(), topRoom.centerY(),
                                1, Math.abs(r1.centerY() - r2.centerY())));
            } else {
                hallway.addRoom(new Room(minX, minY, 1, Math.abs(r1.centerY() - r2.centerY())));
            }
        }

        return hallway;
    }


}
