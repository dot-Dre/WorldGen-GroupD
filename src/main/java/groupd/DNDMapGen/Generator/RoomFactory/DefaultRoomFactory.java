package groupd.DNDMapGen.Generator.RoomFactory;

import groupd.DNDMapGen.Generator.Room;

import java.util.*;
import java.util.stream.Collectors;

public class DefaultRoomFactory extends AbstractRoomFactory {

    /**
     * The default minimum room size
     */
    private int minRoomSize = 30;
    private int maxRoomSize = 50;


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
     * @return A collection of generated rooms.
     */
    @Override
    public Collection<Room> generateRooms(int roomCount, int seed) {
        List<Room> rooms = new ArrayList<>();
        int radius = (int) Math.round(Math.sqrt(roomCount* minRoomSize * minRoomSize /Math.PI));

        Random rand = new Random(seed);

        for(int i = 0; i < roomCount; i++){
            // Random distance from the center
            double distance = radius * rand.nextDouble();

            // Random angle
            double angle = rand.nextDouble(360.0);

            // Convert to position for new room
            int x = (int)(distance * Math.cos(angle));
            int y = (int)(distance * Math.sin(angle));

            int mean = (maxRoomSize + minRoomSize)/2;
            int stdDev = (maxRoomSize - minRoomSize)/3;

            // Random width and height based on a normal distribution
            int width = (int) (rand.nextGaussian() * stdDev + mean);
            int height = (int) (rand.nextGaussian() * stdDev + mean);

            // Ensure the width to height ratio isn't too skewed (We don't want long skinny rooms)
            while (width / (double)height > 3 || height / (double)width > 3) {
                width = (int) Math.round(Math.abs(rand.nextGaussian()) * stdDev + mean);
                height = (int) Math.round(Math.abs(rand.nextGaussian()) * stdDev + mean);
            }

            width = Math.max(minRoomSize, Math.min(width, maxRoomSize));
            height = Math.max(minRoomSize, Math.min(height, maxRoomSize));

            rooms.add(new Room(x, y, width, height));
        }

        separateRooms(rooms);
        normalizeRoomPosition(rooms);
        return rooms;
    }

    public List<Room> selectMainRooms(Collection<Room> rooms, int roomCount) {
        // Return top 20 rooms
        return rooms.stream()
                .sorted(Comparator.comparingInt((Room r) -> r.width() * r.height()).reversed())
                .limit(roomCount)
                .collect(Collectors.toList());
    }

    public int getMinRoomSize() {
        return minRoomSize;
    }

    public void setMinRoomSize(int minRoomSize) {
        this.minRoomSize = minRoomSize;
    }

    public int getMaxRoomSize() {
        return maxRoomSize;
    }

    public void setMaxRoomSize(int maxRoomSize) {
        this.maxRoomSize = maxRoomSize;
    }

}
