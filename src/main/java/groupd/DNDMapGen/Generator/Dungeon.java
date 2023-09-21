package groupd.DNDMapGen.Generator;

import groupd.DNDMapGen.MapTheme;

import java.util.Collection;

public class Dungeon {

    private final Collection<Room> rooms;
    private final Collection<Hallway> hallways;
    private final MapTheme theme;
    private final int width;
    private final int height;

    public Dungeon(MapTheme theme, Collection<Room> rooms, Collection<Hallway> hallways){
        this.theme = theme;
        this.rooms = rooms;
        this.hallways = hallways;

        // Calculate the width and height of the dungeon
        int minX = Integer.MAX_VALUE;
        int minY = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;
        int maxY = Integer.MIN_VALUE;

        for(Room room : rooms){
            minX = Math.min(minX, room.x());
            minY = Math.min(minY, room.y());
            maxX = Math.max(maxX, room.x() + room.width());
            maxY = Math.max(maxY, room.y() + room.height());
        }

        for(Hallway hallway : hallways){
            minX = Math.min(minX, hallway.x());
            minY = Math.min(minY, hallway.y());
            maxX = Math.max(maxX, hallway.x() + hallway.width());
            maxY = Math.max(maxY, hallway.y() + hallway.height());
        }

        this.width = maxX - minX;
        this.height = maxY - minY;
    }

    public MapTheme theme(){
        return theme;
    }

    public int width(){
        return width;
    }

    public int height(){
        return height;
    }

    public Collection<Room> getRooms(){
        return rooms;
    }

    public Collection<Hallway> getHallways() {
        return hallways;
    }

    public Tile[][] getTiles(){
        Tile[][] tiles = new Tile[width][height];

        for(int x = 0; x < width; x++){
            for(int y = 0; y < height; y++){
                tiles[x][y] = Tile.EMPTY;
            }
        }

        for(Room room : rooms){
            int x = room.x();
            int y = room.y();
            Tile[][] roomTiles = room.getTiles();
            for(int row = 0; row < roomTiles.length; row++){
                for(int col = 0; col < roomTiles[row].length; col++){
                    tiles[y + row][x + col] = roomTiles[row][col];
                }
            }
        }

        for(Hallway hallway : hallways){
            int x = hallway.x();
            int y = hallway.y();
            Tile[][] hallwayTiles = hallway.getTiles();
            for(int row = 0; row < hallwayTiles.length; row++){
                for(int col = 0; col < hallwayTiles[row].length; col++){
                    tiles[y + row][x + col] = hallwayTiles[row][col];
                }
            }
        }

        return tiles;
    }
}
