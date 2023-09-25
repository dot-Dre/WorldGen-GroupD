package groupd.DNDMapGen.Generator;

import java.util.Arrays;

public class Room {

    private int x;
    private int y;
    private final int width;
    private final int height;
    private final Tile[][] tiles;

    /**
     * Constructs a new Room with the specified position and dimensions.
     *
     * @param x      The x-coordinate of the top-left corner of the room.
     * @param y      The y-coordinate of the top-left corner of the room.
     * @param width  The width of the room.
     * @param height The height of the room.
     */
    public Room(int x, int y, int width, int height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tiles = new Tile[height][width];

        // Initialize the perimeter of the room to be walls
        for (int row = 0; row < height; row++){
            for (int col = 0; col < width; col++){
                if(row == 0 || row == height - 1 || col == 0 || col == width - 1){
                    tiles[row][col] = Tile.WALL;
                } else {
                    tiles[row][col] = Tile.FLOOR;
                }
            }
        }
    }

    public void moveTo(int x, int y){
        this.x = x;
        this.y = y;
    }

    public int width() {
        return width;
    }

    public int height() {
        return height;
    }

    public int x(){
        return x;
    }

    public int y(){
        return y;
    }

    public int centerX(){
        return x + (int) Math.round(width/2.0);
    }

    public int centerY(){
        return y + (int) Math.round(height/2.0);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (!(obj instanceof Room other)) return false;
        // Equal if they are in the same position and have the same dimensions
        return x == other.x
                && y == other.y
                && width == other.width
                && height == other.height;
    }

    /**
     * Returns a copy of the tiles in this room
     * @return A copy of the tiles in this room
     */
    public Tile[][] getTiles(){
        Tile[][] copy = new Tile[height][width];
        for (int row = 0; row < height; row++){
            copy[row] = Arrays.copyOf(tiles[row], width);
        }
        return copy;
    }
}
