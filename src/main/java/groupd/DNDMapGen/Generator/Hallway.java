package groupd.DNDMapGen.Generator;

import java.util.ArrayList;
import java.util.Collection;

import static groupd.DNDMapGen.Generator.Tile.FLOOR;

public class Hallway {

    Collection<Room> hallwayRooms = new ArrayList<>();

    public int minX(){
        return hallwayRooms.stream()
                .mapToInt(Room::x)
                .min()
                .getAsInt();
    }

    public int minY(){
        return hallwayRooms.stream()
                .mapToInt(Room::y)
                .min()
                .getAsInt();
    }

    public int maxX(){
        return hallwayRooms.stream()
                .mapToInt(room -> room.x() + room.width())
                .max()
                .getAsInt();
    }

    public int maxY(){
        return hallwayRooms.stream()
                .mapToInt(room -> room.y() + room.height())
                .max()
                .getAsInt();
    }

    public void addRoom(Room room){
        hallwayRooms.add(room);
    }

    public void removeRoom(Room room){
        hallwayRooms.remove(room);
    }

    public Tile[][] getTiles(){
        if(hallwayRooms.isEmpty()){
            return new Tile[0][0];
        }

        int minX = Integer.MAX_VALUE;
        int minY = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;
        int maxY = Integer.MIN_VALUE;

        for(Room room : hallwayRooms){
            minX = Math.min(minX, room.x());
            minY = Math.min(minY, room.y());
            maxX = Math.max(maxX, room.x() + room.width());
            maxY = Math.max(maxY, room.y() + room.height());
        }

        Tile[][] tiles = new Tile[maxY - minY][maxX - minX];
        // Concatenate all the tiles from the rooms into one array
        for(Room room : hallwayRooms){
            Tile[][] roomTiles = room.getTiles();
            for(int row = 0; row < roomTiles.length; row++){
                for(int col = 0; col < roomTiles[row].length; col++){
                    int x = room.x() - minX + col;
                    int y = room.y() - minY + row;

                    if(tiles[y][x] != FLOOR){
                        tiles[y][x] = roomTiles[row][col];
                    }
                }
            }
        }
        return tiles;
    }

    public Collection<Room> getRooms(){
        return hallwayRooms;
    }
}
