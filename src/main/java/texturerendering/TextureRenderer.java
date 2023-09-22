package texturerendering;

import groupd.DNDMapGen.Generator.Dungeon;
import groupd.DNDMapGen.Generator.Tile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;

public class TextureRenderer {

    private HashMap<String, Texture> textureMap;

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
        renderTextures(dungeon, 3);
        renderTextures(dungeon, 4);
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
                if (tile == Tile.EMPTY) {
                    texture = textureMap.get("wall_topinner");
                } else if (tile == Tile.FLOOR) {
                    texture = textureMap.get("floor_clean");
                } else if (tile == Tile.WALL) {
                    texture = textureMap.get("wall_top");
                } else {
                    continue;
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
