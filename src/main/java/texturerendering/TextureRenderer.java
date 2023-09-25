package texturerendering;

import groupd.DNDMapGen.Generator.Dungeon;
import groupd.DNDMapGen.Generator.Tile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Random;

public class TextureRenderer {

    private HashMap<String, Texture> textureMap;
    Random random = new Random();

    /**
     * Creates a new TextureRenderer.
     * The textures are loaded from the textures' folder.
     * The textures are rendered to a file.
     *
     * @param dungeon The dungeon to render.
     */
    public TextureRenderer(Dungeon dungeon) {
        this.textureMap = new HashMap<>();
        initializeTextures();
        renderTextures(dungeon, 1);
        renderTextures(dungeon, 2);
    }

    /**
     * Initializes the texture map with the textures in the textures folder.
     * The textures are stored in a HashMap with the texture name as the key.
     * The texture name is the file name without the extension.
     * For example, the texture "wall_topinner.png" is stored with the key "wall_topinner".
     */
    public void initializeTextures() {
        // Make sure textureMap is initialized
        if (textureMap == null) {
            textureMap = new HashMap<>();
        }

        // Initialize textureMap with the textures in the textures folder
        File path = new File("src/main/java/texturerendering/textures/dungen-set-1");
        File[] files = path.listFiles();
        assert files != null;
        for (File file : files) {
            String name = file.getName();
            String[] split = name.split("\\.");
            String key = split[0];
            Texture texture = new Texture(name, file.getPath(), 16, 16);
            textureMap.put(key, texture);
        }
        System.out.println("Textures loaded: " + textureMap.size());
    }

