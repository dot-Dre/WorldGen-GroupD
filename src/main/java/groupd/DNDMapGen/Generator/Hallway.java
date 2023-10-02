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

    public void removeTileOverlap(){
        int xOffset = x();
        int yOffset = y();
        Tile[][] tiles = getTiles();

        for(Room r: hallwayRooms){
            Tile[][] roomTiles = r.getTiles();
            for(int row = 0; row < r.height(); row++){
                for(int col = 0; col < r.width(); col++){
                    int x = r.x() - xOffset + col;
                    int y = r.y() - yOffset + row;

                    roomTiles[row][col] = tiles[y][x];
                }
            }
            r.setTiles(roomTiles);
        }
    }

    public Tile[][] getTiles(){
        int xOffset = x();
        int yOffset = y();
        Tile[][] tiles = new Tile[height()][width()];

        for(Room r: hallwayRooms){
            Tile[][] roomTiles = r.getTiles();
            for(int row = 0; row < r.height(); row++){
                for(int col = 0; col < r.width(); col++){
                    int x = r.x() - xOffset + col;
                    int y = r.y() - yOffset + row;

                    if(tiles[y][x] != FLOOR){
                        tiles[y][x] = roomTiles[row][col];
                    }
                }
            }
        }

        return tiles;
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
