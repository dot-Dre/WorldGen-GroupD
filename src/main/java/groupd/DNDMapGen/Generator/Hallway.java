package groupd.DNDMapGen.Generator;

import java.util.ArrayList;
import java.util.Collection;

import static groupd.DNDMapGen.Generator.Tile.FLOOR;

public class Hallway {

    Collection<Room> hallwayRooms = new ArrayList<>();

    public void addRoom(Room room){
        hallwayRooms.add(room);
    }

    public void removeRoom(Room room){
        hallwayRooms.remove(room);
    }

    public Collection<Room> getRooms(){
        return hallwayRooms;
    }

    public int x(){
        if(hallwayRooms.isEmpty()){
            return 0;
        }

        return hallwayRooms.stream()
                .mapToInt(Room::x)
                .min()
                .getAsInt();
    }

    public int y(){
        if(hallwayRooms.isEmpty()){
            return 0;
        }

        return hallwayRooms.stream()
                .mapToInt(Room::y)
                .min()
                .getAsInt();
    }

    public int width(){
        if(hallwayRooms.isEmpty()){
            return 0;
        }

        int minX = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;

        for(Room room : hallwayRooms){
            minX = Math.min(minX, room.x());
            maxX = Math.max(maxX, room.x() + room.width());
        }

        return maxX - minX;
    }

    public int height(){
        if(hallwayRooms.isEmpty()){
            return 0;
        }

        int minY = Integer.MAX_VALUE;
        int maxY = Integer.MIN_VALUE;

        for(Room room : hallwayRooms){
            minY = Math.min(minY, room.y());
            maxY = Math.max(maxY, room.y() + room.height());
        }

        return maxY - minY;
    }
}
