package groupd.DNDMapGen.Generator.RoomFactory;

import groupd.DNDMapGen.Generator.Room;
import groupd.DNDMapGen.MapSize;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Random;

public class DefaultRoomFactory extends AbstractRoomFactory {


    /**
     * Generates a collection of non-overlapping rooms based on the given map size.
     * <p>
     * The method first determines the number of rooms and the minimum room size based on the provided map size.
     * Rooms are then randomly positioned within a circle of a radius calculated based on the room count and size.
     * Room dimensions are determined using a normal distribution around the minimum room size, ensuring
     * the rooms do not have a width-to-height ratio that's too skewed.
     *
     * <p>
     * After generating all rooms, the separateRooms() method is called to ensure the rooms do not overlap.
     *
     * @param size The size category of the map, used to determine room count and minimum room size.
     * @return A collection of generated rooms.
     */
    @Override
    public Collection<Room> generateRooms(MapSize size) {
        int roomCount = getRoomCount(size);
        int minRoomSize = getMinRoomSize(size);
        List<Room> rooms = new ArrayList<>();
        int radius = (int) Math.round(Math.sqrt(roomCount*minRoomSize*minRoomSize/Math.PI));

        Random rand = new Random();

        for(int i = 0; i < roomCount; i++){
            // Random distance from the center
            double distance = radius * rand.nextDouble();

            // Random angle
            double angle = rand.nextDouble(360.0);

            // Convert to position for new room
            int x = (int)(distance * Math.cos(angle));
            int y = (int)(distance * Math.sin(angle));

            // Random width and height based on a normal distribution
            int width = (int) (Math.abs(rand.nextGaussian()) * minRoomSize + minRoomSize);
            int height = (int) (Math.abs(rand.nextGaussian()) * minRoomSize + minRoomSize);

            // Ensure the width to height ratio isn't too skewed (We don't want long skinny rooms)
            while (width / (double)height > 2 || height / (double)width > 2) {
                width = (int) Math.round(Math.abs(rand.nextGaussian()) * minRoomSize + minRoomSize);
                height = (int) Math.round(Math.abs(rand.nextGaussian()) * minRoomSize + minRoomSize);
            }

            rooms.add(new Room(x, y, width, height));
        }

        separateRooms(rooms);

        return rooms;
    }
}
