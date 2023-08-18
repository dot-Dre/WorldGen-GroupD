package groupd.DNDMapGen.Generator;

public class Room {

    private int x;
    private int y;
    private final int width;
    private final int height;

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

    public String[][] toStringArray(){
        String[][] room = new String[height][width];
        for(int i = 0; i < height; i++){
            for(int j = 0; j < width; j++) {
                if ((i == 0 || i == height - 1) && (j == 0 || j == width - 1)) {
                    room[i][j] = "+";
                } else if (i == 0 || i == height - 1) {
                    room[i][j] = "-";
                } else if (j == 0 || j == width - 1) {
                    room[i][j] = "|";
                } else {
                    room[i][j] = " ";
                }
            }
        }
        return room;
    }
}
