package groupd.DNDMapGen.Generator.HallwayFactory;

import groupd.DNDMapGen.Generator.Hallway;
import groupd.DNDMapGen.Generator.HallwayFactory.Graph.*;
import groupd.DNDMapGen.Generator.Room;

import java.util.*;

public class DefaultHallwayFactory extends AbstractHallwayFactory {

    Map<Point, Room> roomsPoints;
    private int hallwayWidth = 5;

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

        int horizontalOverlap = calculateHorizontalOverlap(r1, r2);
        int verticalOverlap = calculateVerticalOverlap(r1, r2);


        if(horizontalOverlap >= 3){
            Room newHallway = createVerticalHallway(r1, r2, horizontalOverlap);
            hallway.addRoom(newHallway);
        }else if(verticalOverlap >= 3){
            Room newHorizontalHallway = createHorizontalHallway(r1, r2, verticalOverlap);
            hallway.addRoom(newHorizontalHallway);
        }else{
            for(Room r: createLHallway(r1, r2)){
                hallway.addRoom(r);
            }
        }


        return hallway;
    }

    private List<Room> createLHallway(Room r1, Room r2) {
        boolean r2LeftOfR1 = r2.centerX() < r1.centerX();
        boolean r2AboveR1 = r2.centerY() < r1.centerY();

        Room leftRoom = r2LeftOfR1 ? r2 : r1;
        Room rightRoom = r2LeftOfR1 ? r1 : r2;
        Room topRoom = r2AboveR1 ? r2 : r1;
        Room bottomRoom = r2AboveR1 ? r1 : r2;
        int x = bottomRoom.x();
        int y = topRoom.y();
        int width = bottomRoom.width()-1;
        int height = topRoom.height()-1;

        if(topRoom == leftRoom){
            if(topRoom.x() + topRoom.width() - 1 > bottomRoom.x()){
                x = topRoom.x() + topRoom.width() - 1;
            }
        }else{
            if(topRoom.x() < bottomRoom.x() + bottomRoom.width() - 1){
                width = topRoom.x() - x;
            }
        }

        if(topRoom.y() + topRoom.height() - 1 > bottomRoom.y()){
            height = bottomRoom.y() - y;
        }

        Room midRoom = new Room(x, y, width, height);
        int yOverlap = calculateVerticalOverlap(midRoom, topRoom);
        int xOverlap = calculateHorizontalOverlap(midRoom, bottomRoom);

        // Vertical hallway
        int maxLeftSide = Math.max(midRoom.x(), bottomRoom.x());
        int minRightSide = Math.min(midRoom.x() + midRoom.width(), bottomRoom.x() + bottomRoom.width());
        int xRange = minRightSide - maxLeftSide;
        x = maxLeftSide + (xRange - xOverlap)/2;

        // Horizontal hallway
        int maxTopSide = Math.max(midRoom.y(), topRoom.y());
        int minBottomSide = Math.min(midRoom.y() + midRoom.height(), topRoom.y() + topRoom.height());
        int yRange = minBottomSide - maxTopSide;
        y = maxTopSide + (yRange - yOverlap) / 2;

        Room horizontalHallway;
        height = bottomRoom.y() - y;
        if(topRoom == rightRoom){
            width = topRoom.x() - x;
            horizontalHallway = new Room(x, y, width+2, yOverlap);
        }else{
            width = x - topRoom.x() - topRoom.width() + 1;
            horizontalHallway = new Room(topRoom.x() + topRoom.width()-2, y, width + yOverlap, yOverlap);
        }

        Room verticalHallway = new Room(x, y, xOverlap, height+2);

        return List.of(horizontalHallway, verticalHallway);
    }

    private Room createVerticalHallway(Room r1, Room r2, int width) {
        boolean r2AboveR1 = r2.centerY() < r1.centerY();
        Room topRoom = r2AboveR1 ? r2 : r1;
        Room bottomRoom = r2AboveR1 ? r1 : r2;

        int maxLeftSide = Math.max(r1.x(), r2.x());
        int minRightSide = Math.min(r1.x() + r1.width(), r2.x() + r2.width());
        int xRange = minRightSide - maxLeftSide;
        int x = maxLeftSide + (xRange - width)/2;

        int y = topRoom.y() + topRoom.height() - 2;
        int height = bottomRoom.y() - y + 2;

        return new Room(x, y, width, height);
    }


    private int calculateHorizontalOverlap(Room r1, Room r2) {
        if(r1.x() <= r2.x() && r1.x() + r1.width() >= r2.x() + r2.width()){
            // r2 is completely within r1
            return Math.min(r2.width(), hallwayWidth);
        } else if(r2.x() <= r1.x() && r2.x() + r2.width() >= r1.x() + r1.width()){
            // r1 is completely within r2
            return Math.min(r1.width(), hallwayWidth);
        } else {
            // General case
            int minRightSide = Math.min(r1.x() + r1.width(), r2.x() + r2.width());
            int maxLeftSide = Math.max(r1.x(), r2.x());
            return Math.min(minRightSide - maxLeftSide -1, hallwayWidth);
        }
    }


    private Room createHorizontalHallway(Room r1, Room r2, int height) {
        boolean r2LeftOfR1 = r2.centerX() < r1.centerX();
        Room leftRoom = r2LeftOfR1 ? r2 : r1;
        Room rightRoom = r2LeftOfR1 ? r1 : r2;

        int maxTopSide = Math.max(r1.y(), r2.y());
        int minBottomSide = Math.min(r1.y() + r1.height(), r2.y() + r2.height());
        int yRange = minBottomSide - maxTopSide;
        int y = maxTopSide + (yRange - height) / 2;

        int x = leftRoom.x() + leftRoom.width() - 2;
        int width = rightRoom.x() - x + 2;

        return new Room(x, y, width, height);
    }

    private int calculateVerticalOverlap(Room r1, Room r2) {
        if (r1.y() <= r2.y() && r1.y() + r1.height() >= r2.y() + r2.height()) {
            // r2 is completely within r1
            return Math.min(r2.height(), hallwayWidth);
        } else if (r2.y() <= r1.y() && r2.y() + r2.height() >= r1.y() + r1.height()) {
            // r1 is completely within r2
            return Math.min(r1.height(), hallwayWidth);
        } else {
            // General case
            int minBottomSide = Math.min(r1.y() + r1.height(), r2.y() + r2.height());
            int maxTopSide = Math.max(r1.y(), r2.y());
            return Math.min(minBottomSide - maxTopSide - 1, hallwayWidth);
        }
    }

}
