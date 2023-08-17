package groupd.DNDMapGen.Generator;

import groupd.DNDMapGen.Generator.RoomFactory.AbstractRoomFactory;
import groupd.DNDMapGen.MapSize;
import groupd.DNDMapGen.MapTheme;

import java.util.*;

public class Generator {

    private MapSize size;
    private MapTheme theme;


    public void build(){
        AbstractRoomFactory roomFactory = theme.getRoomFactory();
        Collection<Room> rooms = roomFactory.generateRooms(size);

        printDungeon(rooms); // Temporary for testing
    }

    public Generator(MapSize size, MapTheme theme){
        this.size = size;
        this.theme = theme;
    }

    private int calcWidth(Collection<Room> rooms){
        int minX = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;

        for(Room room : rooms){
            minX = Math.min(minX, room.x());
            maxX = Math.max(maxX, room.x() + room.width());
        }

        return Math.abs(maxX - minX);
    }

    private int calcHeight(Collection<Room> rooms){
        int minY = Integer.MAX_VALUE;
        int maxY = Integer.MIN_VALUE;

        for(Room room : rooms){
            minY = Math.min(minY, room.y());
            maxY = Math.max(maxY, room.y() + room.height());
        }

        return Math.abs(maxY - minY);
    }

    private int calcMinX(Collection<Room> rooms){
        int minX = Integer.MAX_VALUE;

        for(Room room : rooms){
            minX = Math.min(minX, room.x());
        }

        return minX;
    }

    private int calcMinY(Collection<Room> rooms){
        int minY = Integer.MAX_VALUE;

        for(Room room : rooms){
            minY = Math.min(minY, room.y());
        }

        return minY;
    }

    public MapSize getSize() {
        return size;
    }

    public void setSize(MapSize size) {
        this.size = size;
    }

    public void setTheme(MapTheme theme) {
        this.theme = theme;
    }

    public void printDungeon(Collection<Room> rooms){
        int width = calcWidth(rooms);
        int height = calcHeight(rooms);
        int minX = calcMinX(rooms);
        int minY = calcMinY(rooms);

        String[][] dungeon = new String[height][width];

        for(int y = 0; y < height; y++){
            Arrays.fill(dungeon[y], "_");
        }

        for(Room room : rooms){
            String[][] roomStr = room.toStringArray();
            for(int y = 0; y < roomStr.length; y++){
                System.arraycopy(roomStr[y], 0, dungeon[room.y() - minY + y], room.x() - minX, roomStr[y].length);
            }
        }

        for(int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++){
                System.out.print(dungeon[y][x]);
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Generator gen = new Generator(MapSize.SMALL, MapTheme.GRAVEYARD);
        gen.build();
    }
}
