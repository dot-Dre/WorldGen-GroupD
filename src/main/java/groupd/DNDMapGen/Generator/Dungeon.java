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
        int maxX = Integer.MIN_VALUE;
        int maxY = Integer.MIN_VALUE;

        for(Room room : rooms){
            maxX = Math.max(maxX, room.x() + room.width());
            maxY = Math.max(maxY, room.y() + room.height());
        }

        for(Hallway hallway : hallways){
            maxX = Math.max(maxX, hallway.x() + hallway.width());
            maxY = Math.max(maxY, hallway.y() + hallway.height());
        }

        this.width = maxX;
        this.height = maxY;
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
        for (Hallway hallway : hallways) {
            Tile[][] hallwayTile = hallway.getTiles();
            for(int row = 0; row < hallway.height(); row++){
                for(int col = 0; col < hallway.width(); col++){
                    int x = hallway.x() + col;
                    int y = hallway.y() + row;
                    if(hallwayTile[row][col] != null && tiles[y][x] != Tile.FLOOR) {
                        tiles[y][x] = hallwayTile[row][col];
                    }
                }
            }
        }

        return tiles;
    }

    private void addRoomTiles(Tile[][] tiles, Collection<Room> rooms) {
        for(Room room : rooms){
            Tile[][] roomTiles = room.getTiles();
            for(int row = 0; row < roomTiles.length; row++){
                for(int col = 0; col < roomTiles[row].length; col++){
                    int x = room.x() + col;
                    int y = room.y() + row;
                    if(tiles[y][x] != Tile.FLOOR){
                        tiles[y][x] = roomTiles[row][col];
                    };
                }
            }
        }
    }

}
