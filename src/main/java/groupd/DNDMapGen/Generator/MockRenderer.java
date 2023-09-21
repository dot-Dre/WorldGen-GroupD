package groupd.DNDMapGen.Generator;

import groupd.DNDMapGen.Generator.HallwayFactory.DefaultHallwayFactory;
import groupd.DNDMapGen.Generator.HallwayFactory.Graph.Edge;
import groupd.DNDMapGen.Generator.HallwayFactory.Graph.MinimumSpanningTree;
import groupd.DNDMapGen.Generator.HallwayFactory.Graph.Triangulator;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.util.Collection;

public class MockRenderer {

    private static final Color BACKGROUND_COLOR = Color.BLACK;
    private static final Color MAIN_ROOM_COLOR = Color.RED;
    private static final Color BASE_ROOM_COLOR = Color.WHITE;
    private static final int IMAGE_SCALE = 5;
    public static final Color HALLWAY_COLOR = Color.ORANGE;

    /**
     * Render the map to a file at a certain scale
     */
    public static void render(Collection<Room> rooms, Collection<Room> mainRooms, String outputPath) {
        int minX = rooms.stream().mapToInt(Room::x).min().getAsInt();
        int minY = rooms.stream().mapToInt(Room::y).min().getAsInt();
        int maxX = rooms.stream().mapToInt(room -> room.x() + room.width()).max().getAsInt();
        int maxY = rooms.stream().mapToInt(room -> room.y() + room.height()).max().getAsInt();
        int width = maxX - minX + 1;
        int height = maxY - minY + 1;

        BufferedImage image = new BufferedImage(width* IMAGE_SCALE, height* IMAGE_SCALE, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image.createGraphics();

        g.setColor(BACKGROUND_COLOR);
        g.fillRect(0, 0, width* IMAGE_SCALE, height* IMAGE_SCALE);


        // Draw base rooms
        g.setColor(BASE_ROOM_COLOR);
        rooms.forEach(room -> {
            g.fillRect((room.x() - minX)* IMAGE_SCALE , (room.y() - minY)* IMAGE_SCALE, (room.width() - 1)* IMAGE_SCALE, (room.height() - 1)* IMAGE_SCALE);
        });

        // Draw main rooms
        g.setColor(MAIN_ROOM_COLOR);
        mainRooms.forEach(room -> {
            g.fillRect((room.x() - minX)* IMAGE_SCALE, (room.y() - minY)* IMAGE_SCALE, (room.width() - 1)* IMAGE_SCALE, (room.height() - 1)* IMAGE_SCALE);
        });

        g.setColor(HALLWAY_COLOR);
        Collection<Hallway> hallways = new DefaultHallwayFactory().generate(mainRooms);
        for(Hallway h: hallways){
            Collection<Room> hallwayRooms = h.getRooms();
            hallwayRooms.forEach(room -> {
                g.fillRect((room.x() - minX)* IMAGE_SCALE, (room.y() - minY)* IMAGE_SCALE, (room.width())* IMAGE_SCALE, (room.height())* IMAGE_SCALE);
            });
        }

        // Save image
        try {
            javax.imageio.ImageIO.write(image, "png", new java.io.File(outputPath));
        } catch (java.io.IOException e) {
            System.out.println("Failed to save image.");
        }

    }

}
