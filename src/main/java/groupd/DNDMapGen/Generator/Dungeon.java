package groupd.DNDMapGen.Generator;

import groupd.DNDMapGen.MapTheme;

import java.util.Collection;

public class Dungeon {

    private final Collection<Room> rooms;
    private final Collection<Hallway> hallways;
    private final MapTheme theme;
    private final int minX;
    private final int minY;
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

        this.minX = minX;
        this.minY = minY;
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
        Tile[][] tiles = new Tile[height][width];

        // Initialize tiles with EMPTY
        for(int x = 0; x < width; x++){
            for(int y = 0; y < height; y++){
                tiles[y][x] = Tile.EMPTY;
            }
        }

        // Place rooms
        addRoomTiles(tiles, rooms);

        // Place hallways
        for(Hallway hallway : hallways){
            addRoomTiles(tiles, hallway.getRooms());
        }

        return tiles;
    }

    private void addRoomTiles(Tile[][] tiles, Collection<Room> rooms) {
        for(Room room : rooms){
            int x = room.x() - minX;  // Note the -minX
            int y = room.y() - minY;  // Note the -minY
            Tile[][] roomTiles = room.getTiles();
            for(int row = 0; row < roomTiles.length; row++){
                for(int col = 0; col < roomTiles[row].length; col++){
                    if(tiles[y + row][x + col] != Tile.FLOOR){
                        tiles[y + row][x + col] = roomTiles[row][col];
                    };
                }
            }
        }
    }

}