    /**
     * Renders the textures of the dungeon to a file.
     *
     * @param dungeon     The dungeon to render.
     * @param scaleFactor The scale factor of the dungeon.
     */
    public void renderTextures(Dungeon dungeon, int scaleFactor) {
        Tile[][] tiles = scaleDownDungeon(dungeon.getTiles(), scaleFactor);

        int newWidth = tiles[0].length;
        int newHeight = tiles.length;
        int tileWidth = 16;
        int tileHeight = 16;

        // Create a new image
        BufferedImage image = new BufferedImage(newWidth * tileWidth, newHeight * tileHeight, BufferedImage.TYPE_INT_RGB);

        for (int y = 0; y < newHeight; y++) {
            for (int x = 0; x < newWidth; x++) {
                Tile tile = tiles[y][x];
                Texture texture;
                // Assign the texture based on the tile type
                if (tile == Tile.WALL) {
                    texture = determineWallTexture(tiles, x, y);
                } else if (tile == Tile.FLOOR) {
                    texture = determineFloorTexture(tiles, x, y);

                } else {
                    texture = textureMap.get("empty_tile");
                }
                BufferedImage tileImage = texture.getImage();
                image.getGraphics().drawImage(tileImage, x * tileWidth, y * tileHeight, tileWidth, tileHeight, null);
            }
        }

        // Save the image to disk
        try {
            ImageIO.write(image, "PNG", new File("outputMap_" + scaleFactor + ".png"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Texture determineWallTexture(Tile[][] tiles, int x, int y) {
        // Corners
        if (isTopLeftCorner(tiles, x, y)) return textureMap.get("wall_topleft");
        if (isTopRightCorner(tiles, x, y)) return textureMap.get("wall_topright");
        if (isBottomLeftCorner(tiles, x, y)) return textureMap.get("wall_bottomleft");
        if (isBottomRightCorner(tiles, x, y)) return textureMap.get("wall_bottomright");

        // Edges
        if (isTopEdge(tiles, x, y)) return textureMap.get("wall_top");
        if (isBottomEdge(tiles, x, y)) return textureMap.get("wall_bottom");
        if (isLeftEdge(tiles, x, y)) return textureMap.get(random.nextInt() % 5 == 0 ? "wall_left1" : "wall_left2");
        if (isRightEdge(tiles, x, y)) return textureMap.get(random.nextInt()% 5 == 0 ? "wall_right2" : "wall_right1");

        // Default wall texture
        return textureMap.get("wall_topinner");
    }

    private Texture determineFloorTexture(Tile[][] tiles, int x, int y) {
        // Corners
        if (isTopLeftCornerFloor(tiles, x, y)) return textureMap.get("floor_topleft");
        if (isTopRightCornerFloor(tiles, x, y)) return textureMap.get("floor_half_top");
        if (isBottomLeftCornerFloor(tiles, x, y)) return textureMap.get("floor_half");
        if (isBottomRightCornerFloor(tiles, x, y)) return textureMap.get(random.nextInt() % 10 == 0 ? "floor_dirty" : "floor_clean");

        // Edges
        if (isTopEdgeFloor(tiles, x, y)) return textureMap.get("floor_half_top");
        if (isBottomEdgeFloor(tiles, x, y)) return textureMap.get(random.nextInt() % 10 == 0 ? "floor_dirty" : "floor_clean");
        if (isLeftEdgeFloor(tiles, x, y)) return textureMap.get("floor_half");
        if (isRightEdgeFloor(tiles, x, y)) return textureMap.get(random.nextInt() % 10 == 0 ? "floor_cracked" : "floor_clean");

        // Default floor texture
        return textureMap.get(random.nextInt() % 10 == 0 ? "floor_dirty" : "floor_clean");
    }

    // Helper methods to identify specific positions for floors

    private boolean isTopLeftCornerFloor(Tile[][] tiles, int x, int y) {
        return y > 0 && x > 0 && tiles[y - 1][x] != Tile.FLOOR && tiles[y][x - 1] != Tile.FLOOR;
    }
    private boolean isTopRightCornerFloor(Tile[][] tiles, int x, int y) {
        return y > 0 && x < tiles[0].length - 1 && tiles[y - 1][x] != Tile.FLOOR && tiles[y][x + 1] != Tile.FLOOR;
    }
    private boolean isBottomLeftCornerFloor(Tile[][] tiles, int x, int y) {
        return y < tiles.length - 1 && x > 0 && tiles[y + 1][x] != Tile.FLOOR && tiles[y][x - 1] != Tile.FLOOR;
    }
    private boolean isBottomRightCornerFloor(Tile[][] tiles, int x, int y) {
        return y < tiles.length - 1 && x < tiles[0].length - 1 && tiles[y + 1][x] != Tile.FLOOR && tiles[y][x + 1] != Tile.FLOOR;
    }
    private boolean isTopEdgeFloor(Tile[][] tiles, int x, int y) {
        return y > 0 && tiles[y - 1][x] != Tile.FLOOR;
    }

    private boolean isBottomEdgeFloor(Tile[][] tiles, int x, int y) {
        return y < tiles.length - 1 && tiles[y + 1][x] != Tile.FLOOR;
    }

    private boolean isLeftEdgeFloor(Tile[][] tiles, int x, int y) {
        return x > 0 && tiles[y][x - 1] != Tile.FLOOR;
    }

    private boolean isRightEdgeFloor(Tile[][] tiles, int x, int y) {
        return x < tiles[0].length - 1 && tiles[y][x + 1] != Tile.FLOOR;
    }

    // Helper methods to identify specific positions for walls
    private boolean isTopLeftCorner(Tile[][] tiles, int x, int y) {
        return y > 0 && x > 0 && tiles[y - 1][x] == Tile.EMPTY && tiles[y][x - 1] == Tile.EMPTY;
    }

    private boolean isTopRightCorner(Tile[][] tiles, int x, int y) {
        return y > 0 && x < tiles[0].length - 1 && tiles[y - 1][x] == Tile.EMPTY && tiles[y][x + 1] == Tile.EMPTY;
    }

    private boolean isBottomLeftCorner(Tile[][] tiles, int x, int y) {
        return y < tiles.length - 1 && x > 0 && tiles[y + 1][x] == Tile.EMPTY && tiles[y][x - 1] == Tile.EMPTY;
    }

    private boolean isBottomRightCorner(Tile[][] tiles, int x, int y) {
        return y < tiles.length - 1 && x < tiles[0].length - 1 && tiles[y + 1][x] == Tile.EMPTY && tiles[y][x + 1] == Tile.EMPTY;
    }

    private boolean isTopEdge(Tile[][] tiles, int x, int y) {
        return y > 0 && tiles[y - 1][x] == Tile.EMPTY;
    }

    private boolean isBottomEdge(Tile[][] tiles, int x, int y) {
        return y < tiles.length - 1 && tiles[y + 1][x] == Tile.EMPTY;
    }

    private boolean isLeftEdge(Tile[][] tiles, int x, int y) {
        return x > 0 && tiles[y][x - 1] == Tile.EMPTY;
    }

    private boolean isRightEdge(Tile[][] tiles, int x, int y) {
        return x < tiles[0].length - 1 && tiles[y][x + 1] == Tile.EMPTY;
    }

    /**
     * Scales down the dungeon by the specified scale factor.
     * The scale factor is the number of tiles in the new dungeon in one dimension.
     * For example, a scale factor of 2 means that the new dungeon is 2x2 tiles.
     * The new dungeon is created by taking the tile with the highest priority in each area.
     * The priority is determined by the following rules:
     * - If any tile in the area is a wall, return a wall.
     * - If any tile in the area is a floor, return a floor.
     * - Otherwise, return an empty tile.
     *
     * @param originalTiles The tiles to scale down.
     * @param scaleFactor   The scale factor.
     * @return The scaled down tiles.
     */
    public Tile[][] scaleDownDungeon(Tile[][] originalTiles, int scaleFactor) {
        int originalWidth = originalTiles[0].length;
        int originalHeight = originalTiles.length;
        int newWidth = originalWidth / scaleFactor;
        int newHeight = originalHeight / scaleFactor;

        Tile[][] scaledTiles = new Tile[newHeight][newWidth];

        for (int y = 0; y < newHeight; y++) {
            for (int x = 0; x < newWidth; x++) {
                scaledTiles[y][x] = getPrioritizedTile(originalTiles, x, y, scaleFactor);
            }
        }

        return scaledTiles;
    }

    /**
     * Returns the tile with the highest priority in the specified area.
     * The area is specified by the top left corner (x, y) and the scale factor.
     *
     * @param tiles       The tiles to search.
     * @param x           The x coordinate of the top left corner of the area.
     * @param y           The y coordinate of the top left corner of the area.
     * @param scaleFactor The scale factor of the area.
     * @return The tile with the highest priority in the specified area.
     */
    public Tile getPrioritizedTile(Tile[][] tiles, int x, int y, int scaleFactor) {
        Tile prioritizedTile = Tile.EMPTY;
        for (int dy = 0; dy < scaleFactor; dy++) {
            for (int dx = 0; dx < scaleFactor; dx++) {
                Tile tile = tiles[y * scaleFactor + dy][x * scaleFactor + dx];
                // Priority: WALL > FLOOR > EMPTY
                if (tile == Tile.WALL) {
                    return Tile.WALL;
                } else if (tile == Tile.FLOOR) {
                    prioritizedTile = Tile.FLOOR;
                }
            }
        }
        return prioritizedTile;
    }
}
